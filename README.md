# 🌿 Website Đặc Sản Tây Bắc

[![Website](https://img.shields.io/badge/Website-Live-green)](https://nguyenngocbinh.github.io/DACSANTAYBAC/)
[![Admin](https://img.shields.io/badge/Admin-Panel-blue)](https://nguyenngocbinh.github.io/DACSANTAYBAC/admin/admin.html)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🎯 Giới Thiệu

Website thương mại điện tử chuyên bán các sản phẩm đặc sản Tây Bắc và dược liệu tự nhiên. Được xây dựng với HTML5, CSS3, và JavaScript thuần, tối ưu cho SEO và tốc độ.

## 🚀 Demo Trực Tiếp

- **🌐 Website Chính:** [https://nguyenngocbinh.github.io/DACSANTAYBAC/](https://nguyenngocbinh.github.io/DACSANTAYBAC/)
- **👨‍💼 Admin Panel:** [https://nguyenngocbinh.github.io/DACSANTAYBAC/admin/admin.html](https://nguyenngocbinh.github.io/DACSANTAYBAC/admin/admin.html)

## ✨ Tính Năng
- 🛒 Giỏ hàng thông minh với localStorage
- 📱 Responsive design + hamburger menu
- 🔍 Tìm kiếm realtime và lọc theo danh mục
- 📞 Liên hệ & đặt hàng qua Zalo
- 💰 Admin quản lý sản phẩm (giá, mô tả, ảnh)
- 📊 Export/Import Excel sản phẩm
- 🎮 Mini game tích voucher giảm giá
- 🔒 Xác thực admin SHA-256
- 🌐 SEO tối ưu (Open Graph, JSON-LD, meta tags)
- 🖼️ Hình ảnh lazy loading

## 🛠️ Công Nghệ
- HTML5, CSS3, JavaScript ES6+ (Vanilla, không framework)
- Font Awesome 6.0.0
- SheetJS (xlsx) cho Excel import/export
- Web Crypto API (SHA-256 password hashing)
- Responsive CSS Grid + Flexbox
- localStorage API

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

## 📁 Cấu trúc dự án
```
├── index.html              # Trang chủ website
├── game.html               # Mini game tích voucher
├── pikachu.html             # Game Pikachu
├── data/
│   └── products.json       # Nguồn dữ liệu sản phẩm (single source of truth)
├── css/
│   ├── style.css           # CSS trang chủ
│   ├── admin.css           # CSS admin panel
│   ├── game.css            # CSS mini game
│   └── pikachu.css         # CSS game Pikachu
├── js/
│   ├── script.js           # Logic trang chủ (sản phẩm, giỏ hàng, tìm kiếm)
│   ├── admin.js            # Logic admin panel (CRUD, Excel, xác thực)
│   ├── voucher-integration.js  # Hệ thống voucher từ game
│   ├── game.js             # Logic mini game
│   └── pikachu.js          # Logic game Pikachu
├── images/                 # Hình ảnh sản phẩm (kebab-case)
├── admin/
│   ├── admin.html          # Trang quản trị sản phẩm
│   ├── password-changer.html
│   └── gitlab-token-setup.html
├── docs/                   # Tài liệu và hướng dẫn
│   ├── ADMIN_GUIDE.md
│   ├── QUICK_EDIT_GUIDE.md
│   ├── PASSWORD_CHANGE_GUIDE.md
│   ├── DEPLOY_GUIDE.md
│   └── GITLAB_SETUP_COMPLETE.md
└── tools/                  # Build tools và scripts
    ├── build.js
    ├── build.bat
    └── test-ci-local.ps1
```

## 🔗 Liên kết nhanh
- [📚 Tài liệu hướng dẫn](docs/)
- [👨‍💼 Admin Panel](admin/)
- [🛠️ Build Tools](tools/)

---
*🌟 Đặc sản Tây Bắc - Tinh hoa từ núi rừng Việt Nam*
