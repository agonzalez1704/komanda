/**
 * Single source of truth for product-facing constants.
 * Change here → propagates to landing, signup, pricing, auth shell, success page.
 *
 * Keep server-safe: no React, no client SDKs, no env access.
 * Anything that needs to live in env (Stripe IDs, etc.) goes elsewhere.
 */

export const TRIAL_DAYS = 14;

export const PRICE_MXN = 500;
export const PRICE_USD_APPROX = 28;
export const PRICE_CURRENCY = "MXN" as const;
export const PRICE_CADENCE_ES = "/mes, por taquería";
export const PRICE_CADENCE_EN = "/mo, per location";

export const APP_NAME = "Komanda";
export const SUPPORT_EMAIL = "hola@komanda.app";

export const APP_STORE_URL = "https://apps.apple.com/app/komanda";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=app.komanda";

/** Formatted price strings, ready to drop into JSX. */
export const PRICE_DISPLAY = `$${PRICE_MXN}`;
export const PRICE_USD_DISPLAY = `USD $${PRICE_USD_APPROX}`;
