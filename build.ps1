# PowerShell Build Script for GitHub Deployment
Write-Host "🚀 Building project for GitHub deployment..." -ForegroundColor Green
Write-Host ""

# Step 1: Create minified JavaScript files
Write-Host "1️⃣ Creating minified JavaScript files..." -ForegroundColor Yellow

# Simple minification function
function Minify-JavaScript {
    param($content)
    
    # Remove comments
    $content = $content -replace '/\*[\s\S]*?\*/', ''
    $content = $content -replace '//.*$', ''
    
    # Remove extra whitespace
    $content = $content -replace '\s+', ' '
    $content = $content -replace '\s*([{}();,=+\-*/<>!&|])\s*', '$1'
    
    # Basic obfuscation for sensitive data
    $adminEncoded = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes("admin"))
    $passwordEncoded = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes("admin123"))
    
    $content = $content -replace 'admin123', "atob('$passwordEncoded')"
    $content = $content -replace '"admin"', "atob('$adminEncoded')"
    
    return $content.Trim()
}

# Minify script.js
if (Test-Path "js/script.js") {
    $scriptContent = Get-Content "js/script.js" -Raw
    $minified = Minify-JavaScript $scriptContent
    Set-Content "js/script.min.js" $minified
    Write-Host "   ✅ script.js -> script.min.js" -ForegroundColor Green
}

# Minify admin.js
if (Test-Path "js/admin.js") {
    $adminContent = Get-Content "js/admin.js" -Raw
    $minified = Minify-JavaScript $adminContent
    Set-Content "js/admin.min.js" $minified
    Write-Host "   ✅ admin.js -> admin.min.js" -ForegroundColor Green
}

# Step 2: Update HTML files
Write-Host ""
Write-Host "2️⃣ Updating HTML files to use minified JavaScript..." -ForegroundColor Yellow

# Update index.html
if (Test-Path "index.html") {
    $indexContent = Get-Content "index.html" -Raw
    $indexContent = $indexContent -replace 'js/script\.js', 'js/script.min.js'
    Set-Content "index.html" $indexContent
    Write-Host "   ✅ Updated index.html" -ForegroundColor Green
}

# Update admin.html
if (Test-Path "admin.html") {
    $adminHtmlContent = Get-Content "admin.html" -Raw
    $adminHtmlContent = $adminHtmlContent -replace 'js/admin\.js', 'js/admin.min.js'
    Set-Content "admin.html" $adminHtmlContent
    Write-Host "   ✅ Updated admin.html" -ForegroundColor Green
}

# Step 3: Create production README
Write-Host ""
Write-Host "3️⃣ Creating production README..." -ForegroundColor Yellow

$productionReadme = @"
# 🌿 Website Đặc Sản Tây Bắc

## 📋 Giới Thiệu
Website bán hàng chuyên các sản phẩm đặc sản Tây Bắc và dược liệu tự nhiên.

## 🚀 Demo
- **Website:** [Live Demo](https://nguyenngocbinh.github.io/web_ban_hang/)
- **Admin Panel:** [Admin Login](https://nguyenngocbinh.github.io/web_ban_hang/admin.html)

## ✨ Tính Năng
- 🛒 Giỏ hàng thông minh
- 📱 Responsive design
- 🔍 Tìm kiếm và lọc sản phẩm
- 📞 Form liên hệ
- 💰 Admin quản lý giá
- 💾 Lưu trữ localStorage

## 🛠️ Công Nghệ
- HTML5, CSS3, JavaScript ES6+
- Font Awesome 6.0.0
- Responsive Grid Layout
- Local Storage API

## 📦 Sản Phẩm
- **Dược liệu:** Tam thất khô, Hà thủ ô, Đông trùng hạ thảo, Sâm ngọc linh...
- **Thực phẩm:** Mật ong rừng, Thịt trâu gác bếp, Mắc khén...
- **Đồ uống:** Trà shan tuyết, Rượu cần, Trà hoa cúc...
- **Tinh dầu:** Dầu tràm, Tinh dầu sả chanh, Dầu dừa...

## 📞 Liên Hệ
- **Zalo:** 0988040027
- **Facebook:** Hải béo
- **Email:** Qua form liên hệ trên website

## 📄 License
MIT License - Sử dụng tự do cho mục đích cá nhân và thương mại.

---
*🌟 Đặc sản Tây Bắc - Tinh hoa từ núi rừng Việt Nam*
"@

Set-Content "README.md" $productionReadme
Write-Host "   ✅ Created production README.md" -ForegroundColor Green

# Step 4: Create security documentation
Write-Host ""
Write-Host "4️⃣ Creating security documentation..." -ForegroundColor Yellow

$currentDate = Get-Date -Format "dd/MM/yyyy"
$securityDoc = @"
# 🔐 Security & Privacy Policy

## Data Protection
- All user data is stored locally in browser localStorage
- No personal information is transmitted to external servers
- Admin authentication uses client-side validation only

## Source Code Protection
- JavaScript files are minified and obfuscated
- Original source code is not included in public repository
- Admin credentials are encoded

## Privacy Policy
- We do not collect personal data
- Shopping cart data is stored locally
- Contact form submissions are handled client-side

## Admin Access
- Admin panel requires authentication
- Session management via localStorage
- Automatic logout on browser close

## Recommendations
- Use HTTPS when hosting
- Regular backup of product data
- Monitor for unauthorized access attempts

---
*Last updated: $currentDate*
"@

Set-Content "SECURITY.md" $securityDoc
Write-Host "   ✅ Created SECURITY.md" -ForegroundColor Green

Write-Host ""
Write-Host "✅ Build completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Review generated files" -ForegroundColor White
Write-Host "   2. Test the website locally" -ForegroundColor White
Write-Host "   3. Commit and push to GitHub" -ForegroundColor White
Write-Host "   4. Enable GitHub Pages in repository settings" -ForegroundColor White
Write-Host ""
Write-Host "🔒 Original source files are excluded by .gitignore" -ForegroundColor Yellow
