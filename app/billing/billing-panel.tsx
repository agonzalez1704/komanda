"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { insforge } from "../_lib/insforge";
import {
  PRICE_MXN,
  PRICE_CURRENCY,
  PRICE_CADENCE_ES,
  TRIAL_DAYS,
} from "../_lib/config";
import {
  type OrgBillingState,
  type SubscriptionStatus,
  daysRemaining,
  effectiveStatus,
  statusColor,
  statusLabel,
} from "../_lib/billing";

type LoadState =
  | { kind: "loading" }
  | { kind: "unauthenticated" }
  | { kind: "no-org" }
  | { kind: "error"; message: string }
  | { kind: "ready"; org: OrgBillingState };

export function BillingPanel() {
  const router = useRouter();
  const params = useSearchParams();
  const stripeFlag = params.get("stripe");
  const [state, setState] = useState<LoadState>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { data: userData, error: userErr } =
          await insforge.auth.getCurrentUser();
        if (userErr || !userData?.user) {
          if (!cancelled) setState({ kind: "unauthenticated" });
          return;
        }

        const { data: membership, error: memErr } = await insforge.database
          .from("organization_members")
          .select(
            "org_id, organization:organizations(id, name, subscription_status, trial_ends_at, current_period_end, stripe_customer_id, stripe_subscription_id)"
          )
          .eq("auth_user_id", userData.user.id)
          .limit(1)
          .maybeSingle();

        if (memErr) {
          if (!cancelled)
            setState({ kind: "error", message: memErr.message ?? "Unknown error" });
          return;
        }

        const org = (membership?.organization as OrgBillingState | undefined) ?? null;
        if (!org) {
          if (!cancelled) setState({ kind: "no-org" });
          return;
        }

        if (!cancelled) setState({ kind: "ready", org });
      } catch (e) {
        if (!cancelled)
          setState({
            kind: "error",
            message: e instanceof Error ? e.message : "Unknown error",
          });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.kind === "loading") {
    return (
      <div className="space-y-3">
        <StripeBanner flag={stripeFlag} />
        <div className="card-stone p-8 text-center text-[14px] text-[#848281]">
          Cargando tu suscripción…
        </div>
      </div>
    );
  }

  if (state.kind === "unauthenticated") {
    return (
      <div className="card-stone p-8 space-y-4">
        <h3 className="text-[19px] font-semibold tracking-[-0.25px] text-[#121212]">
          Inicia sesión
        </h3>
        <p className="text-[14px] leading-[1.5] text-[#474645]">
          Para ver el estado de tu suscripción necesitas entrar con tu cuenta.
        </p>
        <button
          onClick={() => router.push("/signin")}
          className="w-full rounded-full bg-[#121212] px-5 py-3.5 text-[14px] font-semibold text-white"
        >
          Ir a iniciar sesión
        </button>
      </div>
    );
  }

  if (state.kind === "no-org") {
    return (
      <div className="card-stone p-8 space-y-4">
        <h3 className="text-[19px] font-semibold tracking-[-0.25px] text-[#121212]">
          Tu cuenta no tiene taquería
        </h3>
        <p className="text-[14px] leading-[1.5] text-[#474645]">
          Termina el registro para crear tu organización y empezar la prueba de{" "}
          {TRIAL_DAYS} días.
        </p>
        <Link
          href="/signup"
          className="inline-flex w-full items-center justify-center rounded-full bg-[#121212] px-5 py-3.5 text-[14px] font-semibold text-white"
        >
          Crear taquería
        </Link>
      </div>
    );
  }

  if (state.kind === "error") {
    return (
      <div className="card-stone p-8 space-y-3">
        <h3 className="text-[19px] font-semibold tracking-[-0.25px] text-[#121212]">
          No pudimos cargar tu suscripción
        </h3>
        <p className="text-[13px] leading-[1.5] text-[#c2202d]">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <StripeBanner flag={stripeFlag} />
      <ReadyPanel org={state.org} />
    </div>
  );
}

function StripeBanner({ flag }: { flag: string | null }) {
  if (flag === "success") {
    return (
      <div className="flex items-start gap-2.5 rounded-[12px] bg-[#00ca48]/12 px-4 py-3 text-[13px] text-[#0a7a2c]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
          <path d="M5 13l4 4L19 7" />
        </svg>
        <span className="leading-[1.45]">
          ¡Listo! Tu método de pago quedó guardado. Stripe nos avisó y estamos sincronizando — refresca en unos segundos si no ves el cambio.
        </span>
      </div>
    );
  }
  if (flag === "cancel") {
    return (
      <div className="flex items-start gap-2.5 rounded-[12px] bg-[#ffbb26]/15 px-4 py-3 text-[13px] text-[#8a6300]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
          <circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" />
        </svg>
        <span className="leading-[1.45]">
          Cancelaste el pago. Tu prueba sigue intacta — puedes reintentar cuando quieras.
        </span>
      </div>
    );
  }
  return null;
}

function ReadyPanel({ org }: { org: OrgBillingState }) {
  const status = effectiveStatus(org);
  const color = statusColor(status);
  const label = statusLabel(status);

  return (
    <div className="space-y-4">
      <header className="card-stone p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[1.4px] text-[#848281]">
              Taquería
            </p>
            <h3 className="mt-1 font-display text-[28px] tracking-[-0.7px] leading-none text-[#121212]">
              {org.name}
            </h3>
          </div>
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-semibold tracking-[-0.14px] text-white"
            style={{ background: color }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            {label}
          </span>
        </div>
      </header>

      <StateCard status={status} org={org} />

      <PlanSummary />

      <div className="rounded-[12px] bg-[#f8f7f4] p-5 text-[13px] leading-[1.5] tracking-[-0.17px] text-[#474645]">
        <p>
          ¿Dudas con tu suscripción? Escríbenos a{" "}
          <a
            className="font-semibold text-[#121212] underline"
            href="mailto:hola@komanda.app"
          >
            hola@komanda.app
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function StateCard({
  status,
  org,
}: {
  status: SubscriptionStatus;
  org: OrgBillingState;
}) {
  if (status === "trialing") {
    const days = daysRemaining(org.trial_ends_at);
    const ends = new Date(org.trial_ends_at).toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return (
      <div className="card-stone p-7 space-y-5">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[1.4px] text-[#0090ff]">
            En periodo de prueba
          </p>
          <div className="mt-3 flex items-end gap-2">
            <span className="font-display text-[64px] leading-[0.9] tracking-[-2px] tabular text-[#121212]">
              {days}
            </span>
            <span className="pb-2 text-[15px] tracking-[-0.2px] text-[#474645]">
              {days === 1 ? "día restante" : "días restantes"}
            </span>
          </div>
          <p className="mt-2 text-[13px] tracking-[-0.17px] text-[#848281]">
            Tu prueba termina el {ends}. Después se cobrará{" "}
            <span className="font-semibold text-[#343433]">
              ${PRICE_MXN} {PRICE_CURRENCY} {PRICE_CADENCE_ES}
            </span>
            {" "}(+IVA si aplica).
          </p>
        </div>

        <AddPaymentButton />

        <p className="text-[12px] tracking-[-0.14px] text-[#a7a7a7]">
          Te llevamos a Stripe Checkout. Solo cobramos cuando tu prueba termine.
        </p>
      </div>
    );
  }

  if (status === "active") {
    return (
      <div className="card-stone p-7 space-y-4">
        <p className="text-[12px] font-semibold uppercase tracking-[1.4px] text-[#00ca48]">
          Suscripción activa
        </p>
        <p className="text-[15px] leading-[1.5] tracking-[-0.2px] text-[#343433]">
          Estás al corriente. Próximo cargo el{" "}
          <span className="font-semibold text-[#121212]">
            {org.current_period_end
              ? new Date(org.current_period_end).toLocaleDateString("es-MX", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "—"}
          </span>{" "}
          por <span className="font-semibold text-[#121212]">${PRICE_MXN} {PRICE_CURRENCY}</span>.
        </p>
        <ManageButton />
      </div>
    );
  }

  if (status === "past_due") {
    return (
      <div className="card-stone p-7 space-y-4">
        <p className="text-[12px] font-semibold uppercase tracking-[1.4px] text-[#ffbb26]">
          Pago pendiente
        </p>
        <p className="text-[15px] leading-[1.5] tracking-[-0.2px] text-[#343433]">
          No pudimos cobrar tu última factura. Actualiza tu método de pago para
          que tu equipo siga tomando komandas sin interrupciones.
        </p>
        <ManageButton />
      </div>
    );
  }

  // expired / canceled / unpaid
  return (
    <div className="rounded-[16px] bg-[#121212] text-white p-7 space-y-5">
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[1.4px] text-[#ff3e00]">
          {status === "expired" ? "Prueba terminada" : "Suscripción inactiva"}
        </p>
        <h3 className="mt-3 font-display text-[28px] tracking-[-0.7px] leading-none">
          Reactiva Komanda para seguir cobrando
        </h3>
        <p className="mt-3 text-[14.5px] leading-[1.5] tracking-[-0.18px] text-white/70">
          Por solo{" "}
          <span className="font-semibold text-white">
            ${PRICE_MXN} {PRICE_CURRENCY} {PRICE_CADENCE_ES}
          </span>
          {" "}desbloqueas komandas, dashboard, recibos por WhatsApp y soporte.
        </p>
      </div>
      <AddPaymentButton dark />
      <p className="text-[12px] tracking-[-0.14px] text-white/50">
        Pago seguro vía Stripe. Aceptamos tarjetas mexicanas e internacionales.
      </p>
    </div>
  );
}

function AddPaymentButton({
  dark = false,
}: {
  dark?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleClick() {
    setErr(null);
    setBusy(true);
    try {
      // Mint a fresh access token from the SDK's httpOnly refresh cookie so
      // our server can authenticate the user. Browser SDK doesn't expose its
      // in-memory token, but refreshSession returns a new one we can forward.
      const { data: refreshed, error: refreshErr } =
        await insforge.auth.refreshSession();
      if (refreshErr || !refreshed?.accessToken) {
        setErr("Tu sesión expiró. Vuelve a iniciar sesión.");
        return;
      }
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { Authorization: `Bearer ${refreshed.accessToken}` },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErr(checkoutErrorLabel(body.error ?? `HTTP ${res.status}`));
        return;
      }
      const { url } = (await res.json()) as { url?: string };
      if (!url) {
        setErr("Stripe no devolvió un link de pago.");
        return;
      }
      window.location.assign(url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error iniciando el pago.");
    } finally {
      setBusy(false);
    }
  }

  const cls = dark
    ? "bg-[#ff3e00] text-white hover:translate-y-[-1px]"
    : "bg-[#121212] text-white hover:bg-[#343433]";

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={busy}
        className={`w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold tracking-[-0.18px] transition-all disabled:opacity-60 disabled:cursor-not-allowed ${cls}`}
      >
        {busy ? "Abriendo Stripe…" : "Agregar método de pago"}
        {!busy && (
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path d="M3 6h6m0 0L6.5 3.5M9 6L6.5 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      {err && (
        <p className={`text-[12px] ${dark ? "text-white/80" : "text-[#c2202d]"}`}>
          {err}
        </p>
      )}
    </div>
  );
}

function checkoutErrorLabel(code: string): string {
  switch (code) {
    case "unauthenticated": return "Tu sesión expiró. Vuelve a iniciar sesión.";
    case "no_admin_org": return "Solo el administrador de la taquería puede agregar pago.";
    case "already_active": return "Tu suscripción ya está activa.";
    default: return code;
  }
}

function ManageButton() {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleClick() {
    setErr(null);
    setBusy(true);
    try {
      const { data: refreshed, error: refreshErr } =
        await insforge.auth.refreshSession();
      if (refreshErr || !refreshed?.accessToken) {
        setErr("Tu sesión expiró. Vuelve a iniciar sesión.");
        return;
      }
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { Authorization: `Bearer ${refreshed.accessToken}` },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErr(portalErrorLabel(body.error ?? `HTTP ${res.status}`));
        return;
      }
      const { url } = (await res.json()) as { url?: string };
      if (!url) {
        setErr("Stripe no devolvió un link.");
        return;
      }
      window.location.assign(url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error abriendo el portal.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={busy}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#f2f0ed] bg-white px-6 py-3 text-[14px] font-medium text-[#343433] disabled:opacity-60 hover:bg-[#f8f7f4] transition-colors"
      >
        {busy ? "Abriendo portal…" : "Administrar suscripción"}
      </button>
      {err && <p className="text-[12px] text-[#c2202d]">{err}</p>}
    </div>
  );
}

function portalErrorLabel(code: string): string {
  switch (code) {
    case "unauthenticated": return "Tu sesión expiró. Vuelve a iniciar sesión.";
    case "no_customer": return "Aún no tienes un método de pago. Agrega uno primero.";
    default: return code;
  }
}

function PlanSummary() {
  return (
    <div className="card-stone p-7">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[1.4px] text-[#848281]">
            Plan
          </p>
          <h4 className="mt-1.5 text-[17px] font-semibold tracking-[-0.22px] text-[#343433]">
            Komanda Completo
          </h4>
        </div>
        <div className="text-right">
          <div className="font-display text-[28px] leading-none tracking-[-0.7px] tabular text-[#121212]">
            ${PRICE_MXN}
          </div>
          <div className="text-[11px] uppercase tracking-[1.2px] text-[#848281]">
            {PRICE_CURRENCY} {PRICE_CADENCE_ES}
          </div>
          <div className="text-[11px] tracking-[-0.14px] text-[#a7a7a7] mt-0.5">
            +IVA si aplica
          </div>
        </div>
      </div>
      <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2 text-[13.5px] tracking-[-0.18px] text-[#474645]">
        <li>— Meseros y mesas ilimitadas</li>
        <li>— Komandas sin tope diario</li>
        <li>— Recibos por WhatsApp y PDF</li>
        <li>— Sincronización offline</li>
        <li>— Audit log + cierre de día</li>
        <li>— iOS, Android, panel web</li>
      </ul>
    </div>
  );
}
