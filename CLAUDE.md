# The Digital Curator — Portfolio Site

## What This Is
Alex Clark's personal portfolio site. It's an editorial, gallery-like experience showcasing professional eCommerce work (Fender, SOREL, Dr. Martens, Made In Oregon), side projects (Fret Atlas, CRO Toolkit), and personal interests. The creative north star is **"The Digital Curator"** — soft minimalism, breathing room, intentional asymmetry.

## Tech Stack
- **Astro 5** with **React 19** islands (interactive components only)
- **CSS custom properties** + Astro scoped `<style>` — no Tailwind (explicit preference)
- **GSAP 3 + ScrollTrigger** for timeline animations (Phase 4)
- **Nanostores** for cross-island state (Phase 5)
- **TypeScript** strict mode
- **Cloudflare Pages** via GitHub (`apclark31/portfolio`)

## Architecture
Single scrolling page (`src/pages/index.astro`) with hash-based nav. Sections flow as a curated exhibition. React islands are used only where JS interactivity is required (GSAP timeline, case study overlay, contact form).

## Design System Rules (from DESIGN.md)
These are non-negotiable:
- **No 1px borders.** Structural separation via background color shifts (tonal layering).
- **No pure black text.** Always `--color-on-surface` (#2c2f31).
- **No drop shadows as primary elevation.** Use tonal layering first, ambient shadows (40-60px blur, 4-8% opacity, tinted with on-surface) only when needed.
- **Ghost borders only** if a border is truly required: `--color-outline-variant` at 15% opacity.
- **Signature gradient:** `linear-gradient(135deg, --color-primary 0%, --color-primary-container 100%)` for primary CTAs.
- **Glassmorphism** for floating elements: `backdrop-filter: blur(20px)` with semi-transparent white.
- **Typography:** Manrope for headlines/labels, Plus Jakarta Sans for body. High-contrast pairing.
- **Rounded corners:** `--radius-xl` (1rem) for images, `--radius-full` (9999px) for buttons/pills.
- **Motion:** ease-in-out 300ms for all hover states. Elements should feel like floating, not snapping.
- **Whitespace:** When in doubt, double it. "The Digital Curator is never in a rush."

## Design Tokens
All 60+ tokens live in `src/styles/tokens.css` as CSS custom properties. Key ones:
- `--color-primary: #00675d` (teal)
- `--color-primary-container: #6af2de` (light teal)
- `--color-surface: #f5f7f9` (off-white base)
- `--color-on-surface: #2c2f31` (body text)
- Surface hierarchy: `lowest` (#fff) → `low` → `container` → `high` → `highest`

## Content Strategy
- Timeline entries, case studies, projects, and hobbies will be Astro content collections (MDX with Zod schemas) once Phase 3 is implemented
- Currently hardcoded with real company names but placeholder descriptions
- Alex's LinkedIn data is partial (scraped without auth) — exact dates and titles need manual verification
- SOREL and Fender will have the richest case study content (A/B testing examples)
- Dr. Martens and Made In Oregon will have lighter timeline entries
- Images are all Unsplash placeholders until real assets are provided

## Key UX Decisions
- **Single page:** All sections scroll as one exhibition, not separate routes
- **Case study overlay:** Slide-in panel (right on desktop, bottom sheet on mobile) — does NOT navigate away from the timeline
- **Timeline interactivity:** GSAP ScrollTrigger with parallax, progressive reveal, alternating left/right layout
- **Mobile-first:** All layouts responsive, simplified animations on mobile

## Commands
```
npm run dev      # Dev server at localhost:4321
npm run build    # Build to ./dist/
npm run preview  # Preview production build locally
```

## Deployment
Pushes to `main` auto-deploy via Cloudflare Pages. Build command: `npm run build`, output: `dist/`.
