const fs = require('fs');
const path = require('path');

console.log('🚀 Building project for GitHub deployment...\n');

// Step 1: Obfuscate JavaScript files
console.log('1️⃣ Obfuscating JavaScript files...');

function simpleObfuscate(code) {
    // Remove comments
    code = code.replace(/\/\*[\s\S]*?\*\//g, '');
    code = code.replace(/\/\/.*$/gm, '');
    
    // Remove unnecessary whitespace
    code = code.replace(/\s+/g, ' ');
    code = code.replace(/\s*([{}();,=+\-*/<>!&|])\s*/g, '$1');
    
    // Basic string obfuscation for sensitive data
    code = code.replace(/admin123/g, btoa('admin123'));
    code = code.replace(/admin/g, btoa('admin'));
    
    return code.trim();
}

// Obfuscate main script
const scriptPath = 'js/script.js';
if (fs.existsSync(scriptPath)) {
    const content = fs.readFileSync(scriptPath, 'utf8');
    const obfuscated = simpleObfuscate(content);
    fs.writeFileSync('js/script.min.js', obfuscated);
    console.log('   ✅ script.js -> script.min.js');
}

// Obfuscate admin script  
const adminPath = 'js/admin.js';
if (fs.existsSync(adminPath)) {
    const content = fs.readFileSync(adminPath, 'utf8');
    const obfuscated = simpleObfuscate(content);
    fs.writeFileSync('js/admin.min.js', obfuscated);
    console.log('   ✅ admin.js -> admin.min.js');
}

// Step 2: Update HTML files to use minified versions
console.log('\n2️⃣ Updating HTML files to use minified JavaScript...');

// Update index.html
let indexContent = fs.readFileSync('index.html', 'utf8');
indexContent = indexContent.replace('js/script.js', 'js/script.min.js');
fs.writeFileSync('index.html', indexContent);
console.log('   ✅ Updated index.html');

// Update admin.html
let adminContent = fs.readFileSync('admin/admin.html', 'utf8');
adminContent = adminContent.replace('js/admin.js', 'js/admin.min.js');
fs.writeFileSync('admin/admin.html', adminContent);
console.log('   ✅ Updated admin/admin.html');

// Step 3: Create production README
console.log('\n3️⃣ Creating production README...');

const productionReadme = `# 🌿 Website Đặc Sản Tây Bắc

## 📋 Giới Thiệu
Website bán hàng chuyên các sản phẩm đặc sản Tây Bắc và dược liệu tự nhiên.

## 🚀 Demo
- **Website:** [Live Demo](https://nguyenngocbinh.github.io/DACSANTAYBAC/)
- **Admin Panel:** [Admin Login](https://nguyenngocbinh.github.io/DACSANTAYBAC/admin/admin.html)

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
`;

fs.writeFileSync('README.md', productionReadme);
console.log('   ✅ Created production README.md');

// Step 4: Create security notice
console.log('\n4️⃣ Creating security documentation...');

const securityDoc = `# 🔐 Security & Privacy Policy

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
*Last updated: ${new Date().toLocaleDateString('vi-VN')}*
`;

fs.writeFileSync('SECURITY.md', securityDoc);
console.log('   ✅ Created SECURITY.md');

console.log('\n✅ Build completed successfully!');
console.log('\n📋 Next steps:');
console.log('   1. Review generated files');
console.log('   2. Test the website locally');
console.log('   3. Run: npm run deploy');
console.log('   4. Enable GitHub Pages in repository settings');
console.log('\n🔒 Original source files are excluded by .gitignore');
