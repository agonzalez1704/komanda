import { TRIAL_DAYS } from "./config";

export type SubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "unpaid"
  | "incomplete"
  | "expired";

export type OrgBillingState = {
  id: string;
  name: string;
  subscription_status: SubscriptionStatus;
  trial_ends_at: string;
  current_period_end: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
};

/**
 * Effective status considering trial expiry. Mirrors the SQL function
 * `org_effective_status` so client and DB agree without a roundtrip.
 */
export function effectiveStatus(org: Pick<OrgBillingState, "subscription_status" | "trial_ends_at">): SubscriptionStatus {
  if (
    org.subscription_status === "trialing" &&
    new Date(org.trial_ends_at).getTime() <= Date.now()
  ) {
    return "expired";
  }
  return org.subscription_status;
}

/**
 * Mirrors the SQL `org_has_access` function. Used for client-side gating —
 * server-side rules still enforce via RLS / route middleware.
 */
export function hasAccess(
  org: Pick<OrgBillingState, "subscription_status" | "trial_ends_at" | "current_period_end">
): boolean {
  switch (org.subscription_status) {
    case "active":
      return true;
    case "trialing":
      return new Date(org.trial_ends_at).getTime() > Date.now();
    case "past_due":
      return !!org.current_period_end &&
        new Date(org.current_period_end).getTime() > Date.now();
    default:
      return false;
  }
}

export function daysRemaining(iso: string): number {
  const ms = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export function statusLabel(s: SubscriptionStatus): string {
  switch (s) {
    case "trialing": return "En prueba";
    case "active": return "Activa";
    case "past_due": return "Pago pendiente";
    case "canceled": return "Cancelada";
    case "unpaid": return "Sin pagar";
    case "incomplete": return "Pago en proceso";
    case "expired": return "Prueba terminada";
  }
}

export function statusColor(s: SubscriptionStatus): string {
  switch (s) {
    case "active": return "#00ca48";
    case "trialing":
    case "incomplete": return "#0090ff";
    case "past_due": return "#ffbb26";
    case "expired":
    case "unpaid":
    case "canceled": return "#ff3e00";
  }
}

export const DEFAULT_TRIAL_DAYS = TRIAL_DAYS;
