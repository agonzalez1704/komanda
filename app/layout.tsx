import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Komanda — el POS para taquerías que tus meseros sí van a usar",
  description:
    "Komanda convierte cualquier celular en un POS de mesa. Toma pedidos en segundos, trabaja sin internet, cobra con un toque y comparte recibos por WhatsApp.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/komanda-mascot.png", sizes: "1024x1024", type: "image/png" },
    ],
    apple: "/komanda-mascot.png",
  },
  openGraph: {
    title: "Komanda — POS para taquerías",
    description:
      "La comanda en el bolsillo del mesero. Pedidos en segundos, sin internet, recibos por WhatsApp.",
    type: "website",
    images: ["/komanda-mascot.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fbfaf9] text-[#474645]">
        {children}
      </body>
    </html>
  );
}
