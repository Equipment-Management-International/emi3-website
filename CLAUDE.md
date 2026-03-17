# EMI3 Website — Equipment Management International

## What This Is

Marketing website for [Equipment Management International](https://www.equipmentmanagement.com.au/) — a company providing digital work instruction software and maintenance solutions for Tier 1 and 2 mining operations across Australia. Established 2005.

This is a full rebuild of their existing site using a modern Astro + Contentful stack, following the same architecture as the OWR website (`/Users/colin/dev/tributech/owr-apps/owr-website`).

## Tech Stack

- **Framework:** Astro 5 (static site generation)
- **Interactive components:** React (minimal — only where client-side interactivity is needed)
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/vite` plugin, NOT the old Astro integration)
- **CMS:** Contentful (product pages, news/blog, generic pages)
- **Package Manager:** pnpm
- **Hosting:** Netlify (static, published from `dist/`)
- **Node:** v20+

## Project Structure

```
src/
├── components/          # Astro components (.astro files)
│   ├── Nav.astro        # Fixed header with mobile menu
│   ├── Footer.astro     # Site footer with links
│   ├── HeroSection.astro        # Hero banner with CTA
│   ├── ValueProp.astro          # Core value proposition section
│   ├── ProductGrid.astro        # 6 software product cards
│   ├── ProcessSteps.astro       # 4-step getting started
│   └── CTASection.astro         # Closing call-to-action
├── lib/
│   ├── contentful.ts    # Contentful SDK client (returns null if unconfigured)
│   ├── contentful-types.ts  # TypeScript interfaces for content types
│   └── rich-text.ts     # Rich text → HTML renderer with EMI Tailwind classes
├── layouts/
│   └── Layout.astro     # Base HTML layout (meta, fonts, analytics)
├── pages/
│   ├── index.astro      # Homepage (all sections)
│   ├── contact.astro    # Contact page
│   ├── news/
│   │   ├── index.astro  # News listing (Contentful newsArticle)
│   │   └── [slug].astro # Individual news article
│   ├── privacy-policy.astro
│   ├── term-of-use.astro
│   └── [...slug].astro  # Dynamic Contentful pages (products, about, etc.)
└── styles/
    └── global.css       # Tailwind imports + EMI brand theme (@theme block)
```

## Commands

```bash
pnpm dev       # Astro dev server
pnpm build     # Production build to dist/
pnpm preview   # Preview production build locally
```

## Architecture & Key Decisions

### Pure Static Site
Unlike OWR, there is no backend Rails app. All content comes from Contentful at build time. No client-side API fetching, no session cookies, no user authentication.

### Contentful as Single Content Source
All page content managed in Contentful — products, news articles, generic pages. This lets Russell update content without touching code. Netlify rebuild is triggered via Contentful webhook on publish.

### Minimal React
Keep the site as static Astro components. Only use React (`client:load`) for genuinely interactive elements like contact forms. Everything else is `.astro` files.

### Following OWR Patterns
This project replicates the proven patterns from `/Users/colin/dev/tributech/owr-apps/owr-website`:
- Tailwind 4 via `@tailwindcss/vite` (no separate tailwind.config.js)
- Brand colors in `@theme` block in `global.css`
- Contentful client with graceful null fallback
- Rich text renderer with branded Tailwind classes
- Static page generation with `getStaticPaths` for dynamic routes

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `CONTENTFUL_SPACE_ID` | Contentful space ID | Yes (for CMS content) |
| `CONTENTFUL_DELIVERY_TOKEN` | Contentful Delivery API token | Yes (production) |
| `CONTENTFUL_PREVIEW_TOKEN` | Contentful Preview API token | No (dev drafts) |
| `PUBLIC_SITE_URL` | Canonical site URL | No (default: `https://www.equipmentmanagement.com.au`) |
| `PUBLIC_GA_ID` | Google Analytics ID | No |

Prefix with `PUBLIC_` for client-side access. Contentful vars are server-side only (build time).

## Theme & Design System

### Colors (defined in `src/styles/global.css` via `@theme`)

| Token | Hex | Usage |
|-------|-----|-------|
| `emi-gold` | #C5960C | Primary accent, CTAs, branding (from logo) |
| `emi-gold-dark` | #A67C0A | Hover states |
| `emi-charcoal` | #333333 | Dark section backgrounds |
| `emi-black` | #1A1A1A | Deepest backgrounds, nav |
| `emi-gray` | #F5F5F5 | Light section backgrounds |
| `emi-white` | #FFFFFF | White backgrounds |

Usage: `bg-emi-gold`, `text-emi-charcoal`, `border-emi-gold-dark`, etc.

### Typography
- **Primary font:** TBD (clean sans-serif — likely Inter or similar)
- Uppercase headings for section titles (matches current site style)
- Professional, technical tone

### Design Patterns
- **Sections:** Alternate light/dark backgrounds for visual rhythm
- **Light sections:** `bg-white` or `bg-emi-gray`
- **Dark sections:** `bg-emi-charcoal` or `bg-emi-black` with light text
- **Section spacing:** `py-16 sm:py-24`
- **Content containers:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Cards:** `rounded-xl border border-gray-200 bg-white hover:shadow-lg`
- **Buttons:** Primary = `bg-emi-gold text-white font-semibold hover:bg-emi-gold-dark`, Secondary = `border border-emi-gold text-emi-gold`
- **Fixed nav:** `backdrop-blur-md` with dark background
- **Icons:** Inline SVG paths (no icon library)
- **Responsive:** `sm:` (640px), `md:` (768px), `lg:` (1024px)

## Conventions

### Component Patterns
- All components are `.astro` files unless they need client-side interactivity
- Use TypeScript interfaces for props in component frontmatter
- Use `class:list` for conditional Tailwind classes
- Progressive enhancement — pages work without JavaScript

### Styling
- Tailwind utility-first, custom colors via `@theme` directive (Tailwind 4)
- NO separate tailwind.config.js — everything in `global.css`
- Icons: inline SVG paths (no icon library dependency)

### Links
- Internal navigation: relative paths (`/contact`, `/#products`)
- External links: `target="_blank" rel="noopener noreferrer"`
- Scroll targets: `id="section-name"` + `scroll-mt-20` class

## Contentful CMS Integration

### Content Types

#### `page` — Generic pages
| Field | Type | Notes |
|-------|------|-------|
| `title` | Symbol | Page title |
| `slug` | Symbol | URL path, unique, kebab-case |
| `metaDescription` | Symbol | SEO meta description |
| `heroHeading` | Symbol | Optional hero heading |
| `heroImage` | Asset | Optional hero background |
| `body` | Rich Text | Main content |

#### `product` — Software products
| Field | Type | Notes |
|-------|------|-------|
| `name` | Symbol | e.g. "ZoneMaintenance" |
| `slug` | Symbol | URL path |
| `tagline` | Symbol | Short description |
| `description` | Rich Text | Full description |
| `icon` | Symbol | SVG path data |
| `features` | Array of Symbols | Feature bullet points |
| `category` | Symbol | `maintenance` or `status-suite` |
| `order` | Integer | Display order |

#### `newsArticle` — News/blog
| Field | Type | Notes |
|-------|------|-------|
| `title` | Symbol | Article title |
| `slug` | Symbol | URL path |
| `date` | Date | Publish date |
| `excerpt` | Symbol | Preview text |
| `body` | Rich Text | Article content |
| `featuredImage` | Asset | Hero/card image |
| `tags` | Array of Symbols | Categorisation |

### Build & Deploy
- **Static site** — Contentful changes require a rebuild
- **Local:** `pnpm build` fetches from Contentful Delivery API
- **Production:** Netlify build hook triggered by Contentful webhook
- **Graceful degradation:** Pages render empty states if Contentful is unconfigured

### Rich Text Rendering
`src/lib/rich-text.ts` converts Contentful Rich Text to HTML with EMI-branded Tailwind classes. Handles headings, lists, blockquotes, images, tables, and hyperlinks.

## Products (from current site)

### Maintenance Suite
1. **ZoneMaintenance** — Mobile equipment maintenance, safety/quality/efficiency
2. **RouteMaintenance** — Fixed plant periodic inspections, clearly defined methods

### Status Suite
3. **SafetyStatus** — Structured safety audits replacing paper checklists
4. **ComponentStatus** — Digital instructions for rebuilds/task processes
5. **EquipmentStatus** — Mobile equipment inspections, rental compliance, MDG15
6. **EnviroStatus** — Environmental audit data collection and monitoring

## Site Map

```
/                      → Homepage
/what-we-do            → About / services
/projects              → Case studies
/magnom                → Magnom Filtration
/contact               → Contact form
/software              → Maintenance suite overview
/software-status-suite → Status suite overview
/sensory-based-data    → Sensory data offering
/news                  → News/blog listing
/take-action           → Getting started CTA
/zonemaintenance       → Product detail
/routemaintenance      → Product detail
/componentstatus       → Product detail
/safetystatus          → Product detail
/privacy-policy        → Legal
/term-of-use           → Legal
```

## Reference Project

The OWR website at `/Users/colin/dev/tributech/owr-apps/owr-website` is the reference implementation. When in doubt about patterns, conventions, or architecture, consult that project. Key files to reference:
- `astro.config.mjs` — Astro + Tailwind 4 config
- `src/styles/global.css` — Tailwind theme pattern
- `src/lib/contentful.ts` — Contentful client pattern
- `src/lib/rich-text.ts` — Rich text renderer pattern
- `CLAUDE.md` — Documentation structure
