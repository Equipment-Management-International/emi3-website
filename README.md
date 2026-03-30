# EMI Website — equipmentmanagement.com.au

Marketing website for [Equipment Management International](https://www.equipmentmanagement.com.au/) — digital work instruction software and maintenance solutions for Tier 1 and 2 mining operations across Australia.

Built with **Astro 5** + **Tailwind CSS 4** + **Contentful CMS**, hosted on **Netlify**.

## Prerequisites

### For content editing (Windows or macOS)

You need these installed to use Claude Desktop for managing website content:

| Software | Download | Why |
|----------|----------|-----|
| **Node.js 20 LTS** | [nodejs.org/en/download](https://nodejs.org/en/download) | Required — Claude Desktop's Contentful connection runs via `npx` |
| **Claude Desktop** | [claude.ai/download](https://claude.ai/download) | The AI assistant that manages your content |
| **Git** | [git-scm.com/downloads](https://git-scm.com/downloads) | Required — to clone and update the project |

### For development (additional)

| Software | Download | Why |
|----------|----------|-----|
| **Docker Desktop** | [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/) | Runs the local dev server on Windows without installing build tools |
| **pnpm** | [pnpm.io/installation](https://pnpm.io/installation) | Package manager (macOS native dev only) |

## Getting Started

### 1. Clone the repo and set up environment

```bash
git clone <repo-url>
cd emi3-website
```

Copy `.env.example` to `.env` and fill in the Contentful API tokens (get these from your developer or the Contentful dashboard).

### 2. Content editing with Claude Desktop

Claude Desktop connects to Contentful to create and manage news articles, blog posts, and other content. **Always launch it via the script** — this loads the API keys:

**macOS:**
```bash
./launch-claude.sh
```

**Windows (PowerShell):**
```powershell
.\launch-claude.ps1
```

> **Important:** Do not open Claude Desktop from the dock or Start Menu directly — the Contentful connection won't work without the launcher script.

### 3. Development server (optional — only for previewing site changes)

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

## Documentation

> **New to this project?** Start with the **[Content Management Guide](docs/content-guide.html)** — open it in your browser for a visual walkthrough of how everything fits together, how to write and publish content, and answers to common questions.

| Document | Audience | Description |
|----------|----------|-------------|
| **[`docs/content-guide.html`](docs/content-guide.html)** | **Content editors — READ THIS FIRST** | **Visual guide — architecture diagrams, workflows, FAQ** |
| [`CLAUDE.md`](CLAUDE.md) | Developers / Claude | Full technical reference — stack, conventions, Contentful schema |
| [`docs/project-plan.md`](docs/project-plan.md) | Project planning | Implementation phases and roadmap |

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
