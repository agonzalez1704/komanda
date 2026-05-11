import type { Metadata } from "next";
import { SignInForm } from "./signin-form";
import { AuthShell } from "../_components/auth-shell";

export const metadata: Metadata = {
  title: "Iniciar sesión · Komanda",
  description: "Entra a tu panel de Komanda con las mismas credenciales de la app.",
};

export default function SignInPage() {
  return (
    <AuthShell
      title="Bienvenido de vuelta"
      subtitle="Las mismas credenciales que usas en la app móvil te dan entrada al panel web."
      side="signin"
    >
      <SignInForm />
    </AuthShell>
  );
}
