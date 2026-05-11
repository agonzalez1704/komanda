"use client";

import Link from "next/link";
import { useState } from "react";
import { insforge } from "../_lib/insforge";
import { TRIAL_DAYS, APP_STORE_URL, PLAY_STORE_URL } from "../_lib/config";

type Step = "form" | "otp" | "org" | "done";

type FormState = {
  businessName: string;
  ownerName: string;
  email: string;
  password: string;
};

const initialForm: FormState = {
  businessName: "",
  ownerName: "",
  email: "",
  password: "",
};

export function SignupFlow() {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState<FormState>(initialForm);
  const [otp, setOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendNotice, setResendNotice] = useState<string | null>(null);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.password.length < 6) {
      setError("La contraseña necesita al menos 6 caracteres.");
      return;
    }
    if (!form.businessName.trim() || !form.ownerName.trim()) {
      setError("Necesitamos el nombre de tu taquería y el tuyo.");
      return;
    }

    setSubmitting(true);
    try {
      const { data, error: signUpError } = await insforge.auth.signUp({
        email: form.email.trim().toLowerCase(),
        password: form.password,
        name: form.ownerName.trim(),
      });
      if (signUpError) {
        setError(humanizeAuthError(signUpError.message));
        return;
      }

      if (data?.requireEmailVerification) {
        setStep("otp");
        return;
      }

      // No verification required — already signed in. Create org now.
      await createOrgAndFinish();
    } catch (err) {
      setError(humanizeAuthError(asMessage(err)));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const code = otp.replace(/\D/g, "");
    if (code.length !== 6) {
      setError("Escribe el código de 6 dígitos que llegó al correo.");
      return;
    }

    setSubmitting(true);
    try {
      const { error: verifyError } = await insforge.auth.verifyEmail({
        email: form.email.trim().toLowerCase(),
        otp: code,
      });
      if (verifyError) {
        setError(humanizeAuthError(verifyError.message));
        return;
      }
      await createOrgAndFinish();
    } catch (err) {
      setError(humanizeAuthError(asMessage(err)));
    } finally {
      setSubmitting(false);
    }
  }

  async function createOrgAndFinish() {
    setStep("org");
    try {
      const { error: rpcError } = await insforge.database.rpc(
        "create_organization_and_member",
        {
          p_name: form.businessName.trim(),
          p_display_name: form.ownerName.trim(),
          p_trial_days: TRIAL_DAYS,
        }
      );
      if (rpcError) {
        if (rpcError.message?.includes("already_member")) {
          // User already had an org — still fine.
        } else {
          setError(humanizeAuthError(rpcError.message));
          setStep("otp");
          return;
        }
      }
      setStep("done");
    } catch (err) {
      setError(humanizeAuthError(asMessage(err)));
      setStep("otp");
    }
  }

  async function handleResend() {
    setResendNotice(null);
    try {
      await insforge.auth.resendVerificationEmail({
        email: form.email.trim().toLowerCase(),
      });
      setResendNotice("Te mandamos otro código. Revisa también la carpeta de spam.");
    } catch (err) {
      setError(humanizeAuthError(asMessage(err)));
    }
  }

  if (step === "done") {
    return <SuccessPanel email={form.email} business={form.businessName} />;
  }

  if (step === "org") {
    return (
      <div className="card-stone p-9 md:p-10 text-center">
        <Spinner />
        <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.25px] text-[#343433]">
          Preparando tu taquería…
        </h3>
        <p className="mt-2 text-[14px] leading-[1.5] text-[#848281]">
          Creando organización, asignándote como administrador y dejando todo listo.
        </p>
      </div>
    );
  }

  if (step === "otp") {
    return (
      <form onSubmit={handleVerify} className="card-stone p-9 md:p-10 space-y-6">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[1.4px] text-[#ff3e00]">
            Paso 2 de 2
          </p>
          <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.4px] text-[#121212]">
            Verifica tu correo
          </h3>
          <p className="mt-2 text-[14px] leading-[1.5] text-[#474645]">
            Mandamos un código de 6 dígitos a{" "}
            <span className="font-semibold text-[#121212]">{form.email}</span>.
          </p>
        </div>

        <Field label="Código de 6 dígitos">
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="000000"
            className="w-full rounded-[10px] bg-[#f8f7f4] px-4 py-3.5 text-[20px] font-semibold tracking-[8px] text-center text-[#121212] tabular outline-none focus:bg-white focus:shadow-[0_0_0_2px_#ff3e0033]"
          />
        </Field>

        {error && <ErrorBanner>{error}</ErrorBanner>}
        {resendNotice && (
          <p className="text-[13px] text-[#00a83a]">{resendNotice}</p>
        )}

        <SubmitButton submitting={submitting}>Verificar y continuar</SubmitButton>

        <div className="flex items-center justify-between text-[13px]">
          <button
            type="button"
            onClick={handleResend}
            className="text-[#ff3e00] font-medium hover:opacity-70 transition-opacity"
          >
            Reenviar código
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("form");
              setError(null);
            }}
            className="text-[#848281] hover:text-[#343433] transition-colors"
          >
            ← Cambiar correo
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSignUp} className="card-stone p-9 md:p-10 space-y-6">
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[1.4px] text-[#ff3e00]">
          Paso 1 de 2
        </p>
        <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.4px] text-[#121212]">
          Cuéntanos de ti y de tu taquería
        </h3>
      </div>

      <Field label="Nombre de la taquería">
        <input
          type="text"
          autoComplete="organization"
          required
          value={form.businessName}
          onChange={(e) => setForm({ ...form, businessName: e.target.value })}
          placeholder="Taquería La Esquina"
          className="form-input"
        />
      </Field>

      <Field label="Tu nombre">
        <input
          type="text"
          autoComplete="name"
          required
          value={form.ownerName}
          onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
          placeholder="Beto Ramírez"
          className="form-input"
        />
      </Field>

      <Field label="Correo">
        <input
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="dueño@taqueria.mx"
          className="form-input"
        />
      </Field>

      <Field
        label="Contraseña"
        hint="Mínimo 6 caracteres. La misma con la que entras a la app."
      >
        <input
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="••••••••"
          className="form-input"
        />
      </Field>

      {error && <ErrorBanner>{error}</ErrorBanner>}

      <SubmitButton submitting={submitting}>
        Crear cuenta y enviar código
      </SubmitButton>

      <p className="text-[12px] leading-[1.5] text-[#848281] tracking-[-0.14px]">
        Al continuar aceptas nuestros{" "}
        <a className="underline hover:text-[#343433]" href="#">Términos</a> y la{" "}
        <a className="underline hover:text-[#343433]" href="#">política de privacidad</a>.
      </p>

      <div className="border-t border-[#f2f0ed] pt-4 text-center text-[13px] text-[#474645]">
        ¿Ya tienes cuenta?{" "}
        <Link href="/signin" className="text-[#ff3e00] font-medium hover:opacity-70">
          Inicia sesión
        </Link>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[13px] font-medium tracking-[-0.17px] text-[#343433] mb-1.5">
        {label}
      </span>
      {children}
      {hint && (
        <span className="mt-1.5 block text-[12px] tracking-[-0.14px] text-[#848281]">
          {hint}
        </span>
      )}
    </label>
  );
}

function ErrorBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-[10px] bg-[#ff2b3a]/10 px-3 py-2.5 text-[13px] text-[#c2202d]">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
      </svg>
      <span className="leading-[1.4]">{children}</span>
    </div>
  );
}

function SubmitButton({
  submitting,
  children,
}: {
  submitting: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={submitting}
      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#121212] px-6 py-3.5 text-[14px] font-semibold tracking-[-0.18px] text-white transition-colors hover:bg-[#343433] disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {submitting ? <Spinner small /> : null}
      {children}
    </button>
  );
}

function Spinner({ small = false }: { small?: boolean }) {
  const size = small ? 14 : 28;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
      style={{ display: "inline-block" }}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.2" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function SuccessPanel({
  email,
  business,
}: {
  email: string;
  business: string;
}) {
  return (
    <div className="card-stone p-9 md:p-10 space-y-6">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-[#00ca48]/15 text-[#00ca48]">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h3 className="text-[24px] font-semibold tracking-[-0.5px] text-[#121212]">
          ¡Bienvenido, {business}!
        </h3>
        <p className="mt-2 text-[15px] leading-[1.5] text-[#474645]">
          Tu cuenta de administrador está lista. Las mismas credenciales que
          acabas de crear funcionan en la app móvil — descárgala e inicia sesión
          con <span className="font-semibold text-[#121212]">{email}</span>.
        </p>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        <a
          href={APP_STORE_URL}
          className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-[#121212] px-5 py-3.5 text-[14px] font-semibold text-white"
        >
          <AppleIcon /> Descargar para iOS
        </a>
        <a
          href={PLAY_STORE_URL}
          className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-[#121212] px-5 py-3.5 text-[14px] font-semibold text-white"
        >
          <PlayIcon /> Descargar para Android
        </a>
      </div>

      <div className="rounded-[12px] bg-[#f8f7f4] p-4">
        <p className="text-[13px] font-semibold tracking-[-0.17px] text-[#343433]">
          Mientras tanto:
        </p>
        <ul className="mt-2 space-y-1.5 text-[13.5px] leading-[1.5] text-[#474645]">
          <li>
            1. Revisa tu suscripción —{" "}
            <Link href="/billing" className="text-[#ff3e00] font-medium">
              ver estado de la prueba →
            </Link>
          </li>
          <li>
            2. Invita a tus meseros desde Ajustes → Equipo en cualquier dispositivo.
          </li>
          <li>
            3. Toma tu primera komanda. Tu prueba de {TRIAL_DAYS} días empieza ahora.
          </li>
        </ul>
      </div>
    </div>
  );
}

function AppleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 2.5v19c0 .53.21 1.03.59 1.41l11-10.91L3.59 1.09C3.21 1.47 3 1.97 3 2.5zm12.5 5.5L19.5 12l-4 4-2.91-2.91L15.5 8zM4.5 23.5L16 12 4.5.5l11 11-11 11z"/></svg>
  );
}

function asMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  return "Algo salió mal. Intenta de nuevo.";
}

function humanizeAuthError(msg: string | undefined): string {
  if (!msg) return "Algo salió mal. Intenta de nuevo.";
  const lower = msg.toLowerCase();
  if (lower.includes("already") && lower.includes("registered"))
    return "Ese correo ya está registrado. Intenta iniciar sesión.";
  if (lower.includes("invalid") && lower.includes("password"))
    return "Correo o contraseña incorrectos.";
  if (lower.includes("invalid") && lower.includes("code"))
    return "Código incorrecto o expirado.";
  if (lower.includes("expired")) return "El código expiró. Pide uno nuevo.";
  if (lower.includes("rate")) return "Demasiados intentos. Espera un minuto.";
  if (lower.includes("name_required"))
    return "Falta el nombre de la taquería o el tuyo.";
  if (lower.includes("already_member"))
    return "Ya tienes una taquería ligada a esta cuenta.";
  return msg;
}
