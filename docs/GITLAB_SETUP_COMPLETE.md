# 🚀 GitLab CI/CD Setup - Complete Guide

## 🎯 Mục Đích
**SINGLE WORKFLOW:** Chỉ duy nhất 1 luồng deploy:
1. **Developer:** Push code lên GitLab (private repository)
2. **GitLab CI:** Tự động build và minify production code
3. **GitHub Pages:** Tự động cập nhật website từ CI/CD

```
👨‍💻 Developer
    ↓ git push gitlab main
🔒 GitLab (Private Repository)
    ↓ GitLab CI/CD Pipeline
🏗️ Auto Build & Minify
    ↓ Auto Deploy  
🌍 GitHub Pages (Public Website)
```

## ⚡ Workflow Commands

### Cập nhật website (CHỈ CẦN 1 LỆNH):
```bash
git add .
git commit -m "Update content"
git push gitlab main
```

**Tất cả sẽ tự động:**
- ✅ GitLab CI build production code
- ✅ Minify và obfuscate JavaScript  
- ✅ Deploy lên GitHub Pages
- ✅ Website live trong 2-3 phút

## 🔧 Cấu Hình Biến Môi Trường

### Trên GitLab (Settings > CI/CD > Variables):

#### 1. GITHUB_TOKEN
- **Type:** Variable
- **Key:** `GITHUB_TOKEN`
- **Value:** GitHub Personal Access Token
- **Protected:** ✅ Yes
- **Masked:** ✅ Yes

#### 2. GITHUB_REPO
- **Type:** Variable  
- **Key:** `GITHUB_REPO`
- **Value:** `nguyenngocbinh/DACSANTAYBAC`
- **Protected:** ✅ Yes

## 🔐 Authentication Setup

### ⚠️ Vấn Đề: Authentication Failed

GitLab không còn hỗ trợ password authentication. Bạn cần sử dụng **Personal Access Token**.

### 🚀 Giải Pháp: Tạo GitLab Personal Access Token

#### Bước 1: Tạo Personal Access Token

1. **Truy cập GitLab:** https://gitlab.com/-/profile/personal_access_tokens
2. **Điền thông tin:**
   - **Token name:** `DACSANTAYBAC-deploy`
   - **Expiration date:** `2025-12-31` (hoặc không set)
   - **Scopes:** ✅ Chọn `read_repository`, `write_repository`

3. **Click "Create personal access token"**
4. **Copy token** (chỉ hiển thị 1 lần duy nhất!)

#### Bước 2: Cấu Hình Git Credentials

```bash
# Xóa credential cũ
git config --global --unset credential.helper

# Cấu hình mới với token
git remote set-url origin https://[YOUR_USERNAME]:[YOUR_TOKEN]@gitlab.com/nguyenngocbinh/DACSANTAYBAC.git

# Test
git push origin main
```

## 📊 Dual Repository Strategy

### 🔒 GitLab (PRIVATE) - Source Code Backup
- **URL:** https://gitlab.com/nguyenngocbinh/DACSANTAYBAC  
- **Chứa:** Toàn bộ mã nguồn gốc, không minified
- **Mục đích:** Backup an toàn, development
- **Quyền truy cập:** Private, chỉ owner

### 🌐 GitHub (PUBLIC) - Production Deployment  
- **URL:** https://github.com/nguyenngocbinh/DACSANTAYBAC
- **Chứa:** Mã nguồn đã minified, production ready
- **Mục đích:** GitHub Pages hosting
- **Quyền truy cập:** Public, SEO friendly

## 🚀 Commands để Push lên GitLab

```bash
# First time setup
git remote add gitlab https://gitlab.com/nguyenngocbinh/DACSANTAYBAC.git

# Push to GitLab (sẽ trigger CI/CD)
git push gitlab main
```

## 🛡️ Security Features

- All user data is stored locally in browser localStorage
- JavaScript files are minified and obfuscated
- Original source code is not included in public repository
- Admin credentials are encoded
- No personal information is transmitted to external servers

---
*Last updated: 08/08/2025*
