#!/usr/bin/env bash
# Launch Claude Desktop with .env vars loaded.
# MCP servers (Contentful etc.) inherit these from the parent process.
#
# Usage: ./launch-claude.sh

set -euo pipefail
cd "$(dirname "$0")"

if [ ! -f .env ]; then
  echo "No .env file found. Copy .env.example to .env and fill in values."
  exit 1
fi

# Load all vars from .env
set -a
source .env
set +a

# Contentful MCP expects SPACE_ID, our .env uses CONTENTFUL_SPACE_ID
export SPACE_ID="${CONTENTFUL_SPACE_ID}"

echo "Environment loaded from .env"
echo "Launching Claude Desktop..."

# Launch the binary directly so it inherits this shell's env
exec /Applications/Claude.app/Contents/MacOS/Claude
