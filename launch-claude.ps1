# Launch Claude Desktop with .env vars loaded.
# MCP servers (Contentful etc.) inherit these from the parent process.
#
# Usage: .\launch-claude.ps1

$envFile = Join-Path $PSScriptRoot ".env"
if (-not (Test-Path $envFile)) {
    Write-Host "No .env file found. Copy .env.example to .env and fill in values." -ForegroundColor Yellow
    exit 1
}

# Load all vars from .env
Get-Content $envFile | ForEach-Object {
    if ($_ -match '^([^#][^=]+)=(.*)$') {
        [Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim(), 'Process')
    }
}

# Contentful MCP expects SPACE_ID, our .env uses CONTENTFUL_SPACE_ID
[Environment]::SetEnvironmentVariable('SPACE_ID', $env:CONTENTFUL_SPACE_ID, 'Process')

Write-Host "Environment loaded from .env" -ForegroundColor Green
Write-Host "Launching Claude Desktop..." -ForegroundColor Green

# Launch Claude Desktop - it inherits this process's env
$claudePath = "$env:LOCALAPPDATA\Programs\Claude\Claude.exe"
if (Test-Path $claudePath) {
    Start-Process $claudePath
} else {
    Write-Host "Claude Desktop not found at $claudePath" -ForegroundColor Red
    Write-Host "Update the path in this script if installed elsewhere." -ForegroundColor Yellow
}
