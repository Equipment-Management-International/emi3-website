# EMI Website — equipmentmanagement.com.au

Marketing website for [Equipment Management International](https://www.equipmentmanagement.com.au/) — digital work instruction software and maintenance solutions for Tier 1 and 2 mining operations across Australia.

Built with **Astro 5** + **Tailwind CSS 4** + **Contentful CMS**, hosted on **Netlify**.

## Quick Start

### Development Server

**macOS:**
```bash
set -a; source .env; set +a
pnpm dev
```

**Windows (Docker):**
```powershell
docker compose up
```

Open http://localhost:4321

### Content Editing with Claude Desktop

Claude Desktop connects to Contentful to create and manage news articles, blog posts, and other content. It needs API keys loaded first:

**macOS:**
```bash
./launch-claude.sh
```

**Windows:**
```powershell
.\launch-claude.ps1
```

> Do not open Claude Desktop from the dock/Start Menu directly — the Contentful connection won't work without the launcher.

## Documentation

| Document | Audience | Description |
|----------|----------|-------------|
| [`CLAUDE.md`](CLAUDE.md) | Developers / Claude | Full technical reference — stack, architecture, conventions, Contentful schema |
| [`docs/content-guide.html`](docs/content-guide.html) | Content editors | Visual guide to managing content — architecture diagrams, workflows, FAQ |
| [`docs/project-plan.md`](docs/project-plan.md) | Project planning | Implementation phases and roadmap |

## Environment Setup

1. Copy `.env.example` to `.env`
2. Fill in the Contentful API tokens (get from your developer or Contentful dashboard)
3. Run `pnpm install` (macOS) or `docker compose build` (Windows)

## Architecture

```
Contentful (CMS)  ──→  Astro (builds static HTML)  ──→  Netlify (hosts)
     ↑                                                        ↑
Claude Desktop ─────── creates/edits content ─────── webhook triggers rebuild
```

- **Contentful** stores repeatable structured content (news, blog posts, products)
- **Astro** builds the static site at deploy time, fetching content from Contentful
- **Netlify** hosts the built HTML and auto-rebuilds on Contentful publish or Git push
- **Claude Desktop** lets non-technical users author and manage content via plain English
