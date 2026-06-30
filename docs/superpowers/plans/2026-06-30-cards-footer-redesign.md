# Rediseño tarjetas + footer + marca — Plan de implementación

> **For agentic workers:** Ejecutar task-por-task. Verificación visual: `npm run lint`, `npm run build`, screenshots (no hay unit tests para UI). Checkbox `- [ ]` para tracking.

**Goal:** Rediseñar las tarjetas de planes (estilo Neuro recoloreado a cobre, con toggle Mensual/Anual), corregir defectos (simetría, corte superior, tamaños), añadir auto-selección en el carrusel, poner el nombre de marca en cobre y adaptar el nuevo footer con datos reales.

**Architecture:** Componentes cliente con `framer-motion` (ya instalado). Sin libs nuevas. Data en `lib/content.ts`; íconos Lucide resueltos en cliente. Export estático intacto.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, framer-motion, lucide-react.

Branch: `feat/cards-footer-redesign` (ya creado, spec commiteado).

---

### Task 1: Corrección de teléfono (+502 4220-1061)

**Files:** Modify `lib/whatsapp.ts`, `lib/content.ts`

- [ ] `WHATSAPP_PHONE = "50242201061"` en `lib/whatsapp.ts` (comentario +502 4220-1061).
- [ ] `footer.contacto.telefono` y `whatsapp` → `"+502 4220-1061"` en `lib/content.ts`.
- [ ] `npm run build` OK. Commit.

### Task 2: Nombre de marca en cobre

**Files:** Modify `components/ui/Logo.tsx` callers (navbar/hero) y/o default.

- [ ] En `Logo.tsx`, cambiar `textClassName` default a `text-ink-strong` → mantener pero los callers pasan `text-accent`. Simplest: default `textClassName` = `"text-xl text-accent"`.
- [ ] Navbar: `textClassName="text-xl text-accent sm:text-2xl"`.
- [ ] Hero: `textClassName="text-3xl text-accent sm:text-4xl"`.
- [ ] Footer usará Logo con texto cobre (Task 7).
- [ ] Verificar contraste cobre `#c68662` sobre navy (AA large) — pasa (~4.5:1). Build. Commit.

### Task 3: PricingSwitch (toggle Mensual/Anual)

**Files:** Create `components/ui/PricingSwitch.tsx` (client).

- [ ] Componente con props `value: "mensual"|"anual"`, `onChange`. Dos botones en pill
  `rounded-full bg-surface/60 ring-1 ring-white/10 p-1`. Botón activo con
  `motion.span layoutId="planSwitch"` gradiente cobre (`from-accent to-accent-2`),
  `transition spring stiffness 500 damping 30`. Texto activo `text-ink-dark`, inactivo `text-ink/70`.
- [ ] `prefers-reduced-motion`: `useReducedMotion` → si reduce, sin layout animation (highlight instantáneo).
- [ ] Build. Commit.

### Task 4: PlanCard v2 (estilo Neuro, cobre)

**Files:** Rewrite `components/ui/PlanCard.tsx` (client).

- [ ] Quitar la capa trasera (`-z-10` behind). Una sola card.
- [ ] Shell: `relative flex h-full flex-col overflow-hidden rounded-2xl p-6 sm:p-7
  bg-gradient-to-br from-surface via-[#24364a] to-surface ring-1`. Estado:
  - seleccionada/popular → `ring-accent shadow-[0_-13px_180px_-30px_rgba(198,134,98,0.6)] z-20`
  - normal → `ring-white/10 z-10 [@media(hover:hover)]:hover:ring-accent/40`.
  - transición `[transform,box-shadow] 200ms ease-[cubic-bezier(0.23,1,0.32,1)]`,
    `[@media(hover:hover)]:hover:-translate-y-1.5 active:scale-[0.99] motion-reduce:!transform-none`.
- [ ] Header IZQUIERDA: nombre `text-2xl/3xl font-semibold`; audiencia `text-sm text-slate-300`;
  precio `text-4xl font-semibold text-white` + periodo `text-slate-300`.
- [ ] Nueva prop `isYearly: boolean`. Si `isYearly`: periodo → `"/ mes · facturado anual"`,
  y mostrar línea cobre con ícono `Gift`: "Landing Page gratis incluida".
- [ ] Botón CTA full-width (la prop `cta` ya viene): wrapper `mt-auto`, no dispara select (`stopPropagation`).
- [ ] Features: divisor `border-t border-white/10`, encabezado "Incluye:", filas
  detalladas (caja ícono cobre + nombre + valor a la derecha) — conservar diseño actual de filas.
- [ ] `selected`/`onSelect`/`highlighted`/`badge`/`badgeVariant` igual que antes.
- [ ] Build. Commit.

### Task 5: PlanesCarousel (toggle + auto-select + fixes)

**Files:** Modify `components/sections/PlanesCarousel.tsx` (client).

- [ ] Estado `isYearly` + render `<PricingSwitch>` arriba de los planes (centrado).
- [ ] Pasar `isYearly` a cada `PlanCard`.
- [ ] **Auto-select on scroll**: en el IntersectionObserver, además de `setActive(i)`,
  `setSelected(i)`.
- [ ] **Center recommended on mount**: `useEffect` que hace
  `slides.current[initial]?.scrollIntoView({inline:"center", block:"nearest"})`
  (sin smooth en mount), solo en móvil (`window.matchMedia("(max-width:1023px)")`).
- [ ] **Fix corte vertical**: scroller `py-8` (y `-my-8` exterior si hace falta para no
  empujar layout) + holgura para el glow. Slides `items-stretch`, card `h-full` → mismo tamaño.
- [ ] **Blur-reveal stagger**: envolver cada slide con `motion.div`
  (`initial {opacity:0,y:20,filter:"blur(10px)"}`, `whileInView` visible,
  `viewport once amount 0.3`, `transition delay i*0.12`), gated por `useReducedMotion`.
  (Reemplaza el Reveal externo para estas cards.)
- [ ] Build. Commit.

### Task 6: Planes.tsx (integración)

**Files:** Modify `components/sections/Planes.tsx`.

- [ ] El carrusel ya monta el toggle; mantener heading + promo banner + extraNote +
  Start Your Page. Start Your Page: `PlanCard` con `isYearly={false}` (no aplica).
- [ ] Build + screenshot Planes (desktop grid + móvil carrusel + toggle). Commit.

### Task 7: Footer nuevo (adaptado)

**Files:** Rewrite `components/sections/Footer.tsx`.

- [ ] Estructura del diseño provisto, recoloreada a cobre (azul/amber → accent),
  `font-geist` → `font-sans`/`font-display`. Contenedor `max-w-6xl rounded-3xl`
  con gradiente sutil cobre + ring.
- [ ] Banner CTA: h2 "Hablemos de tu proyecto" + ícono `ArrowUpRight` (cobre) +
  botón "Cotizar por WhatsApp" (gradiente cobre) → `waLink()` (external).
- [ ] Divisor gradiente.
- [ ] 4 columnas:
  1. `<Logo>` (texto cobre) + descripción `content.footer.desc`.
  2. Navegación: `content.nav.links` (Inicio/Servicios/Planes/Proceso/Contacto).
  3. Contacto: tel `+502 4220-1061` (`tel:`), WhatsApp (`waLink`), correo
     `wnrgy.gt@gmail.com` (`mailto:`), Guatemala.
  4. Redes: IG/FB/LinkedIn en círculos `border-accent/30 bg-accent/10 text-accent`
     (íconos: usar marcas SVG inline o Lucide `Instagram`,`Facebook`,`Linkedin`). Links `#`.
- [ ] Headers de columna `text-accent`.
- [ ] Bottom bar: `content.footer.legal` + "Política de privacidad"/"Términos" a `#`.
- [ ] Build + screenshot footer. Commit.

### Task 8: Pasada impeccable + verificación final

- [ ] Invocar skill `impeccable` (reglas generales): contraste (cobre/slate sobre navy,
  placeholders, foco), responsive (móvil/desktop), consistencia de radios/sombras.
- [ ] Ajustes inline según hallazgos.
- [ ] `npm run lint` limpio, `npm run build` OK, `npm run test` (7/7).
- [ ] Screenshots: hero (marca cobre), Planes desktop+móvil (toggle Mensual/Anual,
  selección, tamaños, sin corte), footer. Revisar.
- [ ] Commit.

### Task 9: Entrega
- [ ] Push branch + PR a `main`. (Merge/deploy según indique el usuario.)

## Self-review
- Cobertura spec: §1 cards→T4/T5, §2 toggle→T3/T5, §3 carrusel→T5, §4 marca cobre→T2,
  §5 footer→T7, §6 teléfono→T1, §7 impeccable→T8. Completo.
- Sin placeholders de implementación (código real en ejecución).
- Tipos consistentes: `isYearly` (T4↔T5), `selected/onSelect` (existentes).
