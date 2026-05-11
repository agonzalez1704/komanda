import Link from "next/link";
import { Logo } from "./logo";
import {
  TacoBlob,
  PesoBlob,
  CoinBlob,
  StarBlob,
  ReceiptBlob,
} from "./illustrations";
import { TRIAL_DAYS } from "../_lib/config";

export function AuthShell({
  title,
  subtitle,
  side,
  children,
}: {
  title: string;
  subtitle: string;
  side: "signup" | "signin";
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbfaf9]">
      <header className="px-6 py-5">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#343433]">
            <Logo className="h-7 w-7" />
            <span className="font-display text-[22px] tracking-[-0.6px] leading-none">
              komanda
            </span>
          </Link>
          <Link
            href={side === "signup" ? "/signin" : "/signup"}
            className="text-[14px] font-medium text-[#343433] hover:text-[#121212] transition-colors"
          >
            {side === "signup" ? "¿Ya tienes cuenta? Inicia sesión" : "Crear cuenta nueva"}
          </Link>
        </div>
      </header>

      <main className="flex-1 px-6 pb-16">
        <div className="mx-auto grid max-w-[1100px] gap-12 md:grid-cols-[1fr_minmax(420px,520px)] md:gap-16 md:py-12">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 select-none opacity-90">
              <div className="absolute -left-2 top-2 float-slow"><TacoBlob className="h-24 w-24" /></div>
              <div className="absolute right-4 top-10 float-medium"><PesoBlob className="h-20 w-20" /></div>
              <div className="absolute left-[30%] top-[40%] float-fast"><StarBlob className="h-12 w-12" /></div>
              <div className="absolute right-[10%] bottom-[20%] float-slow"><CoinBlob className="h-16 w-16" /></div>
              <div className="absolute left-2 bottom-4 float-medium"><ReceiptBlob className="h-24 w-24" /></div>
            </div>

            <div className="relative pt-8 md:pt-16">
              <h1 className="font-display text-[40px] md:text-[52px] leading-[1.06] tracking-[-1.4px] md:tracking-[-1.7px] text-[#121212] max-w-[480px]">
                {title}
              </h1>
              <p className="mt-5 max-w-[440px] text-[16px] leading-[1.5] tracking-[-0.2px] text-[#474645]">
                {subtitle}
              </p>

              <div className="mt-10 space-y-3 max-w-[420px]">
                <PerkRow color="#00ca48">
                  Las credenciales que crees aquí entran directo a la app móvil.
                </PerkRow>
                <PerkRow color="#0090ff">
                  {TRIAL_DAYS} días gratis. Cancelas cuando quieras, sin tarjeta.
                </PerkRow>
                <PerkRow color="#ffbb26">
                  Hecho en México, soporte en español.
                </PerkRow>
              </div>
            </div>
          </div>

          <div className="md:pt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}

function PerkRow({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="mt-0.5 grid h-6 w-6 place-items-center rounded-full text-white"
        style={{ background: color }}
      >
        <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
          <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-[14.5px] leading-[1.5] tracking-[-0.18px] text-[#343433]">
        {children}
      </span>
    </div>
  );
}
