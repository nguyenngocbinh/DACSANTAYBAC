# Dual Repository Sync Script
Write-Host "🚀 Starting Dual Repository Sync..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path ".git")) {
    Write-Host "❌ Not in a git repository!" -ForegroundColor Red
    exit 1
}

# Add all changes
Write-Host "📁 Adding all changes..." -ForegroundColor Yellow
git add .

# Check if there are changes to commit
$status = git status --porcelain
if (-not $status) {
    Write-Host "✅ No changes to commit" -ForegroundColor Green
    exit 0
}

# Commit with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "Auto sync: $timestamp"
Write-Host "💾 Committing: $commitMessage" -ForegroundColor Cyan
git commit -m $commitMessage

# Push to GitLab (private backup)
Write-Host "📤 Pushing to GitLab (private backup)..." -ForegroundColor Yellow
try {
    git push gitlab main
    Write-Host "✅ GitLab sync successful!" -ForegroundColor Green
} catch {
    Write-Host "❌ GitLab sync failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Push to GitHub (public production)
Write-Host "🌐 Pushing to GitHub (public production)..." -ForegroundColor Blue
try {
    git push origin main  
    Write-Host "✅ GitHub sync successful!" -ForegroundColor Green
} catch {
    Write-Host "❌ GitHub sync failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 Dual sync completed!" -ForegroundColor Green
Write-Host "🔒 GitLab: https://gitlab.com/nguyenngocbinh/DACSANTAYBAC" -ForegroundColor Cyan
Write-Host "🌐 GitHub: https://github.com/nguyenngocbinh/DACSANTAYBAC" -ForegroundColor Blue
Write-Host "🚀 Website: https://nguyenngocbinh.github.io/DACSANTAYBAC/" -ForegroundColor Magenta
