# Safe theme push — preserves Shopify customizer changes
# Usage: ./push.ps1
# Run from inside the schwarze-beton folder.

$THEME = "201484534105"

Write-Host "Pulling live templates from Shopify..." -ForegroundColor Cyan
shopify theme pull --theme $THEME --only "templates/**"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Pull failed. Aborting push." -ForegroundColor Red
    exit 1
}

Write-Host "Pushing theme to Shopify..." -ForegroundColor Cyan
shopify theme push --theme $THEME
if ($LASTEXITCODE -ne 0) {
    Write-Host "Push failed." -ForegroundColor Red
    exit 1
}

Write-Host "Done." -ForegroundColor Green
