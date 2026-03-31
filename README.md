# EMI Website — equipmentmanagement.com.au

Marketing website for [Equipment Management International](https://www.equipmentmanagement.com.au/) — digital work instruction software and maintenance solutions for Tier 1 and 2 mining operations across Australia.

Built with **Astro 5** + **Tailwind CSS 4** + **Contentful CMS**, hosted on **Netlify**.

## Prerequisites

### For content editing (Windows or macOS)

You need these installed to use Claude Desktop for managing website content:

| Software | Download | Why |
|----------|----------|-----|
| **Node.js 20 LTS** | [nodejs.org/en/download](https://nodejs.org/en/download) | Required — Claude Desktop's Contentful connection runs via `npx` |
| **Claude Desktop** | [claude.ai/download](https://claude.ai/download) | The AI assistant that manages your content (Pro subscription or above recommended) |
| **Git** | [git-scm.com/downloads](https://git-scm.com/downloads) | Required — to clone and update the project |

### For development (additional)

| Software | Download | Why |
|----------|----------|-----|
| **Docker Desktop** | [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/) | Runs the local dev server on Windows without installing build tools |
| **pnpm** | [pnpm.io/installation](https://pnpm.io/installation) | Package manager (macOS native dev only) |

## Windows Setup (Step by Step)

If you're setting up on Windows for the first time, follow these steps in order.

### 1. Install Git for Windows

1. Download from [git-scm.com/downloads/win](https://git-scm.com/downloads/win)
2. Run the installer — **accept all defaults** (this includes Git Credential Manager, which handles GitHub login)
3. When done, open **PowerShell** (search for it in the Start Menu)
4. Verify it works:
   ```powershell
   git --version
   ```

### 2. Install Node.js

1. Download the **LTS** version from [nodejs.org/en/download](https://nodejs.org/en/download)
2. Run the installer — accept all defaults
3. Restart PowerShell, then verify:
   ```powershell
   node --version
   ```

### 3. Install Claude Desktop

1. Download from [claude.ai/download](https://claude.ai/download)
2. Install and sign in with your Anthropic account (Pro subscription or above recommended)
3. **Do not open it yet** — you'll launch it via the script in step 5

### 4. Clone the project and set up your environment

In PowerShell, navigate to where you want the project folder, then:

```powershell
git clone https://github.com/Equipment-Management-International/emi3-website.git
cd emi3-website
```

> **First time cloning?** A browser window will open asking you to sign in to GitHub. Sign in and authorize — Git Credential Manager saves your login so you won't need to do this again. No SSH keys needed.

Now set up your environment file:

```powershell
Copy-Item .env.example .env
```

Open `.env` in Notepad and fill in the Contentful API tokens (get these from your developer):

```powershell
notepad .env
```

### 5. Launch Claude Desktop

**Always use the launcher script** — it loads your API keys so Claude can connect to Contentful:

```powershell
.\launch-claude.ps1
```

> **Important:** Do not open Claude Desktop from the Start Menu directly — the Contentful connection won't work without the launcher script.

You're ready to go! Open the [Content Management Guide](docs/content-guide.html) in your browser for a walkthrough of how to create and publish content.

## macOS Setup

```bash
# Install dependencies (requires Homebrew)
brew install node pnpm git

# Clone and set up
git clone https://github.com/Equipment-Management-International/emi3-website.git
cd emi3-website
cp .env.example .env   # Fill in Contentful tokens

# Launch Claude Desktop for content editing
./launch-claude.sh

# Or run the dev server
set -a; source .env; set +a
pnpm dev   # http://localhost:4321
```

## Development Server (optional — only for previewing site changes)

**Windows (Docker):**

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```powershell
docker compose up
```

**macOS:**
```bash
set -a; source .env; set +a
pnpm dev
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
