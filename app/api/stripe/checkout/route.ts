import { NextResponse } from "next/server";
import {
  stripe,
  STRIPE_PRICE_ID,
  STRIPE_TAX_ENABLED,
  STRIPE_SUBSCRIPTION_PAYMENT_METHODS,
} from "@/app/_lib/stripe";
import { sql } from "@/app/_lib/db";
import { userFromBearer } from "@/app/_lib/auth-server";

export const runtime = "nodejs";

type OrgRow = {
  id: string;
  name: string;
  subscription_status: string;
  trial_ends_at: string;
  stripe_customer_id: string | null;
};

export async function POST(req: Request) {
  const user = await userFromBearer(req);
  if (!user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const rows = await sql<OrgRow[]>`
    select o.id, o.name, o.subscription_status, o.trial_ends_at, o.stripe_customer_id
      from public.organizations o
      join public.organization_members m on m.org_id = o.id
     where m.auth_user_id = ${user.id}::uuid
       and m.role = 'admin'
     limit 1
  `;
  const org = rows[0];
  if (!org) {
    return NextResponse.json({ error: "no_admin_org" }, { status: 403 });
  }

  if (org.subscription_status === "active") {
    return NextResponse.json(
      { error: "already_active" },
      { status: 409 }
    );
  }

  // Reuse existing Stripe customer for the org if we already created one;
  // otherwise let Checkout mint a fresh one bound to the user's email.
  let customerId = org.stripe_customer_id ?? null;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { org_id: org.id, org_name: org.name },
    });
    customerId = customer.id;
    await sql`
      update public.organizations
         set stripe_customer_id = ${customerId}
       where id = ${org.id}::uuid
    `;
  }

  // Preserve remaining trial: pass our trial_ends_at to Stripe so the user
  // doesn't lose days they were promised. If trial already expired, omit
  // and Stripe charges immediately.
  const trialEndsMs = new Date(org.trial_ends_at).getTime();
  const trialEnd =
    trialEndsMs > Date.now() ? Math.floor(trialEndsMs / 1000) : undefined;

  const origin =
    process.env.NEXT_PUBLIC_APP_URL ?? new URL(req.url).origin;

  // Subscription-mode Checkout only accepts charge-automatic rails (card
  // and its wallet derivatives — Apple Pay, Google Pay, Link). Voucher-
  // based methods (OXXO, SPEI/customer_balance) are rejected by Stripe in
  // this mode and are deferred to a manual-invoice flow.
  //
  // Omitting payment_method_types entirely lets Stripe Checkout pick from
  // every method enabled on the price/account that's compatible with
  // subscription mode — gives the user the full picker UX (card + wallets)
  // without us having to enumerate each one.
  const methods = STRIPE_SUBSCRIPTION_PAYMENT_METHODS;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
    payment_method_types: methods,
    subscription_data: {
      trial_end: trialEnd,
      metadata: { org_id: org.id },
    },
    client_reference_id: org.id,
    locale: "es-419",
    allow_promotion_codes: true,
    // Tax requires the address; require it when tax is on, leave optional
    // otherwise so the test flow stays one-click.
    billing_address_collection: STRIPE_TAX_ENABLED ? "required" : "auto",
    automatic_tax: { enabled: STRIPE_TAX_ENABLED },
    tax_id_collection: { enabled: STRIPE_TAX_ENABLED },
    // Allow Stripe to update the customer record with whatever the user
    // enters at Checkout (needed for Tax + RFC + portal updates).
    customer_update: STRIPE_TAX_ENABLED
      ? { address: "auto", name: "auto" }
      : undefined,
    success_url: `${origin}/billing?stripe=success`,
    cancel_url: `${origin}/billing?stripe=cancel`,
    metadata: { org_id: org.id },
  });

  return NextResponse.json({ url: session.url });
}
