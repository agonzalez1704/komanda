import type { Metadata } from "next";
import { SignupFlow } from "./signup-flow";
import { AuthShell } from "../_components/auth-shell";

export const metadata: Metadata = {
  title: "Crear cuenta · Komanda",
  description:
    "Crea tu taquería en Komanda en menos de 4 minutos. Las mismas credenciales funcionan en la app móvil.",
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Crea tu taquería en Komanda"
      subtitle="Te toma 4 minutos. Lo que registres aquí — correo y contraseña — funciona idéntico en la app móvil."
      side="signup"
    >
      <SignupFlow />
    </AuthShell>
  );
}
