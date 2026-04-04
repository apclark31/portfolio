# Editor Guide

A quick reference for hand-editing the portfolio site. The site is built with [Astro](https://astro.build/) — a static-first framework that ships zero JavaScript by default and uses file-based routing.

---

## Directory Structure

```
src/
├── pages/              ← Routes (each file = a URL)
│   ├── index.astro          Homepage (/)
│   ├── experience.astro     Full timeline (/experience)
│   └── projects.astro       Full projects page (/projects)
│
├── components/         ← Reusable UI pieces
│   ├── hero/                HeroSection, FloatingGallery, BentoIntro
│   ├── about/               AboutSection (bento cards, "How I Work", etc.)
│   ├── contact/             ContactSection (form + info panel)
│   ├── timeline/            Timeline.tsx (React + GSAP), TimelineHeader
│   ├── projects/            ProjectsSection (homepage bento grid)
│   ├── competencies/        CoreCompetencies (not currently on homepage)
│   ├── hobbies/             InterestGrid (not currently on homepage)
│   ├── case-study/          CaseStudyOverlay (React, slide-in panel)
│   ├── navigation/          Navigation bar
│   └── shared/              GradientButton, SecondaryButton, SectionLabel, TagPill, Footer
│
├── content/            ← Data files (JSON) for content collections
│   ├── timeline/            One JSON file per job (fender-current.json, sorel.json, etc.)
│   ├── projects/            One JSON file per project (measurable.json, etc.)
│   └── hobbies/             One JSON file per hobby
│
├── content.config.ts   ← Schemas for the content collections (Zod validation)
├── stores/             ← Shared state (nanostores) for React islands
├── layouts/            ← Layout.astro — the HTML shell (<head>, fonts, meta)
└── styles/
    ├── tokens.css           All design tokens (colors, spacing, typography, etc.)
    └── global.css           Global styles, utility classes, resets
```

```
public/
└── images/             ← Static assets served as-is (reference as /images/filename.jpg)
```

---

## How to Edit Content

### Timeline entries (job history)
Edit JSON files in `src/content/timeline/`. Each file has:
- `dateRange` — e.g. "2024 — Present"
- `role` — job title
- `company` — company name
- `description` — paragraph about the role
- `tags` — array of skill pills shown on the entry
- `side` — "left" or "right" (alternating layout on desktop)
- `isCurrent` — true for your current role
- `image` — URL or path to an image for this entry
- `caseStudy` — true if a "View Case Study" button should appear
- `order` — sort order (0 = first/most recent)

### Projects
Edit JSON files in `src/content/projects/`. Fields:
- `title`, `description` — what shows up on the page
- `type` — "main", "secondary", or "hobby" (controls layout on homepage bento)
- `tags` — array of tech tags (shown as overlays on main project image)
- `image` — optional image URL/path
- `github`, `url` — link buttons
- `badge` — small label like "Browser Extension"
- `hashtags` — shown as hashtag pills
- `order` — sort order (0 = first)

### Hobbies
Edit JSON files in `src/content/hobbies/`. Fields: `icon` (Material Symbol name), `title`, `description`, `order`.

### Adding a new entry
Create a new `.json` file in the appropriate `src/content/` folder. As long as it matches the schema in `content.config.ts`, Astro will pick it up automatically.

---

## How to Edit Visuals

### Design tokens
All colors, spacing, font sizes, radii, and shadows are CSS custom properties in `src/styles/tokens.css`. Change a token here and it updates everywhere.

Key tokens:
- `--color-primary` — teal (#00675d), used for buttons, accents, links
- `--color-surface` — page background (#f5f7f9)
- `--color-on-surface` — body text (#2c2f31)
- `--space-*` — spacing scale (space-1 through space-32)
- `--text-*` — font size scale
- `--radius-*` — border radius scale

### Component styles
Each `.astro` file has a `<style>` block at the bottom. Astro scopes these styles automatically — they only apply to that component. Safe to edit without affecting other components.

### Global styles
`src/styles/global.css` has resets, utility classes (`.signature-gradient`, `.glass`, `.container`), and base typography rules.

---

## Astro Basics for Editing

### .astro files
An `.astro` file has three sections:
```astro
---
// Frontmatter (runs at build time, like server code)
// Imports, data fetching, props, variables go here
const title = "Hello";
---

<!-- Template (HTML with {expressions}) -->
<h1>{title}</h1>

<style>
  /* Scoped CSS — only affects this component */
  h1 { color: red; }
</style>
```

### Expressions in templates
Use `{variable}` to insert values, `{condition && <html>}` for conditional rendering, and `{array.map(item => <li>{item}</li>)}` for loops.

### React islands
Files ending in `.tsx` are React components. They only load JavaScript in the browser when marked with a `client:*` directive in the parent `.astro` file:
- `client:visible` — loads when scrolled into view (used for Timeline)
- `client:load` — loads immediately (used for CaseStudyOverlay)

If a component doesn't have a `client:*` directive, it renders to static HTML with no JS.

### Content collections
Data in `src/content/` is validated against schemas in `src/content.config.ts`. If you add a field to a JSON file that isn't in the schema, the build will fail. Update the schema first if you need new fields.

---

## Commands

```bash
npm run dev      # Start dev server at localhost:4321 (hot reloads on save)
npm run build    # Production build to ./dist/
npm run preview  # Preview the production build locally
```

---

## Pages Overview

| URL | File | What it shows |
|-----|------|---------------|
| `/` | `src/pages/index.astro` | Hero, About (bento), Contact, Experience preview (1 entry), Projects bento |
| `/experience` | `src/pages/experience.astro` | Full animated timeline + case study overlay |
| `/projects` | `src/pages/projects.astro` | Measurable (featured), CRO Toolkit, Fret Atlas |

---

## Images
Place images in `public/images/` and reference them as `/images/filename.jpg` in components or JSON data files. Astro serves `public/` files as-is at the root path.
