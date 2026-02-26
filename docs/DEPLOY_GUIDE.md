# 🚀 Hướng Dẫn Deploy Website Đặc Sản Tây Bắc

## 🎯 Mục Tiêu
Deploy website lên GitHub Pages miễn phí. Hỗ trợ 2 phương thức:
- **Trực tiếp**: Push từ local lên GitHub → GitHub Pages tự động deploy
- **Qua GitLab CI/CD**: Push lên GitLab → CI/CD tự động mirror sang GitHub

## 🏗️ Kiến Trúc Deploy

### Phương thức 1: Push trực tiếp lên GitHub (Đang sử dụng)
```
👨‍💻 Local Development
    ↓ git push origin main
🌍 GitHub Public Repository
    ↓ GitHub Pages Auto Deploy
🚀 Live Website (2-5 phút)
```

### Phương thức 2: Qua GitLab CI/CD (Tùy chọn)
```
👨‍💻 Local Development
    ↓ git push gitlab main
🔒 GitLab Private Repository
    ↓ .gitlab-ci.yml → mirror
🌍 GitHub Public Repository
    ↓ GitHub Pages Auto Deploy
🚀 Live Website
```

## 🌐 Website URLs
| Trang | URL |
|-------|-----|
| **Website chính** | https://nguyenngocbinh.github.io/DACSANTAYBAC/ |
| **Admin Panel** | https://nguyenngocbinh.github.io/DACSANTAYBAC/admin/admin.html |
| **Mini Game** | https://nguyenngocbinh.github.io/DACSANTAYBAC/games.html |
| **GitHub Repo** | https://github.com/nguyenngocbinh/DACSANTAYBAC |

## 📋 Quy Trình Deploy

### Bước 1: Phát triển trên máy local
```bash
cd E:\project\DACSANTAYBAC

# Test với live-server (cần cài npm dependencies)
npm install
npm run dev

# Hoặc mở index.html trực tiếp trong trình duyệt
```

### Bước 2: Commit & Push
```bash
git add .
git commit -m "Mô tả thay đổi"
git push origin main
```

### Bước 3: Kiểm tra deployment
- GitHub Pages tự động deploy trong 2-5 phút
- Truy cập https://nguyenngocbinh.github.io/DACSANTAYBAC/ để kiểm tra

## 🔧 Cấu hình GitHub Pages
1. Vào https://github.com/nguyenngocbinh/DACSANTAYBAC/settings/pages
2. **Source**: Deploy from a branch
3. **Branch**: `main` / `/ (root)`
4. Click **Save**

## 📂 Files được deploy
| File | Mô tả |
|------|--------|
| `index.html` | Trang chủ |
| `js/script.js` | Logic trang chủ (sản phẩm, giỏ hàng, tìm kiếm) |
| `js/admin.js` | Logic admin panel (CRUD, Excel, xác thực SHA-256) |
| `js/voucher-integration.js` | Hệ thống voucher từ game |
| `js/game.js` | Mini game engine |
| `css/style.css` | CSS trang chủ + responsive |
| `css/admin.css` | CSS admin panel |
| `data/products.json` | Dữ liệu 24 sản phẩm (single source of truth) |
| `images/` | Hình ảnh sản phẩm (tên kebab-case) |

## 🔐 Bảo mật hiện tại
| Mục | Trạng thái | Ghi chú |
|-----|-----------|---------|
| Password admin | ✅ SHA-256 + salt | Không lưu plaintext trong code |
| Admin panel SEO | ✅ `noindex, nofollow` | Ẩn khỏi công cụ tìm kiếm |
| XSS protection | ✅ `escapeHtml()` | Sanitize tất cả đầu vào |
| Source code | ⚠️ Public | GitHub repo public, JS không minify |
| HTTPS | ✅ Mặc định | GitHub Pages tự cấp SSL |

## 🔄 Cấu hình GitLab CI/CD (Tùy chọn)

Nếu muốn dùng GitLab làm source backup:

### Thêm GitLab remote:
```bash
git remote add gitlab https://gitlab.com/nguyenngocbinh/DACSANTAYBAC.git
```

### Biến môi trường trên GitLab (Settings > CI/CD > Variables):
| Variable | Giá trị | Protected | Masked |
|----------|---------|-----------|--------|
| `GITHUB_TOKEN` | GitHub Personal Access Token | ✅ | ✅ |
| `GITLAB_PERSONAL_ACCESS_TOKEN` | GitLab PAT | ✅ | ✅ |

### File `.gitlab-ci.yml` (đã có sẵn trong repo):
```yaml
stages:
  - deploy

deploy_to_github:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache git
  script:
    - git clone --mirror https://oauth2:$GITLAB_PERSONAL_ACCESS_TOKEN@gitlab.com/nguyenngocbinh/DACSANTAYBAC.git
    - cd DACSANTAYBAC.git
    - git remote add github https://$GITHUB_TOKEN@github.com/nguyenngocbinh/DACSANTAYBAC.git
    - git push --mirror github
  only:
    - main
```

## ⚡ Quy Trình Cập Nhật Thường Ngày

### Cập nhật giá/sản phẩm (không cần code):
1. Truy cập Admin Panel → đăng nhập
2. Chỉnh sửa giá, thông tin, ảnh trực tiếp
3. Thay đổi lưu vào localStorage (tức thì trên trình duyệt đó)

### Cập nhật dữ liệu gốc (cần push code):
1. Sửa `data/products.json`
2. Cập nhật mảng `PRODUCTS_FALLBACK` trong `js/script.js` cho tương thích file:// protocol
3. `git add . && git commit -m "Update products" && git push origin main`

### Cập nhật giao diện/tính năng:
```bash
# Sửa HTML/CSS/JS → test local → push
git add .
git commit -m "Feature: mô tả thay đổi"
git push origin main
# Website tự cập nhật trong 2-5 phút
```

## 📊 Hiệu năng
- ✅ **Static website** — tải nhanh, không server-side rendering
- ✅ **GitHub CDN** — phân phối toàn cầu
- ✅ **99.9% uptime** — GitHub Pages reliability
- ✅ **HTTPS mặc định** — bảo mật kết nối
- ✅ **Chi phí $0** — hoàn toàn miễn phí

---
*Cập nhật: 26/02/2026*
