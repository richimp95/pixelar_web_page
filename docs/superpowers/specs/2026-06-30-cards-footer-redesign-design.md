# Spec — Rediseño de tarjetas de planes + footer + ajustes de marca

Fecha: 2026-06-30 · Proyecto: WNRGY landing (Next.js 16 + Tailwind v4 + framer-motion)

## Objetivo
Rediseñar las tarjetas de planes adoptando el look/efectos del diseño "Neuro"
(recoloreado a la marca navy + cobre), corregir defectos visuales reportados,
adaptar un nuevo footer a la información real de WNRGY, y poner el nombre de la
marca en el color del logo (cobre).

## Restricciones
- Sin dependencias npm nuevas. NO usar `@number-flow/react`, `@/components/ui/sparkles`,
  `timeline-animation`, `vertical-cut-reveal`, ni shadcn `Card`. Se reimplementan los
  efectos con `framer-motion` (ya instalado) + Tailwind + `cn`.
- Mantener export estático (GitHub Pages) y `prefers-reduced-motion`.
- Conservar contenido/data en `lib/content.ts`. Íconos Lucide resueltos en cliente.

## Cambios

### 1. Tarjetas de planes (`PlanCard` v2) — estilo Neuro adaptado
- **Una sola card, sin capa de profundidad trasera.** Esto corrige: (a) el
  rectángulo interior asimétrico respecto al exterior, (b) el corte superior.
- Shell: fondo gradiente navy (`from-surface via-[navy-claro] to-surface`),
  `ring-1 ring-white/10`, `rounded-2xl`. Estado popular/seleccionado: `ring-accent`
  + glow cobre (`shadow-[0_-13px_300px_0_rgba(198,134,98,0.22)]`), z elevado.
- Header alineado a la izquierda (como Neuro): nombre (text-3xl), precio grande
  (text-4xl) + periodo, descripción/audiencia.
- Botón CTA full-width con gradiente: cobre (`from-accent-2 to-accent`) si
  seleccionada/popular; neutro (`from-surface to-[navy]`) si no. `rounded-xl`.
- Features **detalladas** (decisión del usuario): divisor superior + encabezado
  "Incluye:" + filas con caja de ícono cobre + nombre + valor a la derecha
  (ej. "Mensual", "1 backup"). Se conserva el contenido actual.
- **Alturas iguales**: `flex h-full flex-col`; features crecen, CTA consistente.
- Entrada: blur-reveal en stagger (framer: `y:-20, blur(10px)→0, opacity 0→1`,
  `delay = i*0.15`). Respeta reduced-motion (sin desplazamiento/blur).
- Hover (puntero fino): lift + ring cobre suave (curva ease-out fuerte, Emil).
  Press: `active:scale-[0.99]`.

### 2. Toggle Mensual / Anual (`PricingSwitch`)
- Pill con dos opciones (Mensual | Anual) y highlight animado con `layoutId`
  (framer), recoloreado a cobre (`from-accent to-accent-2`, ring-accent).
- Estado `isYearly` vive en el contenedor del carrusel y se pasa a cada card.
- **El precio NO cambia** entre Mensual y Anual. En Anual cada card muestra una
  línea/insignia cobre: "🎁 Landing Page gratis" (con ícono `Gift` de Lucide, sin
  emoji), y el periodo pasa a "/ mes · facturado anual".
- El banner de promo anual existente se mantiene (explica el beneficio).
- El toggle aplica solo a los 3 planes de mantenimiento; "Start Your Page" (sprints)
  no se ve afectado.

### 3. Carrusel (móvil) / grid (desktop)
- Conserva: carrusel scroll-snap en móvil, grid de 3 en `lg`.
- **Fix corte vertical**: el `overflow-x-auto` recorta el eje Y (glow/lift). Se
  añade padding vertical al scroller (`py-8`) y holgura para el glow; el peek del
  siguiente se mantiene con `basis`.
- **Mismo tamaño**: slides ancho fijo (`basis`) + `items-stretch` + card `h-full`.
- **Auto-selección al hacer scroll**: el slide activo (IntersectionObserver) pasa a
  ser el seleccionado (`selected = active`). En desktop, hover/click selecciona.
- **Default recomendada**: al montar, el carrusel centra el plan `highlighted`
  (Intermedio) y queda seleccionado.

### 4. Nombre de marca en color del logo (cobre)
- `Logo` `textClassName` usa `text-accent` (cobre `#c68662`) en navbar, hero y footer.

### 5. Footer nuevo (adaptado del diseño provisto)
- Contenedor `max-w-6xl`, `rounded-3xl`, fondo/borde con gradiente sutil cobre
  (reemplaza el azul del original).
- **Banner CTA**: h2 "Hablemos de tu proyecto" + ícono flecha (cobre) + botón
  "Cotizar por WhatsApp" (gradiente cobre) → `waLink()`.
- Divisor.
- **4 columnas**:
  1. Logo (cobre) + descripción corta de WNRGY.
  2. **Navegación**: Inicio, Servicios, Planes, Proceso, Contacto.
  3. **Contacto**: Teléfono +502 4220-1061 (`tel:`), WhatsApp (`wa.me`),
     correo wnrgy.gt@gmail.com (`mailto:`), Guatemala.
  4. **Redes**: Instagram, Facebook, LinkedIn (círculos con borde cobre, íconos
     Lucide o marcas). Links a `#` por ahora.
- Headers de columna en cobre (`text-accent`) reemplazando `amber-300`.
- Bottom bar: "© 2026 WNRGY. Todos los derechos reservados." + "Política de
  privacidad" / "Términos" como placeholders a `#`.
- Tipografía: `font-geist` del original → `font-sans`/`font-display` del sitio.

### 6. Corrección de datos
- Teléfono real: **+502 4220-1061**. Actualizar `lib/content.ts`
  (`footer.contacto.telefono` y `whatsapp`) y `lib/whatsapp.ts`
  (`WHATSAPP_PHONE = "50242201061"`).

### 7. Pasada impeccable (al final)
- Contraste WCAG (cobre sobre navy, texto slate), foco/teclado, responsive, y
  pulido de consistencia (radios, sombras, ritmo). Ajustes inline.

## Componentes afectados / nuevos
- `components/ui/PlanCard.tsx` (rewrite v2).
- `components/ui/PricingSwitch.tsx` (nuevo, client).
- `components/sections/PlanesCarousel.tsx` (toggle + auto-select + fixes).
- `components/sections/Planes.tsx` (montaje del toggle, promo).
- `components/ui/Logo.tsx` (texto cobre).
- `components/sections/Footer.tsx` (rewrite adaptado).
- `lib/content.ts`, `lib/whatsapp.ts` (teléfono).

## Verificación
- `npm run lint` + `npm run build` limpios.
- Screenshots desktop + móvil: cards (simetría, tamaño, sin corte), toggle
  Mensual/Anual, auto-selección al scroll, footer, marca en cobre.

## Fuera de alcance
- Páginas reales de Privacidad/Términos.
- Precios anuales distintos (mismo precio; el beneficio anual es la landing gratis).
- Efectos pesados (Sparkles, NumberFlow).
