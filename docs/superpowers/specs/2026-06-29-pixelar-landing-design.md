# Spec de Diseño — Landing de Pixelar

**Fecha:** 2026-06-29
**Estado:** Aprobado (enfoque A)
**Autor:** Equipo Pixelar + Claude Code

---

## 1. Resumen

Landing page profesional de una sola página para **Pixelar**, empresa guatemalteca que
crea, renueva y administra páginas web para negocios. Objetivo de negocio: que el visitante
contacte por **WhatsApp** para cotización/asesoría. Tono: profesional, moderno, cercano,
confiable, enfocado en beneficios (no en tecnicismos). Todo el contenido en español.

Frase principal de marca: *"Tu negocio, mejor visto en internet."*

## 2. Objetivos y criterios de éxito

- **Conversión:** todos los CTAs llevan a WhatsApp con mensaje prellenado.
- **Confianza/percepción:** se ve como agencia digital premium en desktop y móvil.
- **Rendimiento:** carga rápida (objetivo Lighthouse Performance ≥ 90, móvil incluido).
- **SEO básico:** title, meta description, estructura semántica (un solo `h1`), Open Graph.
- **Accesibilidad:** contraste AA (cuerpo ≥ 4.5:1), navegación por teclado, `prefers-reduced-motion`.
- **Mantenibilidad:** contenido centralizado y editable; componentes reutilizables.

## 3. Stack técnico

- **Framework:** Next.js (App Router) + TypeScript.
- **Estilos:** Tailwind CSS con tokens de diseño en `globals.css` (variables OKLCH) +
  config de Tailwind.
- **Motion:** librería `motion` (Framer Motion), con curvas ease-out exponenciales y
  fallback `prefers-reduced-motion`.
- **Tipografía:** fuente moderna vía `next/font` (Manrope o Poppins display + Inter texto;
  emparejadas por eje de contraste, no dos sans casi idénticas).
- **Deploy objetivo:** Vercel (no se ejecuta en este alcance; el repo queda listo).

## 4. Sistema visual

Anclado en la paleta del brief pero **evitando los defaults de "slop"** que las skills de
diseño (taste/soft/emil/impeccable) prohíben explícitamente: nada de mesh-gradient morado
centrado, Inter+slate-900 por defecto, tres tarjetas idénticas genéricas, ni glassmorphism
en todo.

- **Paleta (OKLCH, derivada con `impeccable/palette.mjs` anclada al cyan/azul de marca):**
  - Fondo oscuro base: `#0F172A` (navy).
  - Acentos: cyan `#38BDF8`, índigo `#6366F1`, violeta `#8B5CF6` — usados con intención,
    no todos a la vez en cada sección.
  - Secciones claras (blanco/gris) intercaladas para contraste y ritmo.
  - Texto claro sobre oscuro; cuerpo con contraste AA verificado.
- **Motivo de marca:** "píxel / grid / pantalla" como elemento gráfico recurrente
  (sutil, no decorativo de relleno).
- **Tipografía:** display con peso alto para títulos; cuerpo legible 65–75ch; `text-wrap: balance`
  en h1–h3.
- **Motion:** entradas ease-out, micro-interacciones en botones (`:active` scale), hover
  moderno en tarjetas (sombra suave, no borde duro). Stagger legítimo en listas.
- **Tarjetas:** sombras suaves; sin tarjetas anidadas dentro de tarjetas.

## 5. Estructura de la página (secciones)

Orden y contenido según brief del cliente (texto completo en `content.ts`):

1. **Header / Navbar** — logo textual "Pixelar"; menú Inicio, Servicios, Planes, Proceso,
   Contacto; botón "Cotizar por WhatsApp". Sticky con efecto al hacer scroll.
2. **Hero** — h1 "Páginas web modernas para negocios que quieren crecer"; subtítulo; botones
   "Quiero mi página web" / "Ver planes"; microcopy "Diseño web • Administración mensual •
   Dominio y hosting • SEO básico"; mockup visual de página en laptop/pantalla.
3. **Problema** — título + texto + tarjetas de dolores comunes (6 ítems del brief).
4. **Solución** — título + texto + 3 beneficios (imagen profesional, responsive, administración).
5. **Servicios** — 4 tarjetas (creación, renovación, administración, SEO/indexación).
6. **Planes** — 3 tarjetas (Básico, Pro destacado "Más recomendado", Premium). Sin precios:
   botón "Cotizar [Plan]". Texto + CTA "Recibir asesoría" debajo.
7. **Proceso** — 5 pasos numerados.
8. **Beneficios** — 6 tarjetas ("¿Por qué elegir Pixelar?").
9. **Renovación** — comparación antes/después (5 vs 5) + CTA "Quiero renovar mi página".
10. **FAQ** — acordeón con 8 preguntas/respuestas del brief.
11. **CTA final** — título + texto + botones "Cotizar por WhatsApp" / "Ver planes" + microcopy.
12. **Footer** — nombre + descripción; enlaces; contacto (WhatsApp `+502 XXXX-XXXX`,
    `contacto@pixelar.gt`, Guatemala); redes (Instagram/Facebook/LinkedIn placeholder);
    "© 2026 Pixelar. Todos los derechos reservados."

## 6. Arquitectura de componentes

- **Compartidos:** `Container`, `Section` (wrapper con id para anclas + variante clara/oscura),
  `Button` (variantes primario/secundario), `WhatsAppButton` (centraliza link + mensaje),
  `Card`.
- **Secciones:** un componente por sección (`Navbar`, `Hero`, `Problema`, `Solucion`,
  `Servicios`, `Planes`, `Proceso`, `Beneficios`, `Renovacion`, `FAQ`, `CTAFinal`, `Footer`).
- **Contenido:** `content.ts` (o `content/*.ts`) con todo el texto en español y la config de
  WhatsApp (número placeholder + mensaje prellenado) en un solo lugar.
- **Navegación:** scroll suave entre secciones vía anclas (`#servicios`, `#planes`, etc.).

### Config de WhatsApp (centralizada)

- Link base placeholder: `https://wa.me/502XXXXXXXX`
- Mensaje prellenado: *"Hola Pixelar, estoy interesado en una página web para mi negocio.
  Me gustaría recibir más información."* (URL-encoded).
- Variantes por plan reutilizan el mismo helper, ajustando el texto.

## 7. SEO

- `title`: "Pixelar | Páginas web modernas para negocios en Guatemala".
- `meta description`: según brief.
- Keywords y Open Graph básicos.
- Un solo `h1` (hero); `h2` por sección; `h3` en tarjetas/planes.
- `alt` descriptivo en imágenes; HTML semántico (`header`, `main`, `section`, `footer`).

## 8. Accesibilidad y responsive

- Contraste AA verificado (cuerpo ≥ 4.5:1; placeholders incluidos).
- Foco visible y orden de tabulación lógico; acordeón FAQ operable por teclado.
- Layout responsive móvil-first; grids con `repeat(auto-fit, minmax(...))` donde aplique.
- Toda animación con alternativa `@media (prefers-reduced-motion: reduce)`.

## 9. Orquestación de skills (enfoque A)

- **Proceso (superpowers):** `brainstorming` (hecho) → `writing-plans` → `executing-plans`
  → `requesting-code-review` / `verification-before-completion`.
- **Diseño/criterio:** `impeccable` (motor de build de UI, sub-comandos craft/polish/audit;
  `palette.mjs` para paleta OKLCH), `soft-skill` y `taste-skill` (anti-slop, look de agencia),
  `emil-design-eng` + `review-animations` (criterio y revisión de animación).
- **Mockups previos (opcional):** Stitch MCP + `stitch-skill` (genera `DESIGN.md`) —
  **bloqueado hasta validar la API key** (actualmente "tools fetch failed").
- **QA visual:** gstack `design-review` / `landing-report`.
- **Memoria:** `graphify` indexa el código al finalizar para consultas futuras.

## 10. Fuera de alcance

- Backend, CMS, formularios con envío real a servidor (el formulario de contacto del Plan
  Básico es UI; la conversión real es WhatsApp).
- Precios reales (se usa "Cotizar").
- Número de WhatsApp / correo / redes reales (placeholders hasta que el cliente los dé).
- Deploy a producción y validación de la API key de Stitch.

## 11. Riesgos / dependencias

- **API key de Stitch inválida** → la rama de mockups de Stitch queda opcional/diferida.
- **Placeholders de contacto** → el cliente debe entregar número/correo/redes reales antes de publicar.
- **Defaults de "slop"** → mitigado aplicando las skills de taste en cada sección, no solo al final.
