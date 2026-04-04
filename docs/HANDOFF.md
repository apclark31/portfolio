# Handoff & Progress Tracker

## Current State: Phase 7 In Progress
Last updated: 2026-04-04

---

## Completed

### Phase 1: Foundation + Deployment (Done)
- [x] Astro 5 + React 19 + TypeScript strict scaffolded
- [x] 60+ design tokens as CSS custom properties (`src/styles/tokens.css`)
- [x] Global styles: signature gradient, glassmorphism, ambient shadows, selection colors, reduced-motion support (`src/styles/global.css`)
- [x] Layout shell (`src/layouts/Layout.astro`)
- [x] Navigation with mobile hamburger menu
- [x] Footer with social links
- [x] Shared UI components: GradientButton, SecondaryButton, TagPill, SectionLabel
- [x] GitHub repo: `apclark31/portfolio`
- [x] Cloudflare Pages wired — auto-deploys on push to `main`

### Phase 2: Static Sections (Done)
- [x] Hero, Bento Intro, Floating Gallery, Timeline placeholder, Core Competencies
- [x] Projects bento, Personal Interests grid, About bento, Contact split layout

### Phase 3: Content Collections + Multi-Page Architecture (Done)
- [x] Zod schemas for timeline, projects, hobbies, case studies collections
- [x] JSON data files for all content
- [x] Dedicated `/experience` and `/projects` pages
- [x] Route-based navigation

### Phase 4: GSAP Timeline (Done)
- [x] Timeline.tsx React island with scroll-driven animations
- [x] Center line draw, entry reveals, image parallax, milestone dot animations
- [x] Mobile-optimized vertical fade-up, reduced-motion support

### Phase 5: Case Study Overlay (Done, Replaced)
- [x] Original slide-in overlay built with nanostores
- [x] **Replaced** by dedicated case study pages (Phase 7)

### Phase 6: Design Polish + Content Overhaul (Done)
- [x] **Hero refined:** Simplified to "Hi, I'm Alex." H1, conversational intro, portrait-first on mobile
- [x] **PNW tree** moved to navigation logo ("Alex Clark 🌲")
- [x] **Real headshot** replacing Unsplash placeholder
- [x] **Buttons:** Solid `--color-primary` background, `--color-on-primary` text (no gradients)
- [x] **Navigation:** Hamburger menu on mobile, desktop inline links. Reordered: About, Experience, Projects
- [x] **Homepage streamlined:** Hero, About, Contact only. Experience and Projects on dedicated pages
- [x] **About section:** Business-forward bento — "How I Work" (links to /experience), "Proven Results" (white text, generic stats), empathy quote
- [x] **All em dashes removed** (permanent preference)
- [x] **All Unsplash images replaced** with real company logos/images and project screenshots
- [x] **Timeline entries:** All 5 updated with real resume data, real images
- [x] **Projects page:** Equal-weight 3-column grid with image lightbox overlay
- [x] **Project descriptions:** Real content from pitch docs (Measurable, CRO Toolkit, Fret Atlas)
- [x] **Fret Atlas:** Tech stack tags added (React, TypeScript, Vite, Tonal.js, Tone.js, Zustand), fretatlas.com linked
- [x] **Contact form:** Web3Forms integration (sends directly, no mailto), email removed from display for spam protection, success confirmation
- [x] **Section spacing** reduced across the board
- [x] **Page titles** use `|` separator (no em dashes)
- [x] **Mobile responsive:** Portrait-first hero, centered text, inline buttons, hamburger nav
- [x] **Editor guide** created for hand-editing reference

### Phase 7: Case Studies + Deep Dives (In Progress)
- [x] Case studies content collection with Zod schema (title, company, slug, pitch, problem, hypothesis, results, status, before/after image slots, tags)
- [x] 6 SOREL case study JSON files created (Exposed Search, Size Select Dropdown/Compact Grid/Persistence, Navigation, PDP Gallery)
- [x] `/case-studies/sorel-footwear` page with tabbed React island interface
- [x] Timeline "View Case Studies" link on SOREL navigates to dedicated page (replaces overlay)
- [ ] **Pending:** Before/after screenshots for each case study
- [ ] **Pending:** Real results data (lift %, significance) for each test
- [ ] **Pending:** Multi-brand case studies architecture (brand selector landing page, then individual studies)
- [ ] **Pending:** Fender case studies

---

## Domain & Deployment
- **Domain:** alexpnw.com (purchased on Cloudflare, setup in progress)
- **Hosting:** Cloudflare Pages, auto-deploys from `main` branch
- **Contact form:** Web3Forms (access key configured)

---

## Known Issues
- **React 19 SSR hooks error** in dev mode: `Invalid hook call` in Timeline.tsx during SSR. Pre-existing @astrojs/react + React 19 compatibility issue. Pages render fine (200 status), dev server sometimes exits. Build is unaffected.

---

## Architecture Notes
- **Multi-page site:** Homepage (`/`), Experience (`/experience`), Projects (`/projects`), Case Studies (`/case-studies/sorel-footwear`)
- **Homepage** is a minimal hub: Hero, About, Contact. Links out to detail pages.
- **Content collections** manage timeline (5), projects (3), hobbies (4), case studies (6) as JSON with Zod schemas
- **React islands** used for: Timeline (GSAP), CaseStudyTabs (tab interactivity), CaseStudyOverlay (legacy), contact form (Web3Forms)
- **Design tokens** in `src/styles/tokens.css` are the single source of truth
- **No Tailwind** — CSS custom properties and scoped Astro styles
- **No em dashes** — permanent preference
- **Branch strategy:** Phase branches stacked on previous, merge to `main` when validated

---

## Roadmap
- [ ] Multi-brand case studies entry point (brand selector, then drill into studies)
- [ ] Fender case studies (analytics recovery, CRO program, holiday campaigns)
- [ ] SEO: meta tags, Open Graph images, structured data (JSON-LD)
- [ ] Image optimization: Astro `<Image />` component, WebP/AVIF
- [ ] Accessibility audit: keyboard nav, ARIA, focus management, color contrast
- [ ] Lighthouse target: 90+ Performance, 100 Accessibility
- [ ] Page-load animations (hero elements stagger in)
