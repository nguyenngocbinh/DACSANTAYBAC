# Simple Workflow - GitLab CI/CD Only

## 🎯 Luồng Duy Nhất (Single Source of Truth)

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

## 🗑️ Files Đã Cleanup

Đã xóa tất cả dual build scripts:
- ❌ `dual-deploy.ps1`
- ❌ `dual-sync.ps1` 
- ❌ `github-only-deploy.ps1`
- ❌ `build.ps1`
- ❌ `DUAL_REPO_GUIDE.md`

## 🎉 Benefits

1. **Simple:** Chỉ 1 lệnh git push
2. **Clean:** Không còn script rối rắm
3. **Reliable:** CI/CD đảm bảo consistency
4. **Secure:** Source code chỉ ở GitLab private
5. **Standard:** Industry best practice

---

**🚀 Ready to use! Just `git push gitlab main` and everything is automatic!**
