# Graph Report - .  (2026-06-29)

## Corpus Check
- 47 files · ~63,265 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 146 nodes · 309 edges · 13 communities (8 shown, 5 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.86)
- Token cost: 62,609 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Secciones y ensamblado de la landing|Secciones y ensamblado de la landing]]
- [[_COMMUNITY_Dependencias del proyecto|Dependencias del proyecto]]
- [[_COMMUNITY_Helpers, UI base y tests (WhatsApp)|Helpers, UI base y tests (WhatsApp)]]
- [[_COMMUNITY_Sistema de diseño y orquestación de skills|Sistema de diseño y orquestación de skills]]
- [[_COMMUNITY_Configuración TypeScript|Configuración TypeScript]]
- [[_COMMUNITY_Layout raíz y fuentes|Layout raíz y fuentes]]
- [[_COMMUNITY_Permisos de Claude (settings)|Permisos de Claude (settings)]]
- [[_COMMUNITY_Configuración ESLint|Configuración ESLint]]
- [[_COMMUNITY_Configuración Next.js|Configuración Next.js]]
- [[_COMMUNITY_Configuración PostCSS|Configuración PostCSS]]
- [[_COMMUNITY_Instrucciones del proyecto (CLAUDE.md)|Instrucciones del proyecto (CLAUDE.md)]]

## God Nodes (most connected - your core abstractions)
1. `Content` - 27 edges
2. `Reveal()` - 17 edges
3. `WhatsAppButton()` - 16 edges
4. `compilerOptions` - 16 edges
5. `Section()` - 15 edges
6. `cn()` - 12 edges
7. `Landing Page Root Assembler (app/page.tsx)` - 12 edges
8. `Spec de Diseño — Landing de Pixelar` - 10 edges
9. `Skill Orchestration Approach A` - 10 edges
10. `Card()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Reveal()` --conceptually_related_to--> `Accessibility AA (contrast, keyboard, reduced-motion)`  [INFERRED]
  components/motion/Reveal.tsx → docs/superpowers/specs/2026-06-29-pixelar-landing-design.md
- `Reveal()` --references--> `Framer Motion (motion library) with ease-out curves`  [EXTRACTED]
  components/motion/Reveal.tsx → docs/superpowers/specs/2026-06-29-pixelar-landing-design.md
- `WhatsApp Conversion Goal` --conceptually_related_to--> `WhatsAppButton()`  [INFERRED]
  docs/superpowers/specs/2026-06-29-pixelar-landing-design.md → components/ui/WhatsAppButton.tsx
- `Pixelar Landing — Implementation Plan` --references--> `Content`  [EXTRACTED]
  docs/superpowers/plans/2026-06-29-pixelar-landing.md → lib/content.ts
- `WhatsApp Conversion Goal` --conceptually_related_to--> `WhatsApp Link Helper (lib/whatsapp.ts)`  [INFERRED]
  docs/superpowers/specs/2026-06-29-pixelar-landing-design.md → lib/whatsapp.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **WhatsApp Conversion Funnel Sections** — sections_hero_hero, sections_navbar_navbar, sections_planes_planes, sections_renovacion_renovacion, sections_ctafinal_ctafinal [INFERRED 0.95]
- **All Landing Sections Consuming Centralized Content** — sections_hero_hero, sections_planes_planes, sections_faq_faq, sections_problema_problema, sections_beneficios_beneficios, sections_proceso_proceso, sections_solucion_solucion, sections_servicios_servicios, sections_renovacion_renovacion, sections_ctafinal_ctafinal, sections_navbar_navbar, sections_footer_footer [INFERRED 0.95]
- **Anti-Slop Design Quality Skill Team** — skill_impeccable, skill_taste_skill, skill_soft_skill, skill_emil_design_eng, skill_gstack [EXTRACTED 1.00]

## Communities (13 total, 5 thin omitted)

### Community 0 - "Secciones y ensamblado de la landing"
Cohesion: 0.22
Nodes (19): Landing Page Root Assembler (app/page.tsx), Content, Reveal(), State, Beneficios(), CTAFinal(), FAQ(), Footer() (+11 more)

### Community 1 - "Dependencias del proyecto"
Cohesion: 0.07
Nodes (29): dependencies, motion, next, react, react-dom, devDependencies, eslint, eslint-config-next (+21 more)

### Community 2 - "Helpers, UI base y tests (WhatsApp)"
Cohesion: 0.19
Nodes (12): cn(), waLink(), WhatsApp Link Helper (lib/whatsapp.ts), Pixelar Landing — Implementation Plan, Button(), Props, Variant, variants (+4 more)

### Community 3 - "Sistema de diseño y orquestación de skills"
Cohesion: 0.12
Nodes (21): Accessibility AA (contrast, keyboard, reduced-motion), AGENTS.md (Next.js Agent Rules), Anti-Slop Design Principles, Global CSS + OKLCH Design Tokens (app/globals.css), Root Layout with SEO Metadata (app/layout.tsx), Framer Motion (motion library) with ease-out curves, Next.js App Router + TypeScript Stack, OKLCH Color Palette (Navy + Cyan + Indigo + Violet) (+13 more)

### Community 4 - "Configuración TypeScript"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 5 - "Layout raíz y fuentes"
Cohesion: 0.40
Nodes (3): body, display, metadata

## Knowledge Gaps
- **65 isolated node(s):** `allow`, `display`, `body`, `metadata`, `State` (+60 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Content` connect `Secciones y ensamblado de la landing` to `Helpers, UI base y tests (WhatsApp)`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `Pixelar Landing — Implementation Plan` connect `Helpers, UI base y tests (WhatsApp)` to `Secciones y ensamblado de la landing`, `Sistema de diseño y orquestación de skills`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `Spec de Diseño — Landing de Pixelar` connect `Sistema de diseño y orquestación de skills` to `Helpers, UI base y tests (WhatsApp)`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `allow`, `display`, `body` to the rest of the system?**
  _65 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dependencias del proyecto` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `Sistema de diseño y orquestación de skills` be split into smaller, more focused modules?**
  _Cohesion score 0.12380952380952381 - nodes in this community are weakly interconnected._
- **Should `Configuración TypeScript` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._