import type { Metadata } from "next";
import { Suspense } from "react";
import { BillingPanel } from "./billing-panel";
import { AuthShell } from "../_components/auth-shell";

export const metadata: Metadata = {
  title: "Facturación · Komanda",
  description: "Estado de tu prueba y suscripción de Komanda.",
};

export const dynamic = "force-dynamic";

export default function BillingPage() {
  return (
    <AuthShell
      title="Tu suscripción a Komanda"
      subtitle="Aquí ves cuántos días te quedan de prueba y administras el método de pago. Las mismas credenciales funcionan en la app móvil."
      side="signin"
    >
      <Suspense
        fallback={
          <div className="card-stone p-8 text-center text-[14px] text-[#848281]">
            Cargando…
          </div>
        }
      >
        <BillingPanel />
      </Suspense>
    </AuthShell>
  );
}
