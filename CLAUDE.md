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
├── Dockerfile.dev       # Dev container (Node 20 + pnpm)
├── docker-compose.yml   # One-command dev server for Windows
├── launch-claude.sh     # macOS: launch Claude Desktop with env vars
├── launch-claude.ps1    # Windows: launch Claude Desktop with env vars
├── load-env.ps1         # PowerShell helper to load .env for MCP
├── docs/
│   └── content-guide.html  # Non-technical content management guide
├── src/
│   ├── components/          # Astro components (.astro files)
│   │   ├── Nav.astro        # Mega-menu nav with mobile slide-out
│   │   ├── Footer.astro     # Dark footer with gold accent
│   │   ├── HeroSection.astro        # Homepage hero with glass panels
│   │   ├── PageHero.astro           # Reusable inner-page hero (image + glass text)
│   │   ├── QuoteBlock.astro         # Branded gold-border blockquote
│   │   ├── StatCard.astro           # Big number metric display
│   │   ├── CTABanner.astro          # Dark CTA section with dual buttons
│   │   ├── ValueProp.astro          # Benefit cards + testimonial
│   │   ├── ProductGrid.astro        # 6 software product cards
│   │   ├── ProcessSteps.astro       # 4-step getting started
│   │   ├── Specialisations.astro    # Capabilities checklist
│   │   └── CTASection.astro         # Homepage closing CTA
│   ├── lib/
│   │   ├── contentful.ts    # Contentful SDK client (returns null if unconfigured)
│   │   ├── contentful-types.ts  # TypeScript interfaces for content types
│   │   └── rich-text.ts     # Rich text → HTML renderer with EMI Tailwind classes
│   ├── layouts/
│   │   └── Layout.astro     # Base HTML layout (meta, OG tags, GA, JSON-LD)
│   ├── pages/
│   │   ├── index.astro      # Homepage
│   │   ├── contact.astro    # Contact form (Netlify Forms)
│   │   ├── news/
│   │   │   ├── index.astro  # News listing with tag filter
│   │   │   └── [slug].astro # Individual news article
│   │   ├── zonemaintenance.astro    # Product detail pages
│   │   ├── routemaintenance.astro
│   │   ├── safetystatus.astro
│   │   ├── componentstatus.astro
│   │   ├── software.astro           # Suite overviews
│   │   ├── software-status-suite.astro
│   │   ├── what-we-do.astro         # Company / approach
│   │   ├── projects.astro
│   │   ├── sensory-based-data.astro
│   │   ├── magnom.astro
│   │   ├── take-action.astro
│   │   ├── privacy-policy.astro
│   │   ├── term-of-use.astro
│   │   └── [...slug].astro  # Dynamic Contentful pages
│   └── styles/
│       └── global.css       # Tailwind + DaisyUI theme (@theme + @plugin)
```

## Development Setup

### macOS (native)

```bash
# Load environment variables (required before dev/build)
set -a; source .env; set +a

pnpm dev       # Astro dev server at http://localhost:4321
pnpm build     # Production build to dist/
pnpm preview   # Preview production build locally
```

### Windows (Docker)

Prerequisites: [Docker Desktop for Windows](https://docs.docker.com/desktop/setup/install/windows-install/), [Node.js 20 LTS](https://nodejs.org/) (for MCP tools)

```powershell
# First time (or after dependency changes):
docker compose build

# Start development server:
docker compose up

# Open http://localhost:4321 in your browser
# Edit files normally — changes appear automatically

# Stop:
docker compose down
```

### Launching Claude Desktop

Claude Desktop needs environment variables (API keys) to connect to Contentful. **Do not open Claude Desktop from the dock/Start Menu** — use the launcher scripts instead:

```bash
# macOS
./launch-claude.sh

# Windows (PowerShell)
.\launch-claude.ps1
```

These scripts load `.env` into the process environment, then launch Claude Desktop. The Contentful MCP server inherits the tokens from the parent process. The `.mcp.json` file uses `${CONTENTFUL_MANAGEMENT_ACCESS_TOKEN}` and `${CONTENTFUL_SPACE_ID}` references that resolve from these env vars.

### Environment Variables

The `.env` file uses plain `KEY=VALUE` format (no `export` prefix).

- **macOS**: Run `set -a; source .env; set +a` to load into your shell
- **Windows/Docker**: `docker-compose.yml` loads `.env` automatically
- **Claude Desktop**: Use `launch-claude.sh` (Mac) or `launch-claude.ps1` (Windows)

Create your `.env` from `.env.example` and fill in the Contentful tokens.

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

### UI Component Library
- **DaisyUI 5** — installed as Tailwind CSS 4 plugin (`@plugin "daisyui"` in global.css)
- Custom `emi` theme defined via `@plugin "daisyui/theme"` with gold primary, dark neutral
- Key DaisyUI components used: `navbar`, `btn`, `card`, `badge`, `stat`, `footer`, `dropdown`

### Typography
- **Primary font:** Inter (Google Fonts)
- **Section headings:** `.section-heading` class (30/36px, bold, no uppercase)
- **Subheadings:** `.section-subheading` class (20px, semibold)
- **Body text:** `.prose-body` class (17px, generous line-height)
- Minimum text size: 15px (never use `text-sm` for body content)
- Custom CSS classes defined in Layout.astro `<style is:global>` block (not global.css, to survive Tailwind 4's CSS pipeline)

### Design Patterns
- **Sections:** Only 3 backgrounds: `bg-base-100` (white), `bg-base-200` (light gray), `bg-neutral text-neutral-content` (dark)
- **Section spacing:** `py-16 sm:py-24`
- **Content containers:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Hero sections:** `PageHero` component with background image + `glass-panel` text overlay
- **Glass panels:** `.glass-panel` (dark frosted) and `.glass-panel-light` (light frosted) for text over images
- **Cards:** DaisyUI `card bg-base-100` with `card-body`
- **Buttons:** `btn btn-primary` (gold), `btn btn-outline btn-primary` (outline), `btn-lg` for main CTAs
- **Fixed nav:** Mega-menu with 5 top-level items, glass backdrop, slide-out mobile menu
- **Footer:** Dark `bg-neutral` with gold accent bar
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

## Content Management via Claude Desktop

Non-technical users (Russell) can manage content through Claude Desktop. See `docs/content-guide.html` for the full user-facing guide.

### What Goes Where
- **Contentful:** Repeatable structured content — news articles, blog posts, testimonials, product features. Created/edited via Claude Desktop or the Contentful web UI.
- **Astro code:** Layouts, navigation, footer, one-off pages, static assets. Changed via Claude Desktop (code edits) or a developer.

### Content Authoring Workflow
1. Launch Claude Desktop via `./launch-claude.sh` or `.\launch-claude.ps1`
2. Ask Claude to create/edit content in plain English
3. Content is created as a **draft** in Contentful
4. Review in Contentful web UI or ask Claude to show it
5. Publish when ready — triggers automatic Netlify rebuild (1-3 min)

### Image Uploads
- **Web images:** Give Claude the URL — it uploads directly to Contentful via the Management API
- **Local images:** Upload via Contentful web UI (drag & drop in Media section), then tell Claude to attach it

### Contentful MCP Configuration
The `.mcp.json` file configures the Contentful MCP server. It uses `${CONTENTFUL_MANAGEMENT_ACCESS_TOKEN}` and `${CONTENTFUL_SPACE_ID}` env var references — these resolve from the process environment set by the launcher scripts. Non-secret config (`ENVIRONMENT_ID`, `CONTENTFUL_HOST`) is hardcoded in `.mcp.json`.

## Reference Project

The OWR website at `/Users/colin/dev/tributech/owr-apps/owr-website` is the reference implementation. When in doubt about patterns, conventions, or architecture, consult that project. Key files to reference:
- `astro.config.mjs` — Astro + Tailwind 4 config
- `src/styles/global.css` — Tailwind theme pattern
- `src/lib/contentful.ts` — Contentful client pattern
- `src/lib/rich-text.ts` — Rich text renderer pattern
- `CLAUDE.md` — Documentation structure
