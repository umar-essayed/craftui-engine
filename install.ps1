# CraftUI Engine Universal Installer for Windows PowerShell
# Usage:
#   Local (current project):  irm https://raw.githubusercontent.com/umar-essayed/craftui-engine/main/install.ps1 | iex
#   Global (machine-wide):   & ([scriptblock]::Create((irm https://raw.githubusercontent.com/umar-essayed/craftui-engine/main/install.ps1))) -Global

param (
    [switch]$Global,
    [switch]$Local
)

$ErrorActionPreference = "Stop"
$RepoUrl = "https://github.com/umar-essayed/craftui-engine.git"
$IsGlobal = $Global.IsPresent

Write-Host ""
if ($IsGlobal) {
    Write-Host "🚀 Installing CraftUI Engine globally across your system..." -ForegroundColor Cyan
} else {
    Write-Host "🚀 Installing CraftUI Engine locally in current project..." -ForegroundColor Cyan
}

$TempDir = Join-Path $env:TEMP ("craftui_" + [System.Guid]::NewGuid().ToString().Substring(0,8))
New-Item -ItemType Directory -Path $TempDir -Force | Out-Null

try {
    git clone --depth 1 $RepoUrl $TempDir | Out-Null
} catch {
    Write-Host "❌ Failed to clone repository. Make sure git is installed." -ForegroundColor Red
    exit 1
}

if ($IsGlobal) {
    $TargetDir = Join-Path $env:USERPROFILE ".gemini\config\skills\craftui-engine"
    New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
    Copy-Item -Path (Join-Path $TempDir "SKILL.md") -Destination $TargetDir -Force
    Copy-Item -Path (Join-Path $TempDir "references") -Destination $TargetDir -Recurse -Force
    Copy-Item -Path (Join-Path $TempDir "templates") -Destination $TargetDir -Recurse -Force
    Copy-Item -Path (Join-Path $TempDir "snippets") -Destination $TargetDir -Recurse -Force

    Write-Host "✅ CraftUI Engine installed globally at: $TargetDir" -ForegroundColor Green
    Write-Host "⚡ Available across ALL projects for Google Antigravity & AI agents!" -ForegroundColor Green
} else {
    $CurrentDir = Get-Location
    $TargetDir = Join-Path $CurrentDir ".agents\skills\craftui-engine"
    New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
    Copy-Item -Path (Join-Path $TempDir "SKILL.md") -Destination $TargetDir -Force
    Copy-Item -Path (Join-Path $TempDir "references") -Destination $TargetDir -Recurse -Force
    Copy-Item -Path (Join-Path $TempDir "templates") -Destination $TargetDir -Recurse -Force
    Copy-Item -Path (Join-Path $TempDir "snippets") -Destination $TargetDir -Recurse -Force

    # Configure Cursor rules
    $CursorRulesDir = Join-Path $CurrentDir ".cursor\rules"
    New-Item -ItemType Directory -Path $CursorRulesDir -Force | Out-Null
    $CursorRuleContent = @"
---
description: CraftUI Engine B2B High-Density & De-AI refactoring protocol
globs: *.{tsx,jsx,vue,svelte,html,css,ts,js}
alwaysApply: false
---
When reviewing or writing frontend UI/UX, follow craftui-engine protocol:
1. No glowing box-shadows or neon decorations.
2. High density: compact table rows (38px) and tabular-nums.
3. Form rule: 4 vital fields upfront, accordion for extras.
4. Support 80mm thermal receipts and UTF-8 BOM (\uFEFF) on Arabic CSV.
"@
    Set-Content -Path (Join-Path $CursorRulesDir "craftui-engine.mdc") -Value $CursorRuleContent -Encoding UTF8

    Write-Host "✅ CraftUI Engine installed locally in: $TargetDir" -ForegroundColor Green
    Write-Host "⚡ Also configured .cursor\rules\craftui-engine.mdc for Cursor / Windsurf!" -ForegroundColor Green
}

Remove-Item -Path $TempDir -Recurse -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "🎉 Installation complete!" -ForegroundColor Cyan
Write-Host "👉 How to use in Antigravity: Ask your agent: 'Audit UI using craftui-engine' or 'Apply craftui-engine to refactor this view'" -ForegroundColor White
Write-Host ""
