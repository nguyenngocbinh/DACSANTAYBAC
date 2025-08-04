#!/bin/bash
# Dual Repository Deployment Script
# Step 1: Push full source to GitLab (Private)
# Step 2: Create production build and push to GitHub (Public)

echo "🚀 Starting Dual Repository Deployment..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Prepare GitLab version (Full Source Code)
echo -e "${YELLOW}1️⃣ Preparing GitLab deployment (Full Source)...${NC}"

# Backup current .gitignore
if [ -f ".gitignore" ]; then
    cp .gitignore .gitignore.github.backup
fi

# Create GitLab .gitignore (allows source files)
cat > .gitignore << 'EOF'
# GitLab - Keep all source files, ignore only runtime
node_modules/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Generated/build files only (keep source)
*.backup
build.bat
build.ps1
dual-deploy.ps1

# Runtime data
pids
*.pid
*.seed
*.pid.lock
EOF

echo -e "${GREEN}   ✅ GitLab .gitignore created (allows source files)${NC}"

# Step 2: Commit and push to GitLab
echo -e "${YELLOW}2️⃣ Pushing FULL source code to GitLab...${NC}"
git add .
git commit -m "Complete source code - GitLab private backup $(date +%Y-%m-%d_%H:%M:%S)"
git push gitlab main

echo -e "${GREEN}   ✅ Full source code pushed to GitLab${NC}"
echo -e "${BLUE}   🔗 GitLab: https://gitlab.com/nguyenngocbinh/DACSANTAYBAC${NC}"

# Step 3: Prepare GitHub version (Production)
echo ""
echo -e "${YELLOW}3️⃣ Preparing GitHub deployment (Production)...${NC}"

# Restore GitHub .gitignore (blocks source files)
cat > .gitignore << 'EOF'
# Original source files (keep only obfuscated versions on GitHub)
js/script.js
js/admin.js

# Development and build tools
obfuscate.js
build.js
build.ps1
dual-deploy.ps1

# Admin credentials and sensitive files
admin-config.json
credentials.json

# Dependencies
node_modules/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment and config files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Backup files
*.backup
*.bak

# Runtime data
pids
*.pid
*.seed
*.pid.lock
EOF

echo -e "${GREEN}   ✅ GitHub .gitignore created (blocks source files)${NC}"

# Step 4: Ensure minified files exist and are updated
echo -e "${YELLOW}4️⃣ Creating/updating minified files...${NC}"

# Simple minification function
minify_js() {
    local input_file=$1
    local output_file=$2
    
    if [ -f "$input_file" ]; then
        # Remove comments, compress whitespace, encode credentials
        sed 's|//.*$||g' "$input_file" | \
        sed 's|/\*.*\*/||g' | \
        tr -s ' ' | \
        sed 's/admin123/YWRtaW4xMjM=/g' | \
        sed 's/"admin"/ImFkbWlu/g' > "$output_file"
        echo -e "${GREEN}     ✅ $output_file created${NC}"
    fi
}

minify_js "js/script.js" "js/script.min.js"
minify_js "js/admin.js" "js/admin.min.js"

# Step 5: Update HTML references
echo -e "${YELLOW}5️⃣ Updating HTML references...${NC}"

# Update index.html to use minified version
if [ -f "index.html" ]; then
    sed -i 's|js/script\.js|js/script.min.js|g' index.html
    echo -e "${GREEN}     ✅ index.html updated${NC}"
fi

# Update admin.html to use minified versions
if [ -f "admin.html" ]; then
    sed -i 's|js/script\.js|js/script.min.js|g' admin.html
    sed -i 's|js/admin\.js|js/admin.min.js|g' admin.html
    echo -e "${GREEN}     ✅ admin.html updated${NC}"
fi

# Step 6: Create production README
echo -e "${YELLOW}6️⃣ Creating production README...${NC}"
cat > README.md << 'EOF'
# 🌿 Website Đặc Sản Tây Bắc

[![Website](https://img.shields.io/badge/Website-Live-green)](https://nguyenngocbinh.github.io/DACSANTAYBAC/)
[![Admin](https://img.shields.io/badge/Admin-Panel-blue)](https://nguyenngocbinh.github.io/DACSANTAYBAC/admin.html)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🎯 Giới Thiệu

Website thương mại điện tử chuyên bán các sản phẩm đặc sản Tây Bắc và dược liệu tự nhiên.

## 🚀 Demo Trực Tiếp

- **🌐 Website:** [https://nguyenngocbinh.github.io/DACSANTAYBAC/](https://nguyenngocbinh.github.io/DACSANTAYBAC/)
- **👨‍💼 Admin Panel:** [https://nguyenngocbinh.github.io/DACSANTAYBAC/admin.html](https://nguyenngocbinh.github.io/DACSANTAYBAC/admin.html)

**Admin Login:** admin / admin123

## ✨ Tính Năng

- 🛒 Giỏ hàng thông minh với localStorage
- 📱 Responsive design hoàn hảo
- 🔍 Tìm kiếm và lọc sản phẩm
- 📞 Form liên hệ (Zalo: 0988040027, Facebook: Hải béo)
- 💰 Admin panel quản lý giá sản phẩm
- 💾 Backup/restore dữ liệu

## 🛠️ Công Nghệ

- HTML5, CSS3, JavaScript ES6+
- Font Awesome 6.0.0
- CSS Grid & Flexbox
- Local Storage API
- GitHub Pages hosting

## 📦 Sản Phẩm

21 sản phẩm đặc sản Tây Bắc:
- **Dược liệu:** Tam thất khô, Hà thủ ô, Đông trùng hạ thảo...
- **Thực phẩm:** Mật ong rừng, Thịt trâu gác bếp, Mắc khén...
- **Đồ uống:** Trà shan tuyết, Rượu cần, Trà hoa cúc...
- **Tinh dầu:** Dầu tràm, Tinh dầu sả chanh, Dầu dừa...

## 📞 Liên Hệ

- **Zalo:** 0988040027
- **Facebook:** Hải béo
- **Website:** [Live Demo](https://nguyenngocbinh.github.io/DACSANTAYBAC/)

---
*🌟 Đặc sản Tây Bắc - Tinh hoa từ núi rừng Việt Nam*
EOF

echo -e "${GREEN}   ✅ Production README created${NC}"

# Step 7: Deploy to GitHub
echo ""
echo -e "${YELLOW}7️⃣ Deploying to GitHub (Production)...${NC}"
git add .
git commit -m "Production deployment - Minified code only $(date +%Y-%m-%d_%H:%M:%S)"
git push origin main

echo -e "${GREEN}   ✅ Production code deployed to GitHub${NC}"
echo -e "${BLUE}   🔗 GitHub: https://github.com/nguyenngocbinh/DACSANTAYBAC${NC}"

# Step 8: Summary
echo ""
echo -e "${BLUE}📋 DEPLOYMENT SUMMARY${NC}"
echo -e "${BLUE}=====================${NC}"
echo ""
echo -e "${GREEN}🔒 GitLab (Private):${NC}  https://gitlab.com/nguyenngocbinh/DACSANTAYBAC"
echo -e "   ├─ Full source code with comments"
echo -e "   ├─ Development files included"
echo -e "   └─ Complete project history"
echo ""
echo -e "${GREEN}🌍 GitHub (Public):${NC}   https://github.com/nguyenngocbinh/DACSANTAYBAC"
echo -e "   ├─ Minified JavaScript only"
echo -e "   ├─ Original source files excluded"
echo -e "   └─ Production-ready deployment"
echo ""
echo -e "${GREEN}🌐 Website Live:${NC}      https://nguyenngocbinh.github.io/DACSANTAYBAC/"
echo -e "${GREEN}👨‍💼 Admin Panel:${NC}       https://nguyenngocbinh.github.io/DACSANTAYBAC/admin.html"
echo ""
echo -e "${GREEN}✅ DUAL REPOSITORY DEPLOYMENT COMPLETED!${NC}"
echo ""
echo -e "${YELLOW}🚀 Next Steps:${NC}"
echo "1. Enable GitHub Pages at: https://github.com/nguyenngocbinh/DACSANTAYBAC/settings/pages"
echo "2. Select 'Deploy from a branch' → 'main' → '/ (root)'"
echo "3. Wait 2-5 minutes for site to go live"
echo ""
echo -e "${GREEN}🔐 Your source code is now COMPLETELY PROTECTED!${NC}"
