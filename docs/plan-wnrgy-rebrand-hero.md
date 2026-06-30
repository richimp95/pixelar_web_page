# Plan — WNRGY rebrand + geometric hero + design refine

Brand: **Pixelar → WNRGY**. Colors from `/logo`: navy `#1F3042`, copper `#C68662`.
Decisions: replace current Hero with geometric hero · whole-site navy+copper palette · email `contacto@wnrgy.com`.
Worker for coding: **Codex** (codex:rescue). Refine order: **taste → emil → impeccable**.

## Stack check (done)
- Tailwind v4 ✓ · TypeScript ✓ · alias `@/*`→`./*` ✓ · `components/ui/` exists ✓ (not shadcn, but compatible — no CLI setup needed).
- `cn` lives at `@/lib/cn`; pasted component imports `@/lib/utils` → add shim.
- `lucide-react` installed ✓ · `framer-motion` ✓.

## Why /components/ui
Already present. shadcn convention = shared, app-agnostic primitives live here so any section can import them. Hero goes here as `shape-landing-hero.tsx`.

## Phase 0 — scaffolding
- `lib/utils.ts` → `export { cn } from "./cn";` (satisfies `@/lib/utils` import).
- Copy logo SVGs into `public/logo/` (Next can only serve from `public/`). Skip `*Zone.Identifier*` junk.

## Phase 1 — brand tokens (whole site) `app/globals.css`
Remap `@theme` tokens to navy+copper:
- `--color-bg: #0a1320` (deep navy) · `--color-surface: #1f3042` · `--color-accent: #c68662` (copper)
- `--color-accent-2: #e0a883` · `--color-accent-3: #9c6a4a` · keep ink/muted (tune muted warmer).
- Entire site recolors via existing token usage (accent, bg, surface).

## Phase 2 — rebrand text
- `lib/content.ts`: `brand` ×2 → WNRGY, all "Pixelar" copy → WNRGY, footer email `contacto@wnrgy.com`, legal.
- `app/layout.tsx`: title/description/keywords/OG.
- `Planes.tsx`, `Renovacion.tsx`, `lib/whatsapp.ts`: "Hola Pixelar" → "Hola WNRGY".
- `Navbar.tsx`: swap text brand for logo image (`/logo/logo-white-transparent.svg`) + WNRGY wordmark fallback.

## Phase 3 — geometric hero `components/ui/shape-landing-hero.tsx`
- Paste component, recolored to brand: bg → `bg-bg`, shape gradients → copper/navy/bronze tints, badge dot copper, title gradient copper→white→copper.
- Import `cn` from `@/lib/utils`.
- **Keep conversion**: extend with WhatsApp primary CTA + secondary `#planes` button + microcopy (current Hero has these; geometric hero as-pasted has none).
- `Hero.tsx` → renders `HeroGeometric` with WNRGY props from `content.hero`.
- Respect `prefers-reduced-motion`: disable infinite shape float.

## Phase 4 — refine passes (Codex applies, I review)
1. **taste** — audit page direction, kill generic/AI-slop patterns, type/spacing rhythm.
2. **emil** — motion + micro-detail polish (easing, reveal timing, focus states).
3. **impeccable** — full UI audit: hierarchy, a11y, responsive, contrast (copper on navy WCAG).

## Phase 5 — verify
- `npm run lint` · `npm run test` (WhatsAppButton) · `npm run build` (static export) · dev screenshot hero.

## Open/risk
- Copper `#c68662` on navy: check text contrast in refine; use lighter copper for small text.
- `cn` is plain join (no tw-merge) — fine for hero's additive classes.
