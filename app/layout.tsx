import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const display = Manrope({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "Pixelar | Páginas web modernas para negocios en Guatemala",
  description:
    "Pixelar crea, renueva y administra páginas web profesionales para negocios en Guatemala. Planes Básico, Pro y Premium con diseño web, hosting, dominio y SEO básico.",
  keywords: [
    "páginas web Guatemala", "diseño web Guatemala", "crear página web",
    "renovar página web", "administración web", "SEO Guatemala", "Pixelar",
  ],
  openGraph: {
    title: "Pixelar | Páginas web modernas para negocios en Guatemala",
    description:
      "Creamos, renovamos y administramos páginas web profesionales para negocios en Guatemala.",
    locale: "es_GT",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
