# GitLab CI/CD - Single Source of Truth
# Luồng duy nhất: GitLab → CI/CD → GitHub Pages

## 🎯 Mục Đích
**SINGLE WORKFLOW:** Chỉ duy nhất 1 luồng deploy:
1. **Developer:** Push code lên GitLab (private repository)
2. **GitLab CI:** Tự động build và minify production code
3. **GitHub Pages:** Tự động cập nhật website từ CI/CD

✅ **NO MORE DUAL SCRIPTS!** Không còn dual-deploy.ps1, dual-sync.ps1, github-only-deploy.ps1

## 🔧 Cấu Hình Biến Môi Trường

### Trên GitLab (Settings > CI/CD > Variables):

#### 1. GITHUB_TOKEN
- **Type:** Variable
- **Key:** `GITHUB_TOKEN`
- **Value:** GitHub Personal Access Token
- **Protected:** ✅ Yes
- **Masked:** ✅ Yes

#### 2. GITHUB_USERNAME
- **Type:** Variable  
- **Key:** `GITHUB_USERNAME`
- **Value:** `nguyenngocbinh`
- **Protected:** ✅ Yes
- **Masked:** ❌ No

### 📝 Tạo GitHub Token:

1. Vào: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Điền thông tin:
   - **Name:** `GitLab-CI-Deploy`
   - **Expiration:** `90 days` hoặc `No expiration`
   - **Scopes:** ✅ `repo` (Full control)
4. Copy token và paste vào GitLab Variables

## 🚀 Cách Hoạt Động

### Khi commit/push lên GitLab main branch:

```
📝 Commit to GitLab
    ↓
🏗️ Build Stage (Automatic)
   - Tạo thư mục production/
   - Minify JavaScript files
   - Obfuscate admin credentials  
   - Loại bỏ development files
   - Tạo clean .gitignore
    ↓
🚀 Deploy Stage (Automatic)  
   - Push production code to GitHub
   - Force update GitHub Pages
   - Website tự động cập nhật
```

### Build Process Details:

**Files được loại bỏ khỏi production:**
- `.gitlab-ci.yml` (CI config)
- `test-ci-local.ps1` (testing script)
- `gitlab-token-setup.html` (setup guide)
- `GITLAB_AUTH_FIX.md` (auth guide)
- `GITLAB_CI_SETUP.md` (CI setup guide)
- `*-backup.*` (backup files)
- `production/` folder (temporary build folder)

**JavaScript được xử lý:**
- `js/script.js` → `js/script.min.js` (minified + obfuscated)
- `js/admin.js` → `js/admin.min.js` (minified + obfuscated)
- HTML files tự động cập nhật references

**Security Features:**
- Admin credentials được encode với Base64
- Source code comments bị loại bỏ
- Development files không được deploy

## 📋 Pipeline Status

### Successful Pipeline:
```
✅ build_production (auto) → ✅ deploy_to_github (auto)
```

### Manual Deployment:
```
✅ build_production (auto) → 🔧 manual_deploy (manual trigger)
```

## 🌐 Kết Quả

- **GitLab Repository:** Full source code (private)
- **GitHub Repository:** Production code only (public)
- **Live Website:** https://nguyenngocbinh.github.io/DACSANTAYBAC/
- **Admin Panel:** https://nguyenngocbinh.github.io/DACSANTAYBAC/admin.html

## 🛠️ Troubleshooting

### ❌ Pipeline fails với "Authentication failed"
- Kiểm tra `GITHUB_TOKEN` có đúng không
- Kiểm tra token có quyền `repo` không
- Kiểm tra token chưa expired

### ❌ Build stage fails
- Kiểm tra syntax trong `.gitlab-ci.yml`
- Xem pipeline logs để debug

### ❌ Deploy stage fails  
- Kiểm tra `GITHUB_USERNAME` đúng không
- Kiểm tra GitHub repository tồn tại
- Kiểm tra network connectivity

## 🎯 Benefits of Single Workflow

1. **Simplicity:** Chỉ 1 lệnh `git push gitlab main`
2. **No Conflicts:** Không còn sync conflicts giữa repositories  
3. **Always Updated:** GitHub Pages luôn sync với GitLab
4. **Secure by Default:** Source code chỉ có trên GitLab private
5. **Zero Maintenance:** Không cần maintain dual scripts
6. **CI/CD Best Practice:** Standard industry workflow

## 🗑️ Cleaned Up Files

Files đã được xóa để đơn giản hóa workflow:
- ❌ `dual-deploy.ps1` - Dual repository deployment
- ❌ `dual-sync.ps1` - Dual repository sync  
- ❌ `github-only-deploy.ps1` - GitHub-only deployment
- ❌ `build.ps1` - Manual build script
- ❌ `DUAL_REPO_GUIDE.md` - Dual repository guide
- ❌ `.gitignore.github` - GitHub-specific gitignore

**Kết quả:** Repository sạch sẽ, chỉ focus vào main workflow!

## 🔄 Simplified Workflow

### ONLY ONE COMMAND NEEDED:
```bash
git add .
git commit -m "Update website content"
git push gitlab main  # ← CHỈ CẦN LỆNH NÀY!
```

### Automatic Process:
```
👨‍💻 Developer Push to GitLab
        ↓
🏗️ GitLab CI Build (Auto)
   - Minify JS files
   - Obfuscate credentials
   - Remove dev files
   - Create production build
        ↓
🚀 GitLab CI Deploy (Auto)
   - Push to GitHub
   - Update GitHub Pages
   - Website live!
        ↓
🌐 https://nguyenngocbinh.github.io/DACSANTAYBAC/
```

### NO MORE MANUAL SCRIPTS:
❌ ~~dual-deploy.ps1~~ (DELETED)
❌ ~~dual-sync.ps1~~ (DELETED)  
❌ ~~github-only-deploy.ps1~~ (DELETED)
❌ ~~build.ps1~~ (DELETED)
✅ **Only:** `git push gitlab main`

### Check pipeline status:
- GitLab UI: Project > CI/CD > Pipelines
- URL: https://gitlab.com/nguyenngocbinh/DACSANTAYBAC/-/pipelines

### Manual deployment (nếu cần):
- GitLab UI: Pipelines > Run pipeline > manual_deploy

---

**🎉 Kết quả:** Hoàn toàn tự động! Mỗi lần push lên GitLab sẽ tự động build và deploy lên GitHub Pages!
