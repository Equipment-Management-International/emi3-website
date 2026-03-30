# Load .env variables into the current PowerShell session.
# Run this before launching Claude Code so MCP servers can access env vars.
#
# Usage: . .\load-env.ps1

$envFile = Join-Path $PSScriptRoot ".env"
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^([^#][^=]+)=(.*)$') {
            [Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim(), 'Process')
            Write-Host "  Set $($matches[1].Trim())" -ForegroundColor DarkGray
        }
    }
    Write-Host "Environment loaded from .env" -ForegroundColor Green
} else {
    Write-Host "No .env file found. Copy .env.example to .env and fill in values." -ForegroundColor Yellow
}
