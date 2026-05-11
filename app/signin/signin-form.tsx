"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { insforge } from "../_lib/insforge";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { error: authError } = await insforge.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (authError) {
        if (authError.statusCode === 403) {
          setError("Tu correo aún no está verificado. Vuelve a registrarte para reenviar el código.");
        } else {
          setError(humanize(authError.message));
        }
        return;
      }
      router.push("/billing");
    } catch (err) {
      setError(humanize(err instanceof Error ? err.message : String(err)));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-stone p-9 md:p-10 space-y-6">
      <div>
        <h3 className="text-[22px] font-semibold tracking-[-0.4px] text-[#121212]">
          Inicia sesión
        </h3>
        <p className="mt-1.5 text-[14px] leading-[1.5] text-[#474645]">
          Entra al panel web. Para entrar en la app, abre Komanda en tu teléfono.
        </p>
      </div>

      <label className="block">
        <span className="block text-[13px] font-medium tracking-[-0.17px] text-[#343433] mb-1.5">
          Correo
        </span>
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="dueño@taqueria.mx"
          className="w-full rounded-[10px] bg-[#f8f7f4] px-4 py-3 text-[15px] tracking-[-0.2px] text-[#121212] outline-none focus:bg-white focus:shadow-[0_0_0_2px_rgba(255,62,0,0.2)] placeholder:text-[#a7a7a7] transition-shadow"
        />
      </label>

      <label className="block">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[13px] font-medium tracking-[-0.17px] text-[#343433]">
            Contraseña
          </span>
          <Link
            href="/forgot-password"
            className="text-[12px] text-[#ff3e00] font-medium hover:opacity-70"
          >
            ¿Olvidaste?
          </Link>
        </div>
        <input
          type="password"
          autoComplete="current-password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full rounded-[10px] bg-[#f8f7f4] px-4 py-3 text-[15px] tracking-[-0.2px] text-[#121212] outline-none focus:bg-white focus:shadow-[0_0_0_2px_rgba(255,62,0,0.2)] placeholder:text-[#a7a7a7] transition-shadow"
        />
      </label>

      {error && (
        <div className="flex items-start gap-2 rounded-[10px] bg-[#ff2b3a]/10 px-3 py-2.5 text-[13px] text-[#c2202d]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
          </svg>
          <span className="leading-[1.4]">{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-[#121212] px-6 py-3.5 text-[14px] font-semibold tracking-[-0.18px] text-white transition-colors hover:bg-[#343433] disabled:opacity-60"
      >
        {submitting ? "Entrando…" : "Entrar"}
      </button>

      <div className="border-t border-[#f2f0ed] pt-4 text-center text-[13px] text-[#474645]">
        ¿Sin cuenta?{" "}
        <Link href="/signup" className="text-[#ff3e00] font-medium hover:opacity-70">
          Crea tu taquería en 4 minutos
        </Link>
      </div>
    </form>
  );
}

function humanize(msg: string | undefined): string {
  if (!msg) return "Algo salió mal. Intenta de nuevo.";
  const lower = msg.toLowerCase();
  if (lower.includes("invalid") && lower.includes("password"))
    return "Correo o contraseña incorrectos.";
  if (lower.includes("not found")) return "No encontramos esa cuenta.";
  if (lower.includes("rate")) return "Demasiados intentos. Espera un minuto.";
  return msg;
}
