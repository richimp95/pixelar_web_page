import type { NextConfig } from "next";

// Cuando se construye para GitHub Pages (project page) el sitio se sirve bajo
// /pixelar_web_page, así que activamos basePath/assetPrefix solo en ese caso.
// El flag GITHUB_PAGES lo pone el workflow de Actions; en dev local queda en raíz.
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "pixelar_web_page";
const basePath = isPages ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export", // genera HTML estático en ./out
  images: { unoptimized: true }, // requerido para export estático
  basePath,
  assetPrefix: isPages ? `/${repo}/` : "",
  trailingSlash: true, // URLs como /planes/ → mejor compatibilidad en Pages
  // Exponemos el basePath al cliente para construir rutas de assets en /public
  // (p.ej. el logo) de forma fiable en Pages, sin depender del prefijado de next/image.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
