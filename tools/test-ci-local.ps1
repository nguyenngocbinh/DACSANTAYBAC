# Test GitLab CI/CD Pipeline Locally
# Script to simulate GitLab CI build process

Write-Host "🧪 Testing GitLab CI/CD Pipeline Locally..." -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Create production directory
Write-Host "1️⃣ Creating production directory..." -ForegroundColor Yellow
if (Test-Path "production") {
    Remove-Item "production" -Recurse -Force
}
New-Item -ItemType Directory -Path "production" | Out-Null

# Copy all files to production
Write-Host "2️⃣ Copying files to production..." -ForegroundColor Yellow
Copy-Item -Path "*" -Destination "production" -Recurse -Force -Exclude @("production", ".git")

Set-Location "production"

# Remove development files (simulate CI cleanup)
Write-Host "3️⃣ Removing development files..." -ForegroundColor Yellow
$devFiles = @(
    ".gitlab-ci.yml",
    "test-ci-local.ps1",
    "admin/gitlab-token-setup.html", 
    "docs/GITLAB_AUTH_FIX.md",
    "docs/GITLAB_CI_SETUP.md",
    "*-backup.*"
)

foreach ($pattern in $devFiles) {
    Get-ChildItem -Path $pattern -ErrorAction SilentlyContinue | Remove-Item -Force
    Write-Host "   ✅ Removed: $pattern" -ForegroundColor Green
}

# Create production .gitignore
Write-Host "4️⃣ Creating production .gitignore..." -ForegroundColor Yellow
$productionGitignore = @"
# Production deployment - clean build
node_modules/
*.log
.env
.DS_Store
Thumbs.db
production/
tools/test-ci-local.ps1
admin/gitlab-token-setup.html
docs/GITLAB_AUTH_FIX.md
docs/GITLAB_CI_SETUP.md
"@

Set-Content ".gitignore" $productionGitignore
Write-Host "   ✅ Production .gitignore created" -ForegroundColor Green

# Minify JavaScript files
Write-Host "5️⃣ Processing JavaScript files..." -ForegroundColor Yellow

if (Test-Path "js/script.js") {
    Write-Host "   📦 Minifying script.js..." -ForegroundColor Cyan
    $scriptContent = Get-Content "js/script.js" -Raw
    
    # Simple minification - remove comments and extra spaces
    $minified = $scriptContent -replace '/\*[\s\S]*?\*/', '' -replace '//.*', '' -replace '\s+', ' '
    
    # Obfuscate admin credentials
    $adminB64 = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes("admin"))
    $passB64 = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes("admin123"))
    $minified = $minified -replace '"admin"', "atob('$adminB64')" -replace '"admin123"', "atob('$passB64')"
    
    Set-Content "js/script.min.js" $minified.Trim()
    Write-Host "   ✅ script.min.js created (obfuscated)" -ForegroundColor Green
}

if (Test-Path "js/admin.js") {
    Write-Host "   📦 Minifying admin.js..." -ForegroundColor Cyan
    $adminContent = Get-Content "js/admin.js" -Raw
    
    # Simple minification
    $minified = $adminContent -replace '/\*[\s\S]*?\*/', '' -replace '//.*', '' -replace '\s+', ' '
    
    # Obfuscate admin credentials
    $adminB64 = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes("admin"))
    $passB64 = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes("admin123"))
    $minified = $minified -replace '"admin"', "atob('$adminB64')" -replace '"admin123"', "atob('$passB64')"
    
    Set-Content "js/admin.min.js" $minified.Trim()
    Write-Host "   ✅ admin.min.js created (obfuscated)" -ForegroundColor Green
}

# Update HTML files to use minified versions
Write-Host "6️⃣ Updating HTML references..." -ForegroundColor Yellow

if (Test-Path "index.html") {
    $indexContent = Get-Content "index.html" -Raw
    $indexContent = $indexContent -replace 'js/script\.js', 'js/script.min.js'
    Set-Content "index.html" $indexContent
    Write-Host "   ✅ index.html updated to use minified JS" -ForegroundColor Green
}

if (Test-Path "admin/admin.html") {
    $adminHtmlContent = Get-Content "admin/admin.html" -Raw
    $adminHtmlContent = $adminHtmlContent -replace 'js/script\.js', 'js/script.min.js'
    $adminHtmlContent = $adminHtmlContent -replace 'js/admin\.js', 'js/admin.min.js'
    Set-Content "admin/admin.html" $adminHtmlContent
    Write-Host "   ✅ admin/admin.html updated to use minified JS" -ForegroundColor Green
}

# Create deployment info
Write-Host "7️⃣ Creating deployment info..." -ForegroundColor Yellow
$deploymentInfo = @"
🚀 DACSANTAYBAC - Production Deployment (LOCAL TEST)
===================================================

📅 Build Date: $(Get-Date)
🔧 Built by: Local CI Test
📦 Build ID: LOCAL-$(Get-Random)
🌿 Source Branch: main
📝 Commit: LOCAL-TEST

🔒 Security Features:
- Admin credentials obfuscated with Base64
- Development files removed  
- Source code minified
- Clean production build

🌐 Live Website: https://nguyenngocbinh.github.io/DACSANTAYBAC/
👨‍💼 Admin Panel: https://nguyenngocbinh.github.io/DACSANTAYBAC/admin/admin.html

Repository Strategy:
📚 GitLab (Private): Full source code with comments
🌍 GitHub (Public): Minified production code
"@

Set-Content "DEPLOYMENT_INFO.txt" $deploymentInfo
Write-Host "   ✅ DEPLOYMENT_INFO.txt created" -ForegroundColor Green

# Show final structure
Write-Host ""
Write-Host "8️⃣ Production build completed! File structure:" -ForegroundColor Yellow
Get-ChildItem -Recurse | Where-Object { !$_.PSIsContainer } | ForEach-Object {
    $relativePath = $_.FullName.Replace((Get-Location).Path, "").TrimStart("\")
    Write-Host "   📄 $relativePath" -ForegroundColor White
}

Write-Host ""
Write-Host "📋 BUILD SUMMARY" -ForegroundColor Cyan
Write-Host "================" -ForegroundColor Cyan
Write-Host "✅ Development files removed" -ForegroundColor Green
Write-Host "✅ JavaScript files minified and obfuscated" -ForegroundColor Green  
Write-Host "✅ HTML files updated to use minified JS" -ForegroundColor Green
Write-Host "✅ Production .gitignore created" -ForegroundColor Green
Write-Host "✅ Deployment info generated" -ForegroundColor Green

Write-Host ""
Write-Host "🚀 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Review production/ folder content" -ForegroundColor White
Write-Host "2. Test the files locally if needed" -ForegroundColor White  
Write-Host "3. Push to GitLab to trigger real CI/CD pipeline" -ForegroundColor White

Write-Host ""
Write-Host "🎯 This simulates exactly what GitLab CI will do!" -ForegroundColor Green

Set-Location ".."
