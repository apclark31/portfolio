# Handoff & Progress Tracker

## Current State: Phase 5 Complete
Last updated: 2026-03-29

---

## Completed

### Phase 1: Foundation + Deployment (Done)
- [x] Astro 5 + React 19 + TypeScript strict scaffolded
- [x] 60+ design tokens as CSS custom properties (`src/styles/tokens.css`)
- [x] Global styles: signature gradient, glassmorphism, ambient shadows, selection colors, reduced-motion support (`src/styles/global.css`)
- [x] Layout shell (`src/layouts/Layout.astro`)
- [x] Glassmorphic Navigation with mobile hamburger menu + IntersectionObserver active section tracking
- [x] Footer with social links
- [x] Shared UI components: GradientButton, SecondaryButton, TagPill, SectionLabel
- [x] GitHub repo: `apclark31/portfolio`
- [x] Cloudflare Pages wired — auto-deploys on push to `main`

### Phase 2: Static Sections (Done)
- [x] **Hero:** Full-viewport section with headline, availability badge, portrait (grayscale hover), floating stat card, dual CTAs
- [x] **Bento Intro:** "Balance of Precision & Passion" card + "12+ Years" stat card
- [x] **Floating Gallery:** "Curated Works" horizontal scroll with chevron nav and center-enlarged item
- [x] **Timeline (static placeholder):** Real work history (Fender x2, SOREL, Dr. Martens, Made In Oregon) with alternating left/right layout, milestone markers, date badges, tag pills, "View Case Study" links
- [x] **Core Competencies:** Bento grid — CRO (with glow effect), Technical Feats (primary bg, hover lift), Interface Design (animated bar), Strategic Thinking (animated circles)
- [x] **Projects:** 12-column bento — Measurable (8-col with image tag overlays), CRO Toolkit (4-col), Fret Atlas (5-col horizontal layout), CTA card (7-col with gradient glow blurs)
- [x] **Personal Interests:** 4-column grid — Philosophy, V60 Brewing, Brutalist Arch, Ambient Synth (hover effects, correct mockup icons)
- [x] **About:** 6-column bento — Precision Workflow (pill tags), Fret Atlas hobby (primary bg, decorative circle), Tech Stack (dot indicators), Philosophy quote (attribution line, gradient title accent)
- [x] **Contact:** Split layout — info panel (primary bg, icon circles, label/value pairs, social links) + form panel (full-width gradient submit)

---

## Next Up

### Phase 3: Content Collections + Multi-Page Architecture (Done)
- [x] Defined Zod schemas in `src/content.config.ts` for timeline, projects, hobbies collections (Astro 6 Content Layer API with glob loader)
- [x] Created JSON data files for all timeline entries (5), projects (3), and hobbies (4) in `src/content/`
- [x] Refactored TimelinePlaceholder, ProjectsSection, InterestGrid to accept data via props
- [x] Created dedicated `/experience` page (full timeline) and `/projects` page (full showcase)
- [x] Updated homepage to query collections: 2-entry timeline preview + "View Full Timeline" link, full projects bento, hobbies, about, contact
- [x] Switched navigation from hash-based to route-based links (`/experience`, `/projects`, `/#about`, `/contact`)
- [x] Updated all internal hash links across components
- [ ] **Pending:** Alex needs to verify exact job titles, date ranges, and descriptions — current data is from partial LinkedIn scrape
- [ ] **Pending:** Case study content collection (MDX) deferred to Phase 5

### Phase 4: GSAP Timeline (Done)
- [x] Installed GSAP 3.14 + ScrollTrigger
- [x] Built `Timeline.tsx` React island with scroll-driven animations
- [x] Center line draws on scroll (`scaleY` scrub)
- [x] Entries fade in + slide from their side (left/right offset, 60px)
- [x] Entry images parallax (yPercent -8 to 8, scrubbed)
- [x] Milestone dots scale from 0 with back ease on reveal
- [x] Mobile: simpler vertical fade-up reveals via `gsap.matchMedia()`
- [x] `prefers-reduced-motion` disables all GSAP animations
- [x] `ScrollTrigger.refresh()` called after all images load
- [x] Homepage uses `Timeline` in preview mode (no GSAP, no center line)
- [x] Experience page uses `Timeline` with `client:visible` for full animations

### Phase 5: Case Study Overlay (Done)
- [x] Installed nanostores + @nanostores/react
- [x] Created `src/stores/caseStudy.ts` shared atom with open/close helpers
- [x] Built `CaseStudyOverlay.tsx` React island with `client:load`
- [x] Slide-in panel: right 60% on desktop, bottom sheet on mobile
- [x] GSAP animations for open/close (xPercent on desktop, yPercent on mobile)
- [x] Backdrop dim with blur
- [x] Scroll position preservation (stores scrollY, locks body, restores on close)
- [x] URL hash sync (`#case-study/slug`) + browser Back button closes overlay
- [x] Escape key closes overlay
- [x] Content layout: hero image, company meta, description, placeholder for full case study MDX
- [x] "View Case Study" button in Timeline wired to open overlay via nanostores
- [ ] **Pending:** Real case study MDX content (deferred to content phase)

### Phase 6: Polish
- [ ] Convert FloatingGallery to React island with smoother scroll behavior
- [ ] ContactForm.tsx with client-side validation
- [ ] Connect form to Cloudflare Pages Functions or Formspree
- [ ] Smooth-scroll polishing for nav links
- [ ] Add subtle page-load animations (hero elements stagger in)

### Phase 7: Content & Final Deploy
- [ ] Replace all Unsplash placeholder images with real work samples
- [ ] Replace placeholder portrait with Alex's real photo
- [ ] Fill in accurate job descriptions for all timeline entries
- [ ] Write real case study content (SOREL A/B tests, Fender projects)
- [ ] SEO: meta tags, Open Graph images, structured data (JSON-LD)
- [ ] Image optimization: Astro `<Image />` component, WebP/AVIF, lazy loading
- [ ] Accessibility audit: keyboard nav, ARIA labels, focus management for overlay, color contrast
- [ ] Lighthouse target: 90+ Performance, 100 Accessibility
- [ ] Custom domain setup on Cloudflare Pages
- [ ] Update links: LinkedIn URL, GitHub URL, resume download, email address

---

## Content Alex Needs to Provide
- [ ] Professional headshot/portrait photo
- [ ] Exact job titles, date ranges, and descriptions for each role
- [ ] Work sample screenshots (dashboards, A/B test results, site designs)
- [ ] SOREL case study content (A/B test details, metrics, screenshots)
- [ ] Fender case study content
- [ ] Real email address for contact form
- [ ] Resume PDF for download link
- [ ] Custom domain name (if desired)

---

## Architecture Notes
- Multi-page site: homepage (`/`), experience (`/experience`), projects (`/projects`). About and Contact live on the homepage.
- Content collections (Astro 6 Content Layer API) manage timeline, projects, and hobbies data as JSON files with Zod schemas.
- Components accept data via props — pages query collections and pass data down.
- Homepage shows a 2-entry timeline preview with link to full `/experience` page.
- React islands (`client:visible` / `client:load`) are used only for: Timeline (GSAP), CaseStudyOverlay (interactive), FloatingGallery (scroll behavior), ContactForm (validation).
- Everything else is static Astro components — zero JS shipped for those sections.
- Design tokens in `src/styles/tokens.css` are the single source of truth. All components reference them via CSS custom properties.
- Navigation uses route-based links with `activePath` prop for current-page highlighting.
- The timeline currently uses `TimelinePlaceholder.astro` (static). It will be replaced by `Timeline.tsx` (React + GSAP) in Phase 4. The layout and styles should carry over.
