import "server-only";
import Stripe from "stripe";

const secret = process.env.STRIPE_SECRET_KEY;
if (!secret) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

export const stripe = new Stripe(secret, {
  typescript: true,
});

export const STRIPE_PRICE_ID = (() => {
  const v = process.env.STRIPE_PRICE_ID;
  if (!v) throw new Error("Missing STRIPE_PRICE_ID");
  return v;
})();

export const STRIPE_WEBHOOK_SECRET = (() => {
  const v = process.env.STRIPE_WEBHOOK_SECRET;
  if (!v) throw new Error("Missing STRIPE_WEBHOOK_SECRET");
  return v;
})();

/**
 * Toggle Stripe Tax + RFC (Mexican tax ID) collection on Checkout. Requires
 * Stripe Tax to be enabled in the Stripe Dashboard with MX registered as a
 * tax jurisdiction; otherwise Checkout returns "Stripe Tax has not been
 * activated on your account." Default off so dev keeps working without it.
 */
export const STRIPE_TAX_ENABLED =
  (process.env.STRIPE_TAX_ENABLED ?? "false").toLowerCase() === "true";

/**
 * Payment methods offered on subscription-mode Checkout. Stripe rejects
 * voucher-style methods (oxxo, customer_balance/SPEI) in subscription mode
 * with charge_automatically collection — those rails only work via
 * `send_invoice` collection on a separate flow. Card is the only auto-
 * renewable rail allowed here. Stripe Checkout still surfaces wallet
 * derivatives of card (Apple Pay, Google Pay, Link) automatically when
 * card is enabled, so the user still gets a multi-option picker.
 *
 * OXXO and SPEI for recurring billing are deferred to a manual-invoice
 * flow (Phase 7).
 */
export const STRIPE_SUBSCRIPTION_PAYMENT_METHODS = (() => {
  const raw = process.env.STRIPE_SUBSCRIPTION_PAYMENT_METHODS ?? "card";
  const parsed = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s): s is "card" => s === "card");
  // Card is mandatory — Stripe can't auto-renew anything else on
  // charge_automatically subscriptions. Force it on even if env is empty
  // or contained only invalid entries.
  return parsed.length > 0 ? parsed : (["card"] as Array<"card">);
})();
