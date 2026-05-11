import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe, STRIPE_WEBHOOK_SECRET } from "@/app/_lib/stripe";
import { sql } from "@/app/_lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "invalid";
    return NextResponse.json({ error: `bad_signature: ${msg}` }, { status: 400 });
  }

  // Idempotency gate. Stripe retries failed webhooks for up to 3 days, so
  // the same event.id can land multiple times. Insert with conflict-do-
  // nothing; if no row was inserted, this delivery is a duplicate and we
  // ack 200 without re-running the handler. Stored event_created_at also
  // gives downstream handlers the ordering signal they need.
  const eventCreatedAt = new Date(event.created * 1000);
  const inserted = await sql<Array<{ id: string }>>`
    insert into public.webhook_events (id, type, event_created_at)
    values (${event.id}, ${event.type}, ${eventCreatedAt})
    on conflict (id) do nothing
    returning id
  `;
  if (inserted.length === 0) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session,
          eventCreatedAt,
        );
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await syncSubscription(
          event.data.object as Stripe.Subscription,
          eventCreatedAt,
        );
        break;
      case "customer.subscription.deleted":
        await markCanceled(event.data.object as Stripe.Subscription, eventCreatedAt);
        break;
      case "invoice.payment_failed":
        await markPastDue(event.data.object as Stripe.Invoice, eventCreatedAt);
        break;
      case "invoice.payment_succeeded":
      case "invoice.paid":
        await syncFromInvoice(event.data.object as Stripe.Invoice, eventCreatedAt);
        break;
      case "invoice.payment_action_required":
      case "invoice.finalized":
        // Invoice generated and waiting on the customer (3DS confirmation
        // for cards, future voucher rails). Status doesn't change here —
        // the eventual payment_succeeded/payment_failed is what flips it.
        console.log("[stripe webhook] invoice pending", event.id);
        break;
      default:
        // No-op. Stripe sends a lot we don't care about.
        break;
    }
  } catch (e) {
    // Roll back the idempotency row so Stripe's retry can re-attempt this
    // event after a transient failure (DB blip, network glitch). Without
    // this the row would block retries from processing.
    await sql`delete from public.webhook_events where id = ${event.id}`;
    console.error("[stripe webhook]", event.type, e);
    return NextResponse.json({ error: "handler_failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  eventCreatedAt: Date,
) {
  const orgId = session.client_reference_id ?? session.metadata?.org_id;
  if (!orgId) {
    console.warn(
      "[stripe webhook] checkout.session.completed without org_id metadata",
      session.id,
    );
    return;
  }

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id ?? null;

  // Pull the full subscription so we capture trial/period state in one pass.
  // The standalone customer.subscription.created/updated event will arrive
  // separately; both go through syncSubscription which is now ordering-safe
  // via last_stripe_event_at, so duplicate writes are no-ops not races.
  if (subscriptionId) {
    const sub = await stripe.subscriptions.retrieve(subscriptionId);
    await syncSubscription(sub, eventCreatedAt);
  }
}

async function syncSubscription(sub: Stripe.Subscription, eventCreatedAt: Date) {
  const orgId = sub.metadata?.org_id ?? null;
  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;

  const status = mapStatus(sub.status);
  const periodEnd = subscriptionPeriodEnd(sub);

  // Out-of-order guard: only apply if this event is newer than the last
  // Stripe event we've recorded for the org. Stripe doesn't guarantee
  // delivery ordering — without this, a late subscription.updated landing
  // after subscription.deleted would silently regress 'canceled' back to
  // 'unpaid'. The COALESCE for current_period_end preserves the prior
  // value when the SDK shape change leaves it null.
  if (orgId) {
    await sql`
      update public.organizations
         set subscription_status = ${status},
             stripe_customer_id = ${customerId},
             stripe_subscription_id = ${sub.id},
             current_period_end = coalesce(${periodEnd}, current_period_end),
             last_stripe_event_at = ${eventCreatedAt}
       where id = ${orgId}::uuid
         and (last_stripe_event_at is null or last_stripe_event_at <= ${eventCreatedAt})
    `;
    return;
  }

  // Fallback: lookup org by customer id (subscription created without metadata).
  await sql`
    update public.organizations
       set subscription_status = ${status},
           stripe_subscription_id = ${sub.id},
           current_period_end = coalesce(${periodEnd}, current_period_end),
           last_stripe_event_at = ${eventCreatedAt}
     where stripe_customer_id = ${customerId}
       and (last_stripe_event_at is null or last_stripe_event_at <= ${eventCreatedAt})
  `;
}

/**
 * When an invoice clears (card auto-charge OR async voucher payment),
 * pull the parent subscription and re-sync. Goes through the same code
 * path as a subscription.updated event so status/period_end stay in
 * lockstep regardless of which event arrived first.
 */
async function syncFromInvoice(invoice: Stripe.Invoice, eventCreatedAt: Date) {
  const subscriptionField = (invoice as unknown as {
    subscription?: string | { id?: string } | null;
  }).subscription;
  const subscriptionId =
    typeof subscriptionField === "string"
      ? subscriptionField
      : subscriptionField?.id ?? null;
  if (!subscriptionId) return; // One-off / standalone invoices — no sub to sync.
  const sub = await stripe.subscriptions.retrieve(subscriptionId);
  await syncSubscription(sub, eventCreatedAt);
}

async function markCanceled(sub: Stripe.Subscription, eventCreatedAt: Date) {
  // Scope by subscription_id only. Earlier code OR'd by customer_id which
  // would nuke unrelated rows if a customer ever holds multiple orgs (no
  // schema constraint enforces 1:1 today). The subscription_id is the
  // unique handle for this lifecycle event.
  await sql`
    update public.organizations
       set subscription_status = 'canceled',
           stripe_subscription_id = null,
           last_stripe_event_at = ${eventCreatedAt}
     where stripe_subscription_id = ${sub.id}
       and (last_stripe_event_at is null or last_stripe_event_at <= ${eventCreatedAt})
  `;
}

async function markPastDue(invoice: Stripe.Invoice, eventCreatedAt: Date) {
  const subscriptionField = (invoice as unknown as {
    subscription?: string | { id?: string } | null;
  }).subscription;
  const subscriptionId =
    typeof subscriptionField === "string"
      ? subscriptionField
      : subscriptionField?.id ?? null;
  // Only flip past_due for subscription invoices. One-off invoices (manual
  // charges, prorations on a different price) failing should not lock the
  // whole org out.
  if (!subscriptionId) return;
  await sql`
    update public.organizations
       set subscription_status = 'past_due',
           last_stripe_event_at = ${eventCreatedAt}
     where stripe_subscription_id = ${subscriptionId}
       and subscription_status not in ('canceled')
       and (last_stripe_event_at is null or last_stripe_event_at <= ${eventCreatedAt})
  `;
}

function mapStatus(s: Stripe.Subscription.Status): string {
  switch (s) {
    case "trialing": return "trialing";
    case "active": return "active";
    case "past_due": return "past_due";
    case "canceled": return "canceled";
    case "unpaid": return "unpaid";
    // 'incomplete' = Checkout pending payment confirmation (3DS in flight).
    // Distinct from 'unpaid' — the user still has pending opportunity to
    // complete first invoice; paywall should treat it as "in progress",
    // not "locked out".
    case "incomplete": return "incomplete";
    case "incomplete_expired": return "unpaid";
    case "paused": return "unpaid";
    default: return "unpaid";
  }
}

function subscriptionPeriodEnd(sub: Stripe.Subscription): Date | null {
  const top = (sub as unknown as { current_period_end?: number }).current_period_end;
  if (typeof top === "number") return new Date(top * 1000);
  const item = sub.items?.data?.[0] as
    | { current_period_end?: number }
    | undefined;
  if (item && typeof item.current_period_end === "number") {
    return new Date(item.current_period_end * 1000);
  }
  return null;
}
