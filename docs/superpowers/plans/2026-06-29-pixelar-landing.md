# Pixelar Landing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir una landing page de una sola página para Pixelar (Next.js + Tailwind), orientada a conversión por WhatsApp, con look de agencia premium y contenido en español.

**Architecture:** Next.js App Router + TypeScript + Tailwind. Contenido centralizado en `lib/content.ts`; un componente por sección que mapea esos datos; componentes compartidos (`Container`, `Section`, `Button`, `WhatsAppButton`, `Card`); helper único de WhatsApp; motion con `motion` (Framer) respetando `prefers-reduced-motion`. Verificación visual con las skills de diseño (impeccable/taste/soft/emil) y screenshots.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, `motion`, `next/font`, Vitest + Testing Library, Playwright (screenshots/QA).

**Skill orchestration (enfoque A):** superpowers conduce el proceso; `impeccable` motor de build de UI; `soft-skill`/`taste-skill`/`emil-design-eng` para criterio; `review-animations` + gstack `design-review`/`landing-report` para QA; `graphify` indexa al final. Stitch MCP/`stitch-skill` opcional (diferido hasta validar la API key).

> **Comando antes de cada Task de diseño:** invocar `impeccable` (sub-comando `craft` para construir, `polish`/`audit` para revisar) y aplicar `soft-skill` + `taste-skill` para evitar defaults de slop.

---

## File Structure

```
pixelar_web_page/
  app/
    layout.tsx          # html/body, fuentes, metadata SEO global
    page.tsx            # ensambla todas las secciones en orden
    globals.css         # tokens OKLCH + base Tailwind + scroll suave
  components/
    ui/
      Container.tsx      # ancho máximo + padding horizontal
      Section.tsx        # <section id> + variante clara/oscura + spacing
      Button.tsx         # variantes primary/secondary + tamaños
      WhatsAppButton.tsx # Button preconfigurado con link de WhatsApp
      Card.tsx           # tarjeta con sombra suave
    sections/
      Navbar.tsx
      Hero.tsx
      Problema.tsx
      Solucion.tsx
      Servicios.tsx
      Planes.tsx
      Proceso.tsx
      Beneficios.tsx
      Renovacion.tsx
      FAQ.tsx
      CTAFinal.tsx
      Footer.tsx
    motion/
      Reveal.tsx        # wrapper de entrada ease-out + reduced-motion
  lib/
    content.ts          # TODO el texto en español + tipos
    whatsapp.ts         # helper de link de WhatsApp
  lib/__tests__/
    whatsapp.test.ts
    content.test.ts
  tailwind.config.ts
  vitest.config.ts
  vitest.setup.ts
```

**Responsabilidades:** `lib/` = datos puros + lógica sin UI (testeable aislada). `components/ui` = primitivos reutilizables. `components/sections` = una sección cada uno, sin estado compartido. `app/` = ensamblado + config global.

---

## Task 1: Scaffold del proyecto Next.js + Tailwind

**Files:**
- Create: proyecto Next.js completo (config, `app/`, `package.json`)

- [ ] **Step 1: Crear el proyecto Next.js con TypeScript + Tailwind**

Run (en el directorio del repo, que ya existe y tiene git):
```bash
cd /home/richi/projects/pixelar_web_page
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --no-turbopack --use-npm
```
Responder "yes" a sobreescribir si pregunta por archivos existentes (preserva `docs/` y `.git`). Si `create-next-app` se niega por carpeta no vacía, generar en `tmp-app/` y mover el contenido a la raíz preservando `docs/` y `.git`.

- [ ] **Step 2: Verificar que arranca**

Run:
```bash
npm run build
```
Expected: build exitoso (página por defecto de Next).

- [ ] **Step 3: Instalar dependencias adicionales**

Run:
```bash
npm install motion
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
```
Expected: instalación sin errores.

- [ ] **Step 4: Limpiar boilerplate**

Borrar el contenido demo de `app/page.tsx` (lo reescribimos en Task 16) y cualquier CSS demo en `app/globals.css` excepto las directivas de Tailwind.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js + Tailwind + deps"
```

---

## Task 2: Configurar Vitest

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Modify: `package.json` (script `test`)

- [ ] **Step 1: Crear `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

- [ ] **Step 2: Crear `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: Añadir script de test en `package.json`**

En `"scripts"` agregar:
```json
"test": "vitest run"
```

- [ ] **Step 4: Verificar que vitest corre (sin tests aún)**

Run: `npm test`
Expected: "No test files found" (sale 0 o mensaje informativo). Si falla por config, corregir antes de seguir.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "test: configurar vitest + testing-library"
```

---

## Task 3: Helper de WhatsApp (TDD)

**Files:**
- Create: `lib/whatsapp.ts`, `lib/__tests__/whatsapp.test.ts`

- [ ] **Step 1: Escribir el test que falla**

`lib/__tests__/whatsapp.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { WHATSAPP_PHONE, DEFAULT_WHATSAPP_MESSAGE, waLink } from "@/lib/whatsapp";

describe("waLink", () => {
  it("usa el número y el mensaje por defecto", () => {
    expect(waLink()).toBe(
      `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`
    );
  });

  it("codifica un mensaje personalizado", () => {
    const msg = "Hola, quiero el Plan Pro & más info";
    expect(waLink(msg)).toBe(
      `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`
    );
  });
});
```

- [ ] **Step 2: Correr el test para verificar que falla**

Run: `npm test -- whatsapp`
Expected: FAIL (módulo `@/lib/whatsapp` no existe).

- [ ] **Step 3: Implementar el helper**

`lib/whatsapp.ts`:
```ts
// Placeholder: reemplazar por el número real de Pixelar antes de publicar.
export const WHATSAPP_PHONE = "502XXXXXXXX";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola Pixelar, estoy interesado en una página web para mi negocio. Me gustaría recibir más información.";

/** Construye el link de WhatsApp con mensaje prellenado (URL-encoded). */
export function waLink(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
```

- [ ] **Step 4: Correr el test para verificar que pasa**

Run: `npm test -- whatsapp`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/whatsapp.ts lib/__tests__/whatsapp.test.ts
git commit -m "feat: helper de link de WhatsApp con mensaje prellenado"
```

---

## Task 4: Contenido centralizado + tipos (con test de integridad)

**Files:**
- Create: `lib/content.ts`, `lib/__tests__/content.test.ts`

- [ ] **Step 1: Escribir el test de integridad que falla**

`lib/__tests__/content.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { content } from "@/lib/content";

describe("content", () => {
  it("tiene 3 planes y exactamente uno destacado", () => {
    expect(content.planes.items).toHaveLength(3);
    expect(content.planes.items.filter((p) => p.highlighted)).toHaveLength(1);
  });
  it("tiene 8 preguntas frecuentes", () => {
    expect(content.faq.items).toHaveLength(8);
  });
  it("tiene 4 servicios, 6 problemas y 6 beneficios", () => {
    expect(content.servicios.items).toHaveLength(4);
    expect(content.problema.items).toHaveLength(6);
    expect(content.beneficios.items).toHaveLength(6);
  });
  it("tiene 5 pasos de proceso", () => {
    expect(content.proceso.steps).toHaveLength(5);
  });
});
```

- [ ] **Step 2: Correr el test para verificar que falla**

Run: `npm test -- content`
Expected: FAIL (módulo no existe).

- [ ] **Step 3: Implementar `lib/content.ts` con TODO el texto del brief**

```ts
export const content = {
  nav: {
    brand: "Pixelar",
    links: [
      { label: "Inicio", href: "#inicio" },
      { label: "Servicios", href: "#servicios" },
      { label: "Planes", href: "#planes" },
      { label: "Proceso", href: "#proceso" },
      { label: "Contacto", href: "#contacto" },
    ],
    cta: "Cotizar por WhatsApp",
  },
  hero: {
    title: "Páginas web modernas para negocios que quieren crecer",
    subtitle:
      "En Pixelar creamos, renovamos y administramos páginas web profesionales para empresas en Guatemala. Si tu negocio no tiene sitio web o el que tienes ya no representa tu calidad, nosotros lo transformamos.",
    primaryCta: "Quiero mi página web",
    secondaryCta: "Ver planes",
    microcopy: "Diseño web • Administración mensual • Dominio y hosting • SEO básico",
  },
  problema: {
    title: "¿Tu página web está ayudando a tu negocio o lo está frenando?",
    text:
      "Muchos negocios pierden oportunidades porque no tienen presencia en internet o porque su página actual se ve antigua, carga lento, no funciona bien en celular o no transmite confianza.",
    items: [
      "No tienes página web.",
      "Tu sitio se ve viejo o poco profesional.",
      "Tu página no se adapta bien a celulares.",
      "Tus clientes no encuentran información clara.",
      "No sabes cómo actualizar o mantener tu página.",
      "Tu empresa no aparece correctamente en Google.",
    ],
  },
  solucion: {
    title: "En Pixelar convertimos tu presencia digital en una ventaja",
    text:
      "Diseñamos páginas web modernas, claras y funcionales para que tu negocio se vea profesional, genere confianza y facilite que tus clientes te contacten.",
    beneficios: [
      { title: "Imagen profesional", text: "Tu negocio se verá más confiable y preparado para competir." },
      { title: "Página adaptada a celular", text: "Creamos sitios responsivos que funcionan en computadora, tablet y smartphone." },
      { title: "Administración sin complicaciones", text: "Nosotros podemos encargarnos del mantenimiento, dominio, hosting y mejoras mensuales." },
    ],
  },
  servicios: {
    title: "Servicios de Pixelar",
    items: [
      { title: "Creación de páginas web", text: "Diseñamos páginas web desde cero para negocios que necesitan iniciar su presencia digital con una imagen profesional." },
      { title: "Renovación de páginas web", text: "Modernizamos sitios web antiguos, desordenados o poco atractivos para que representen mejor la calidad de tu empresa." },
      { title: "Administración web", text: "Nos encargamos del mantenimiento básico, dominio, hosting y actualizaciones menores para que no tengas que preocuparte por la parte técnica." },
      { title: "SEO e indexación en Google", text: "Configuramos y optimizamos tu sitio para que Google pueda encontrarlo, indexarlo y mostrarlo correctamente en los resultados de búsqueda." },
    ],
  },
  planes: {
    title: "Planes diseñados para cada etapa de tu negocio",
    subtitle:
      "Elige el plan que mejor se adapte a lo que tu empresa necesita: desde una página web profesional hasta administración completa y optimización en Google.",
    items: [
      {
        name: "Básico",
        tag: "Ideal para iniciar",
        desc: "Para negocios que necesitan una página web profesional y moderna sin administración mensual.",
        includes: [
          "Creación de página web profesional.",
          "Diseño moderno y personalizado.",
          "Adaptación a celular, tablet y computadora.",
          "Secciones básicas: Inicio, Nosotros, Servicios y Contacto.",
          "Botón de WhatsApp.",
          "Formulario de contacto.",
          "Integración de redes sociales.",
          "Diseño enfocado en transmitir confianza.",
          "Entrega lista para publicar.",
        ],
        notIncludes: [
          "Administración mensual.",
          "Dominio y hosting incluidos.",
          "Mantenimiento continuo.",
          "SEO mensual.",
        ],
        cta: "Cotizar Plan Básico",
        highlighted: false,
      },
      {
        name: "Pro",
        tag: "Más recomendado",
        desc: "Para empresas que quieren una página web profesional y prefieren que Pixelar se encargue también de la administración técnica.",
        includes: [
          "Todo lo del Plan Básico.",
          "Administración mensual de la página web.",
          "Mantenimiento básico.",
          "Dominio.",
          "Hosting.",
          "Actualizaciones menores de contenido.",
          "Revisión mensual del funcionamiento del sitio.",
          "Soporte básico.",
          "Protección básica contra errores comunes.",
          "Acompañamiento mensual.",
        ],
        cta: "Cotizar Plan Pro",
        highlighted: true,
      },
      {
        name: "Premium",
        tag: "Mayor presencia digital",
        desc: "Para negocios que quieren una página web administrada y además mejorar su presencia en Google con SEO básico e indexación.",
        includes: [
          "Todo lo del Plan Pro.",
          "Gestión de indexación en Google.",
          "Configuración de Google Search Console.",
          "SEO básico.",
          "Optimización de títulos y descripciones.",
          "Estructura optimizada para buscadores.",
          "Revisión básica de palabras clave.",
          "Mejoras orientadas a visibilidad.",
          "Reporte mensual básico.",
          "Recomendaciones para mejorar el posicionamiento.",
        ],
        cta: "Cotizar Plan Premium",
        highlighted: false,
      },
    ],
    helpText: "¿No sabes qué plan elegir? Escríbenos y te recomendamos la mejor opción según tu negocio.",
    helpCta: "Recibir asesoría",
  },
  proceso: {
    title: "Así trabajamos contigo",
    steps: [
      { n: 1, title: "Analizamos tu negocio", text: "Conocemos tu empresa, tus servicios, tus clientes y lo que quieres lograr con tu página web." },
      { n: 2, title: "Diseñamos tu propuesta", text: "Creamos una estructura visual y funcional pensada para que tu negocio se vea profesional y tus clientes encuentren lo que necesitan." },
      { n: 3, title: "Desarrollamos tu página", text: "Construimos el sitio web adaptado a celular, rápido, moderno y listo para representar tu marca." },
      { n: 4, title: "Publicamos y optimizamos", text: "Dejamos tu página lista para compartir con clientes y, según el plan, configuramos dominio, hosting e indexación en Google." },
      { n: 5, title: "Administramos y damos soporte", text: "Si eliges un plan mensual, nos encargamos del mantenimiento básico y actualizaciones necesarias." },
    ],
  },
  beneficios: {
    title: "¿Por qué elegir Pixelar?",
    items: [
      { title: "Diseño moderno", text: "Tu página se verá actual, limpia y profesional." },
      { title: "Enfoque en negocios", text: "No solo diseñamos bonito; pensamos en cómo ayudarte a generar confianza y contactos." },
      { title: "Adaptado a celulares", text: "Tu sitio funcionará correctamente en dispositivos móviles." },
      { title: "Planes flexibles", text: "Puedes empezar con una página básica o elegir administración completa." },
      { title: "Menos preocupaciones técnicas", text: "Nos encargamos de dominio, hosting y mantenimiento en los planes mensuales." },
      { title: "Presencia en Google", text: "Con el plan Premium ayudamos a que Google reconozca e indexe tu sitio correctamente." },
    ],
  },
  renovacion: {
    title: "¿Ya tienes página web, pero se ve desactualizada?",
    text:
      "Una página vieja, lenta o poco clara puede hacer que tus clientes duden de tu negocio. En Pixelar renovamos tu sitio para que transmita profesionalismo, confianza y calidad.",
    antes: [
      "Diseño viejo.",
      "Difícil de navegar.",
      "No funciona bien en celular.",
      "Información desordenada.",
      "Poca confianza.",
    ],
    despues: [
      "Diseño moderno.",
      "Navegación clara.",
      "Adaptada a celular.",
      "Información organizada.",
      "Imagen profesional.",
    ],
    cta: "Quiero renovar mi página",
  },
  faq: {
    title: "Preguntas frecuentes",
    items: [
      { q: "¿Pixelar solo crea páginas web desde cero?", a: "No. También renovamos páginas web existentes para mejorar su diseño, estructura, velocidad, imagen y funcionalidad." },
      { q: "¿Qué plan me conviene si solo quiero una página web?", a: "El Plan Básico es ideal si solo necesitas la creación de tu página web y no requieres administración mensual." },
      { q: "¿Qué incluye la administración web?", a: "Incluye mantenimiento básico, revisión del funcionamiento del sitio, actualizaciones menores de contenido, dominio y hosting en el Plan Pro y Premium." },
      { q: "¿El dominio y hosting están incluidos?", a: "Sí, están incluidos en los planes Pro y Premium. En el Plan Básico pueden cotizarse por separado si el cliente lo necesita." },
      { q: "¿Qué es la indexación en Google?", a: "Es el proceso de configurar y enviar tu sitio a Google para que pueda encontrarlo, analizarlo y mostrarlo en los resultados de búsqueda." },
      { q: "¿El SEO garantiza aparecer primero en Google?", a: "No se puede garantizar la primera posición en Google, pero sí podemos optimizar la estructura básica de tu sitio para mejorar su visibilidad y facilitar que Google lo indexe correctamente." },
      { q: "¿Puedo pedir cambios después de publicada la página?", a: "Sí. En los planes Pro y Premium se incluyen actualizaciones menores como parte de la administración mensual. Cambios grandes pueden cotizarse por separado." },
      { q: "¿Trabajan solo con empresas de Guatemala?", a: "Pixelar está basado en Guatemala, pero puede trabajar con negocios de diferentes ubicaciones si el proyecto se puede manejar de forma digital." },
    ],
  },
  ctaFinal: {
    title: "Haz que tu negocio se vea tan profesional como realmente es",
    text:
      "Tu página web puede ser la primera impresión que un cliente tenga de tu empresa. En Pixelar te ayudamos a crear una presencia digital moderna, clara y confiable.",
    primaryCta: "Cotizar por WhatsApp",
    secondaryCta: "Ver planes",
    microcopy: "Cuéntanos sobre tu negocio y te ayudamos a elegir el plan ideal.",
  },
  footer: {
    brand: "Pixelar",
    desc: "Creamos, renovamos y administramos páginas web para negocios que quieren crecer en internet.",
    links: [
      { label: "Inicio", href: "#inicio" },
      { label: "Servicios", href: "#servicios" },
      { label: "Planes", href: "#planes" },
      { label: "Contacto", href: "#contacto" },
    ],
    contacto: {
      whatsapp: "+502 XXXX-XXXX",
      correo: "contacto@pixelar.gt",
      ubicacion: "Guatemala",
    },
    redes: ["Instagram", "Facebook", "LinkedIn"],
    legal: "© 2026 Pixelar. Todos los derechos reservados.",
  },
} as const;

export type Content = typeof content;
```

- [ ] **Step 4: Correr el test para verificar que pasa**

Run: `npm test -- content`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/content.ts lib/__tests__/content.test.ts
git commit -m "feat: contenido centralizado en español + test de integridad"
```

---

## Task 5: Tokens de diseño + fuentes + scroll suave

> **Antes de empezar:** ejecutar `node ~/.claude/skills/impeccable/scripts/palette.mjs` para obtener un color semilla calibrado anclado al cyan/azul de marca, y componer la paleta en OKLCH alrededor de él. Los valores hex del brief (`#0F172A`, `#38BDF8`, `#6366F1`, `#8B5CF6`) son el punto de partida, no el resultado final.

**Files:**
- Modify: `app/globals.css`, `tailwind.config.ts`, `app/layout.tsx`

- [ ] **Step 1: Definir tokens en `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Paleta base (refinar con palette.mjs / OKLCH). */
  --bg: #0f172a;          /* navy base */
  --surface: #111c33;     /* superficie oscura */
  --surface-light: #f8fafc;
  --ink: #e2e8f0;         /* texto sobre oscuro */
  --ink-strong: #ffffff;
  --ink-dark: #0f172a;    /* texto sobre claro */
  --muted: #94a3b8;
  --accent: #38bdf8;      /* cyan */
  --accent-2: #6366f1;    /* índigo */
  --accent-3: #8b5cf6;    /* violeta */
}

html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}

body {
  background: var(--bg);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
}

/* Compensar header sticky al saltar a anclas */
section[id] { scroll-margin-top: 5rem; }
```

- [ ] **Step 2: Mapear tokens en `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-light": "var(--surface-light)",
        ink: "var(--ink)",
        "ink-strong": "var(--ink-strong)",
        "ink-dark": "var(--ink-dark)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        "accent-3": "var(--accent-3)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "1200px" },
    },
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 3: Cargar fuentes en `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const display = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap" });
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
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: build exitoso.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css tailwind.config.ts app/layout.tsx
git commit -m "feat: tokens de diseño, fuentes y SEO global"
```

---

## Task 6: Componentes UI compartidos

**Files:**
- Create: `components/ui/Container.tsx`, `Section.tsx`, `Button.tsx`, `WhatsAppButton.tsx`, `Card.tsx`

- [ ] **Step 1: `Container.tsx`**

```tsx
import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-content px-5 sm:px-8", className)}>{children}</div>;
}
```

- [ ] **Step 2: Crear util `lib/cn.ts`**

```ts
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
```

- [ ] **Step 3: `Section.tsx`** (variante clara/oscura + spacing generoso)

```tsx
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Props = {
  id?: string;
  tone?: "dark" | "light";
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, tone = "dark", className, children }: Props) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-28",
        tone === "light" ? "bg-surface-light text-ink-dark" : "bg-bg text-ink",
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
```

- [ ] **Step 4: `Button.tsx`** (con `:active` scale por criterio de emil-design-eng)

```tsx
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";
type Props = {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold " +
  "transition-[transform,background-color,box-shadow] duration-200 ease-out " +
  "active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-ink-dark hover:bg-accent/90 shadow-lg shadow-accent/20",
  secondary: "border border-white/20 text-ink-strong hover:bg-white/5",
};

export function Button({ href, variant = "primary", external, className, children }: Props) {
  const cls = cn(base, variants[variant], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return <Link href={href} className={cls}>{children}</Link>;
}
```

- [ ] **Step 5: `WhatsAppButton.tsx`**

```tsx
import { Button } from "./Button";
import { waLink } from "@/lib/whatsapp";

type Props = {
  message?: string;
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
};

export function WhatsAppButton({ message, variant = "primary", className, children }: Props) {
  return (
    <Button href={waLink(message)} external variant={variant} className={className}>
      {children}
    </Button>
  );
}
```

- [ ] **Step 6: `Card.tsx`** (sombra suave, sin bordes duros)

```tsx
import { cn } from "@/lib/cn";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white/[0.03] p-6 shadow-lg shadow-black/20 ring-1 ring-white/5",
        "transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 7: Smoke test del botón de WhatsApp**

`components/ui/__tests__/WhatsAppButton.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

describe("WhatsAppButton", () => {
  it("renderiza un link externo a wa.me", () => {
    render(<WhatsAppButton>Cotizar</WhatsAppButton>);
    const link = screen.getByRole("link", { name: "Cotizar" });
    expect(link).toHaveAttribute("href", expect.stringContaining("https://wa.me/"));
    expect(link).toHaveAttribute("target", "_blank");
  });
});
```

- [ ] **Step 8: Correr tests**

Run: `npm test`
Expected: PASS (todos).

- [ ] **Step 9: Commit**

```bash
git add components/ui lib/cn.ts
git commit -m "feat: componentes UI compartidos (Container, Section, Button, WhatsApp, Card)"
```

---

## Task 7: Wrapper de animación (Reveal)

> Criterio: `emil-design-eng` + `impeccable` motion rules — ease-out exponencial, no bounce, fallback `prefers-reduced-motion` (crossfade/instantáneo). El contenido es visible por defecto; la animación lo realza, no lo oculta.

**Files:**
- Create: `components/motion/Reveal.tsx`

- [ ] **Step 1: Implementar `Reveal.tsx`**

```tsx
"use client";
import { motion, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: build exitoso.

- [ ] **Step 3: Commit**

```bash
git add components/motion/Reveal.tsx
git commit -m "feat: wrapper Reveal con motion + prefers-reduced-motion"
```

---

## Task 8: Navbar (sticky)

**Files:**
- Create: `components/sections/Navbar.tsx`

- [ ] **Step 1: Implementar `Navbar.tsx`**

```tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { content } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled ? "bg-bg/80 backdrop-blur border-b border-white/10" : "bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="#inicio" className="text-xl font-display font-bold text-ink-strong">
          {content.nav.brand}
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {content.nav.links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-ink hover:text-accent transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <WhatsAppButton className="px-4 py-2 text-sm">{content.nav.cta}</WhatsAppButton>
      </Container>
    </header>
  );
}
```

> Nota: el menú móvil (hamburguesa) se pule en Task 17. El CTA siempre visible cumple la conversión en móvil.

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: exitoso.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Navbar.tsx
git commit -m "feat: Navbar sticky con efecto al hacer scroll"
```

---

## Task 9: Hero

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Implementar `Hero.tsx`** (único `h1`, mockup de pantalla con motivo píxel/grid, sin mesh morado centrado)

```tsx
import { content } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/motion/Reveal";

export function Hero() {
  const h = content.hero;
  return (
    <section id="inicio" className="relative overflow-hidden bg-bg pt-24 pb-20 sm:pt-28 sm:pb-28">
      {/* Motivo grid sutil, no mesh-gradient centrado */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]
        [background-image:linear-gradient(var(--accent)_1px,transparent_1px),linear-gradient(90deg,var(--accent)_1px,transparent_1px)]
        [background-size:40px_40px]"
      />
      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <h1 className="font-display text-4xl font-bold leading-tight text-ink-strong text-balance sm:text-5xl lg:text-6xl">
              {h.title}
            </h1>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-[60ch] text-lg text-ink/90">{h.subtitle}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-4">
              <WhatsAppButton>{h.primaryCta}</WhatsAppButton>
              <Button href="#planes" variant="secondary">{h.secondaryCta}</Button>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 text-sm text-muted">{h.microcopy}</p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <HeroMockup />
        </Reveal>
      </Container>
    </section>
  );
}

/* Mockup simulado de una página moderna en una "pantalla". */
function HeroMockup() {
  return (
    <div className="rounded-2xl border border-white/10 bg-surface p-3 shadow-2xl shadow-accent/10">
      <div className="mb-3 flex gap-1.5">
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
        <span className="h-3 w-3 rounded-full bg-green-400/70" />
      </div>
      <div className="space-y-3 rounded-xl bg-bg p-4">
        <div className="h-24 rounded-lg bg-gradient-to-r from-accent/30 to-accent-2/30" />
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg bg-white/5 p-3">
              <div className="mb-2 h-6 w-10 rounded bg-accent/40" />
              <div className="h-2 w-full rounded bg-white/10" />
              <div className="mt-1 h-2 w-2/3 rounded bg-white/10" />
            </div>
          ))}
        </div>
        <div className="h-2 w-1/2 rounded bg-white/10" />
        <div className="h-2 w-3/4 rounded bg-white/10" />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: exitoso.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: sección Hero con mockup y motivo grid"
```

---

## Task 10: Problema

**Files:**
- Create: `components/sections/Problema.tsx`

- [ ] **Step 1: Implementar `Problema.tsx`**

```tsx
import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";

export function Problema() {
  const p = content.problema;
  return (
    <Section tone="dark">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-strong text-balance sm:text-4xl">{p.title}</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-4 max-w-[65ch] text-lg text-ink/80">{p.text}</p>
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {p.items.map((item, i) => (
          <Reveal key={item} delay={i * 0.04}>
            <Card className="h-full">
              <p className="text-ink">{item}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Build** → Run: `npm run build` → Expected: exitoso.
- [ ] **Step 3: Commit**

```bash
git add components/sections/Problema.tsx
git commit -m "feat: sección Problema"
```

---

## Task 11: Solución

**Files:**
- Create: `components/sections/Solucion.tsx`

- [ ] **Step 1: Implementar `Solucion.tsx`**

```tsx
import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";

export function Solucion() {
  const s = content.solucion;
  return (
    <Section tone="light">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-dark text-balance sm:text-4xl">{s.title}</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-4 max-w-[65ch] text-lg text-ink-dark/70">{s.text}</p>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {s.beneficios.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.05}>
            <div className="h-full rounded-2xl bg-white p-6 shadow-lg shadow-black/5 ring-1 ring-black/5 transition-transform duration-200 ease-out hover:-translate-y-1">
              <h3 className="font-display text-xl font-semibold text-ink-dark">{b.title}</h3>
              <p className="mt-2 text-ink-dark/70">{b.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Build** → `npm run build` → exitoso.
- [ ] **Step 3: Commit**

```bash
git add components/sections/Solucion.tsx
git commit -m "feat: sección Solución (tono claro)"
```

---

## Task 12: Servicios

**Files:**
- Create: `components/sections/Servicios.tsx`

- [ ] **Step 1: Implementar `Servicios.tsx`**

```tsx
import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";

export function Servicios() {
  const s = content.servicios;
  return (
    <Section id="servicios" tone="dark">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-strong text-balance sm:text-4xl">{s.title}</h2>
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {s.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05}>
            <Card className="h-full">
              <h3 className="font-display text-xl font-semibold text-ink-strong">{item.title}</h3>
              <p className="mt-2 text-ink/80">{item.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Build** → `npm run build` → exitoso.
- [ ] **Step 3: Commit**

```bash
git add components/sections/Servicios.tsx
git commit -m "feat: sección Servicios"
```

---

## Task 13: Planes (Pro destacado)

**Files:**
- Create: `components/sections/Planes.tsx`

- [ ] **Step 1: Implementar `Planes.tsx`**

```tsx
import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export function Planes() {
  const p = content.planes;
  return (
    <Section id="planes" tone="dark">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-strong text-balance sm:text-4xl">{p.title}</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-4 max-w-[65ch] text-lg text-ink/80">{p.subtitle}</p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-start">
        {p.items.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.06}>
            <div
              className={cn(
                "relative flex h-full flex-col rounded-2xl p-7 ring-1 transition-transform duration-200 ease-out hover:-translate-y-1",
                plan.highlighted
                  ? "bg-surface ring-accent shadow-2xl shadow-accent/20 lg:scale-[1.03]"
                  : "bg-white/[0.03] ring-white/10"
              )}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ink-dark">
                  {plan.tag}
                </span>
              )}
              {!plan.highlighted && (
                <span className="text-xs font-semibold uppercase tracking-wide text-accent">{plan.tag}</span>
              )}
              <h3 className="mt-2 font-display text-2xl font-bold text-ink-strong">{plan.name}</h3>
              <p className="mt-2 text-3xl font-bold text-accent">Cotizar</p>
              <p className="mt-3 text-sm text-ink/80">{plan.desc}</p>

              <ul className="mt-6 space-y-2 text-sm text-ink/90">
                {plan.includes.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden className="text-accent">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
                {"notIncludes" in plan &&
                  plan.notIncludes?.map((f) => (
                    <li key={f} className="flex gap-2 text-muted line-through">
                      <span aria-hidden>✕</span>
                      <span>{f}</span>
                    </li>
                  ))}
              </ul>

              <div className="mt-7 pt-2">
                <WhatsAppButton
                  variant={plan.highlighted ? "primary" : "secondary"}
                  message={`Hola Pixelar, me interesa el Plan ${plan.name}. Me gustaría recibir más información.`}
                  className="w-full"
                >
                  {plan.cta}
                </WhatsAppButton>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-[55ch] text-ink/80">{p.helpText}</p>
          <WhatsAppButton message="Hola Pixelar, no estoy seguro de qué plan elegir. ¿Me pueden asesorar?">
            {p.helpCta}
          </WhatsAppButton>
        </div>
      </Reveal>
    </Section>
  );
}
```

- [ ] **Step 2: Build** → `npm run build` → exitoso.
- [ ] **Step 3: Commit**

```bash
git add components/sections/Planes.tsx
git commit -m "feat: sección Planes con Pro destacado y CTAs por plan"
```

---

## Task 14: Proceso (pasos numerados)

**Files:**
- Create: `components/sections/Proceso.tsx`

- [ ] **Step 1: Implementar `Proceso.tsx`**

```tsx
import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export function Proceso() {
  const p = content.proceso;
  return (
    <Section id="proceso" tone="light">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-dark text-balance sm:text-4xl">{p.title}</h2>
      </Reveal>
      <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {p.steps.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.05}>
            <li className="h-full rounded-2xl bg-white p-6 shadow-lg shadow-black/5 ring-1 ring-black/5">
              <span className="font-display text-3xl font-bold text-accent-2">
                {String(step.n).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink-dark">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-dark/70">{step.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
```

- [ ] **Step 2: Build** → `npm run build` → exitoso.
- [ ] **Step 3: Commit**

```bash
git add components/sections/Proceso.tsx
git commit -m "feat: sección Proceso con pasos numerados"
```

---

## Task 15: Beneficios

**Files:**
- Create: `components/sections/Beneficios.tsx`

- [ ] **Step 1: Implementar `Beneficios.tsx`**

```tsx
import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";

export function Beneficios() {
  const b = content.beneficios;
  return (
    <Section tone="dark">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-strong text-balance sm:text-4xl">{b.title}</h2>
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {b.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.04}>
            <Card className="h-full">
              <h3 className="font-display text-lg font-semibold text-ink-strong">{item.title}</h3>
              <p className="mt-2 text-ink/80">{item.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Build** → `npm run build` → exitoso.
- [ ] **Step 3: Commit**

```bash
git add components/sections/Beneficios.tsx
git commit -m "feat: sección Beneficios"
```

---

## Task 16: Renovación (antes/después)

**Files:**
- Create: `components/sections/Renovacion.tsx`

- [ ] **Step 1: Implementar `Renovacion.tsx`**

```tsx
import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/motion/Reveal";

export function Renovacion() {
  const r = content.renovacion;
  return (
    <Section tone="dark">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-strong text-balance sm:text-4xl">{r.title}</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-4 max-w-[65ch] text-lg text-ink/80">{r.text}</p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl bg-white/[0.03] p-6 ring-1 ring-red-400/20">
            <h3 className="font-display text-lg font-semibold text-red-300">Antes</h3>
            <ul className="mt-4 space-y-2 text-ink/80">
              {r.antes.map((x) => (
                <li key={x} className="flex gap-2"><span aria-hidden className="text-red-300">✕</span>{x}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="h-full rounded-2xl bg-white/[0.03] p-6 ring-1 ring-accent/30">
            <h3 className="font-display text-lg font-semibold text-accent">Después con Pixelar</h3>
            <ul className="mt-4 space-y-2 text-ink/90">
              {r.despues.map((x) => (
                <li key={x} className="flex gap-2"><span aria-hidden className="text-accent">✓</span>{x}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-10">
          <WhatsAppButton message="Hola Pixelar, quiero renovar mi página web actual. ¿Me pueden ayudar?">
            {r.cta}
          </WhatsAppButton>
        </div>
      </Reveal>
    </Section>
  );
}
```

- [ ] **Step 2: Build** → `npm run build` → exitoso.
- [ ] **Step 3: Commit**

```bash
git add components/sections/Renovacion.tsx
git commit -m "feat: sección Renovación antes/después"
```

---

## Task 17: FAQ (acordeón accesible)

**Files:**
- Create: `components/sections/FAQ.tsx`

- [ ] **Step 1: Implementar `FAQ.tsx`** (usa `<details>/<summary>` → accesible por teclado sin JS)

```tsx
import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export function FAQ() {
  const f = content.faq;
  return (
    <Section tone="light">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-dark text-balance sm:text-4xl">{f.title}</h2>
      </Reveal>
      <div className="mx-auto mt-10 max-w-3xl divide-y divide-black/10">
        {f.items.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.03}>
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink-dark">
                {item.q}
                <span aria-hidden className="text-accent-2 transition-transform duration-200 group-open:rotate-45">＋</span>
              </summary>
              <p className="mt-3 text-ink-dark/70">{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Build** → `npm run build` → exitoso.
- [ ] **Step 3: Commit**

```bash
git add components/sections/FAQ.tsx
git commit -m "feat: sección FAQ con acordeón accesible"
```

---

## Task 18: CTA final

**Files:**
- Create: `components/sections/CTAFinal.tsx`

- [ ] **Step 1: Implementar `CTAFinal.tsx`** (lleva el `id="contacto"` para el ancla del menú)

```tsx
import { content } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/motion/Reveal";

export function CTAFinal() {
  const c = content.ctaFinal;
  return (
    <section id="contacto" className="relative overflow-hidden bg-gradient-to-br from-accent-2/20 via-bg to-bg py-24">
      <Container className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-[20ch] font-display text-3xl font-bold text-ink-strong text-balance sm:text-4xl">
            {c.title}
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mx-auto mt-5 max-w-[60ch] text-lg text-ink/85">{c.text}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <WhatsAppButton>{c.primaryCta}</WhatsAppButton>
            <Button href="#planes" variant="secondary">{c.secondaryCta}</Button>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-5 text-sm text-muted">{c.microcopy}</p>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Build** → `npm run build` → exitoso.
- [ ] **Step 3: Commit**

```bash
git add components/sections/CTAFinal.tsx
git commit -m "feat: sección CTA final"
```

---

## Task 19: Footer

**Files:**
- Create: `components/sections/Footer.tsx`

- [ ] **Step 1: Implementar `Footer.tsx`**

```tsx
import { content } from "@/lib/content";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const f = content.footer;
  return (
    <footer className="border-t border-white/10 bg-bg py-14 text-ink">
      <Container className="grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-xl font-bold text-ink-strong">{f.brand}</p>
          <p className="mt-3 max-w-[45ch] text-sm text-ink/70">{f.desc}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink-strong">Enlaces</p>
          <ul className="mt-3 space-y-2 text-sm">
            {f.links.map((l) => (
              <li key={l.href}><a href={l.href} className="text-ink/70 hover:text-accent transition-colors">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink-strong">Contacto</p>
          <ul className="mt-3 space-y-2 text-sm text-ink/70">
            <li>WhatsApp: {f.contacto.whatsapp}</li>
            <li>Correo: {f.contacto.correo}</li>
            <li>Ubicación: {f.contacto.ubicacion}</li>
          </ul>
          <ul className="mt-4 flex gap-4 text-sm">
            {f.redes.map((r) => (
              <li key={r}><a href="#" className="text-ink/70 hover:text-accent transition-colors">{r}</a></li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="mt-10 border-t border-white/10 pt-6">
        <p className="text-xs text-muted">{f.legal}</p>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 2: Build** → `npm run build` → exitoso.
- [ ] **Step 3: Commit**

```bash
git add components/sections/Footer.tsx
git commit -m "feat: footer con contacto, enlaces y redes (placeholders)"
```

---

## Task 20: Ensamblar la página

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Escribir `app/page.tsx`** (orden exacto del brief)

```tsx
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problema } from "@/components/sections/Problema";
import { Solucion } from "@/components/sections/Solucion";
import { Servicios } from "@/components/sections/Servicios";
import { Planes } from "@/components/sections/Planes";
import { Proceso } from "@/components/sections/Proceso";
import { Beneficios } from "@/components/sections/Beneficios";
import { Renovacion } from "@/components/sections/Renovacion";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/CTAFinal";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problema />
        <Solucion />
        <Servicios />
        <Planes />
        <Proceso />
        <Beneficios />
        <Renovacion />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Build + arrancar dev**

Run: `npm run build && npm run dev`
Expected: build exitoso; servidor en `http://localhost:3000`.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: ensamblar landing completa en orden del brief"
```

---

## Task 21: QA visual y de diseño (skills)

> Usar `impeccable audit` + `impeccable polish`, `taste-skill`/`soft-skill` para detectar slop, `review-animations` para la motion, y gstack `design-review` / `landing-report`. Capturar screenshots desktop + móvil con Playwright o la skill `run`.

**Files:**
- Modify: cualquier sección según hallazgos
- Create: `playwright.config.ts` + script de screenshots (opcional pero recomendado)

- [ ] **Step 1: Capturar screenshots desktop (1440px) y móvil (390px)**

Con dev corriendo, usar Playwright (o la skill `run`/browser) para screenshot de la página completa en ambos viewports y guardarlos en `docs/superpowers/qa/`.

- [ ] **Step 2: Ejecutar revisión con skills de diseño**

Invocar `impeccable` (sub-comando `audit`) y `review-animations` sobre los componentes; aplicar `taste-skill`/`soft-skill` para verificar que no haya defaults de slop (mesh morado, 3 cards idénticas genéricas, Inter+slate por defecto, glassmorphism en todo). Anotar hallazgos.

- [ ] **Step 3: Verificar contraste AA y responsive**

Revisar que el texto de cuerpo cumpla ≥ 4.5:1 (especialmente gris sobre claro), que no haya overflow horizontal en 390px, y que el menú/CTAs funcionen en móvil. Corregir clases Tailwind donde falle.

- [ ] **Step 4: Verificar navegación por anclas y reduced-motion**

Probar que cada enlace del navbar salta a su sección (con `scroll-margin-top`), y que con `prefers-reduced-motion` las animaciones se desactivan.

- [ ] **Step 5: Aplicar correcciones y commit**

```bash
git add -A
git commit -m "polish: QA visual, contraste AA, responsive y motion"
```

---

## Task 22: Verificación final + memoria (graphify)

- [ ] **Step 1: Correr toda la verificación**

Run:
```bash
npm test && npm run build && npx tsc --noEmit
```
Expected: tests PASS, build OK, sin errores de tipos.

- [ ] **Step 2: Lighthouse (opcional, recomendado)**

Con dev/preview corriendo, correr Lighthouse (CLI o DevTools) en móvil. Objetivo Performance ≥ 90, Accessibility ≥ 95. Anotar resultados en `docs/superpowers/qa/lighthouse.md`.

- [ ] **Step 3: Indexar el código con graphify**

Invocar la skill `graphify` sobre el repo para construir el grafo de conocimiento del código (consultas futuras sobre arquitectura/relaciones).

- [ ] **Step 4: Code review (superpowers)**

Invocar `superpowers:requesting-code-review` sobre el diff completo de la rama antes de cerrar.

- [ ] **Step 5: Commit final**

```bash
git add -A
git commit -m "chore: verificación final + índice graphify"
```

---

## Notas de seguimiento (para el cliente / antes de publicar)

- Reemplazar `WHATSAPP_PHONE` (`502XXXXXXXX`) por el número real.
- Reemplazar correo (`contacto@pixelar.gt`), WhatsApp visible y URLs de redes.
- **Rotar la API key de Stitch** (quedó expuesta en el chat) y validar el MCP antes de usarlo para mockups.
- Configurar deploy en Vercel y dominio.

## Self-Review (cobertura del spec)

- Secciones 1–12 del brief → Tasks 8–20 (una por sección + ensamblado). ✓
- WhatsApp con mensaje prellenado → Task 3 + usado en todas las secciones de CTA. ✓
- SEO (title/description/keywords/OG, un `h1`, `h2`/`h3`) → Task 5 + jerarquía aplicada en cada sección. ✓
- Responsive + reduced-motion + contraste AA → Tasks 5, 7, 21. ✓
- Sistema visual anti-slop (paleta OKLCH, sin defaults) → Task 5 (palette.mjs) + Task 21 (audit). ✓
- Orquestación de skills (enfoque A) → notas por task + Tasks 21–22. ✓
- Contenido en español centralizado → Task 4. ✓
