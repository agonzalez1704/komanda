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
  title: "Komanda — the taqueria POS your waiters will actually use",
  description:
    "Komanda turns any phone into a tableside POS for taquerías. Take orders in seconds, work offline, charge in one tap, and share PDF receipts on WhatsApp.",
  openGraph: {
    title: "Komanda — POS para taquerías",
    description:
      "La comanda en el bolsillo del mesero. Pedidos en segundos, sin internet, recibos por WhatsApp.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fbfaf9] text-[#474645]">
        {children}
      </body>
    </html>
  );
}
