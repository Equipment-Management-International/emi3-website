# EMI3 Website — Project Plan

## Overview

Rebuild the Equipment Management International website ([equipmentmanagement.com.au](https://www.equipmentmanagement.com.au/)) using the same Astro + React + Tailwind + Contentful stack proven on the OWR website. The goal is to give Russell a modern, maintainable site where he can iterate on content via Contentful and leverage Claude Code for rapid development.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Astro 5** | Static site generation, file-based routing |
| **React** | Interactive components only (forms, modals) |
| **Tailwind CSS 4** | Utility-first styling via `@tailwindcss/vite` |
| **Contentful** | CMS for pages, news/blog, product descriptions |
| **Netlify** | Hosting, build triggers from Contentful webhooks |
| **pnpm** | Package manager |
| **TypeScript** | Type safety throughout |

## Site Map (from current site)

```
/                           → Homepage (hero, value prop, products, CTA)
/what-we-do                 → About — services overview
/projects                   → Case studies / project history
/magnom                     → Magnom Filtration product page
/contact                    → Contact form
/software                   → Software — Maintenance suite (ZoneMaintenance, RouteMaintenance)
/software-status-suite      → Software — Status suite (SafetyStatus, ComponentStatus, EquipmentStatus, EnviroStatus)
/sensory-based-data         → Sensory data collection offering
/news                       → News & blog (Contentful-driven)
/take-action                → CTA / getting started page
/zonemaintenance            → Product detail page
/routemaintenance           → Product detail page
/componentstatus            → Product detail page
/safetystatus               → Product detail page
/privacy-policy             → Privacy policy
/term-of-use                → Terms of use
```

## Contentful Content Model

### Phase 1 — Core content types

#### `page` — Generic pages
| Field | Type | Notes |
|-------|------|-------|
| `title` | Symbol | Page title |
| `slug` | Symbol | URL path, unique, kebab-case |
| `metaDescription` | Symbol | SEO description |
| `heroHeading` | Symbol | Optional hero heading override |
| `heroImage` | Asset | Optional hero background |
| `body` | Rich Text | Main page content |

#### `product` — Software product pages
| Field | Type | Notes |
|-------|------|-------|
| `name` | Symbol | Product name (e.g. "ZoneMaintenance") |
| `slug` | Symbol | URL path |
| `tagline` | Symbol | Short description |
| `description` | Rich Text | Full product description |
| `icon` | Symbol | SVG path or icon name |
| `features` | Array of Symbols | Feature bullet points |
| `category` | Symbol | `maintenance` or `status-suite` |
| `order` | Integer | Display order |

#### `newsArticle` — Blog / news posts
| Field | Type | Notes |
|-------|------|-------|
| `title` | Symbol | Article title |
| `slug` | Symbol | URL path |
| `date` | Date | Publish date |
| `excerpt` | Symbol | Card preview text |
| `body` | Rich Text | Article content |
| `featuredImage` | Asset | Card/hero image |
| `tags` | Array of Symbols | Categorisation |

### Phase 2 — Enhanced content

- `testimonial` — Customer quotes with name, role, company
- `project` — Case study entries with images, outcomes
- `teamMember` — Team/about page entries

## Project Structure

```
emi3-website/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── netlify.toml
├── .env.example
├── CLAUDE.md
├── docs/
│   └── project-plan.md        ← this file
├── public/
│   ├── favicon.ico
│   └── images/
│       ├── emi-logo.png        ← EMI logo
│       └── hero/               ← Hero background images
├── src/
│   ├── components/
│   │   ├── Nav.astro           ← Fixed header with mobile menu
│   │   ├── Footer.astro        ← Site footer
│   │   ├── HeroSection.astro   ← Hero banner with CTA
│   │   ├── ValueProp.astro     ← "Transparency drives Accountability..." section
│   │   ├── ProductGrid.astro   ← 6 product cards grid
│   │   ├── ProcessSteps.astro  ← "4 steps to get started" section
│   │   ├── CTASection.astro    ← "Why settle..." closing CTA
│   │   └── ContactForm.tsx     ← React contact form (client:load)
│   ├── lib/
│   │   ├── contentful.ts       ← Contentful client (graceful null if unconfigured)
│   │   ├── contentful-types.ts ← TypeScript interfaces for content types
│   │   └── rich-text.ts        ← Rich text → HTML with EMI Tailwind classes
│   ├── layouts/
│   │   └── Layout.astro        ← Base HTML layout (meta, fonts, analytics)
│   ├── pages/
│   │   ├── index.astro         ← Homepage (all sections)
│   │   ├── contact.astro       ← Contact page
│   │   ├── news/
│   │   │   ├── index.astro     ← News listing
│   │   │   └── [slug].astro    ← Individual article
│   │   ├── privacy-policy.astro
│   │   ├── term-of-use.astro
│   │   └── [...slug].astro     ← Dynamic Contentful pages
│   └── styles/
│       └── global.css          ← Tailwind imports + EMI theme (@theme block)
```

## Implementation Phases

### Phase 1 — Foundation (demo-ready)
1. **Scaffold Astro project** with React, Tailwind 4, TypeScript
2. **EMI brand theme** in `global.css` — colors, typography, spacing
3. **Layout + Nav + Footer** — responsive, mobile menu
4. **Homepage sections** — Hero, value prop, product grid, process steps, CTA
5. **Basic Contentful integration** — client, types, rich-text renderer
6. **2-3 static pages** — contact, privacy, terms

**Goal:** Show Russell a working site with EMI branding that he can see content flowing from Contentful.

### Phase 2 — Content & Pages
1. **Contentful content types** created (page, product, newsArticle)
2. **Dynamic page routing** — `[...slug].astro` for Contentful `page` entries
3. **Product pages** — individual product detail pages from Contentful
4. **News/blog** — listing + detail pages from Contentful
5. **Contact form** — React component with form handling

### Phase 3 — Polish & Deploy
1. **SEO** — sitemap, meta tags, OG images
2. **Performance** — image optimization, lazy loading
3. **Netlify deployment** — build config, Contentful webhook
4. **Analytics** — Umami or GA integration
5. **Remaining pages** — projects, magnom, sensory-based-data, about

## Brand & Design Direction

### Current Site Analysis
- **Primary color:** Dark gold/amber (#C5960C approximate from logo) — mining/industrial feel
- **Backgrounds:** Dark sections (charcoal/black) alternating with white
- **Typography:** Clean, uppercase headings, professional tone
- **Imagery:** Heavy machinery, mining equipment, industrial settings
- **Tone:** Professional B2B, technical but accessible

### Proposed Tailwind Theme Tokens
| Token | Hex | Usage |
|-------|-----|-------|
| `emi-gold` | TBD (extract from logo) | Primary accent, CTAs, branding |
| `emi-gold-dark` | TBD | Hover states |
| `emi-charcoal` | #333333 | Dark backgrounds |
| `emi-black` | #1a1a1a | Deepest backgrounds |
| `emi-gray` | #f5f5f5 | Light section backgrounds |

### Design Patterns (following OWR conventions)
- Alternating light/dark section backgrounds
- `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` content containers
- `py-16 sm:py-24` section spacing
- Rounded cards with hover states
- Fixed nav with `backdrop-blur-md`
- Mobile-first responsive design

## Key Differences from OWR

| Aspect | OWR | EMI3 |
|--------|-----|------|
| Backend API | Rails app with session cookies | None — pure static/CMS site |
| User auth | Cross-domain session detection | Not needed |
| Dynamic data | Client-side API fetching (stats, search) | All content from Contentful at build time |
| Interactive components | Search, user nav | Contact form only (initially) |
| Content focus | Help docs, changelog | Product pages, news/blog, case studies |

## Demo Talking Points

When showing Russell:
1. **Contentful CMS** — "Edit content here, site rebuilds automatically"
2. **Claude Code** — "Describe a change, Claude builds it — new sections, pages, styling"
3. **Astro** — "Blazing fast static site, great SEO, simple to understand"
4. **Tailwind** — "Consistent design system, easy to adjust brand colors"
5. **Netlify** — "Push to deploy, preview branches, form handling built in"
6. **Cost** — "Contentful free tier + Netlify free tier = $0/month to start"
