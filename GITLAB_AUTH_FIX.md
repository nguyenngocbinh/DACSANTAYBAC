# 🔐 GitLab Authentication Setup Guide

## ⚠️ **Vấn Đề:** Authentication Failed

GitLab không còn hỗ trợ password authentication. Bạn cần sử dụng **Personal Access Token**.

## 🚀 **Giải Pháp: Tạo GitLab Personal Access Token**

### **Bước 1: Tạo Personal Access Token**

1. **Truy cập GitLab:** https://gitlab.com/-/profile/personal_access_tokens
2. **Điền thông tin:**
   - **Token name:** `DACSANTAYBAC-deploy`
   - **Expiration date:** `2025-12-31` (hoặc không set)
   - **Scopes:** ✅ Chọn `read_repository`, `write_repository`

3. **Click "Create personal access token"**
4. **Copy token** (chỉ hiển thị 1 lần duy nhất!)

### **Bước 2: Cấu Hình Git Credentials**

#### **Option A: Cập nhật remote URL với token**
```bash
# Remove remote cũ
git remote remove gitlab

# Add remote mới với token
git remote add gitlab https://nguyenngocbinh:YOUR_TOKEN_HERE@gitlab.com/nguyenngocbinh/DACSANTAYBAC.git

# Verify
git remote -v
```

#### **Option B: Sử dụng Git Credential Manager**
```bash
# Clear old credentials
git credential-manager-core erase
# Host: gitlab.com
# [Enter twice]

# Push sẽ prompt for credentials
git push gitlab main
# Username: nguyenngocbinh
# Password: [Paste your token here]
```

### **Bước 3: Test Connection**
```bash
# Test push to GitLab
git push gitlab main
```

## 🔧 **Quick Fix Commands**

### **Nếu bạn có token:**
```bash
# Replace YOUR_TOKEN với token thực
git remote set-url gitlab https://nguyenngocbinh:YOUR_TOKEN@gitlab.com/nguyenngocbinh/DACSANTAYBAC.git
git push gitlab main
```

### **Nếu chưa có token:**
1. Tạo token theo hướng dẫn trên
2. Chạy commands sau:

```bash
# Tạm thời bỏ qua GitLab, chỉ push GitHub
git push origin main

# Sau khi có token, sẽ setup lại GitLab
```

## 🚀 **Alternative: SSH Authentication**

### **Setup SSH Key (Khuyến nghị)**
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitLab: https://gitlab.com/-/profile/keys
```

### **Update remote to SSH:**
```bash
git remote set-url gitlab git@gitlab.com:nguyenngocbinh/DACSANTAYBAC.git
```

## 📋 **Tạm Thời: Chỉ Sử Dụng GitHub**

Nếu cần deploy ngay, có thể tạm thời chỉ sử dụng GitHub:

```bash
# Push lên GitHub (hoạt động bình thường)
git add .
git commit -m "Deploy to GitHub only - GitLab setup pending"
git push origin main
```

Website vẫn hoạt động bình thường tại:
- 🌐 **Website:** https://nguyenngocbinh.github.io/DACSANTAYBAC/
- 👨‍💼 **Admin:** https://nguyenngocbinh.github.io/DACSANTAYBAC/admin.html

## 🎯 **Khuyến Nghị**

1. **Ngay lập tức:** Tạo GitLab Personal Access Token
2. **Bảo mật:** Lưu token an toàn (password manager)
3. **Backup:** GitHub vẫn hoạt động như bình thường
4. **Lâu dài:** Setup SSH key cho tiện lợi

---
*⚡ GitLab token chỉ cần setup 1 lần duy nhất!*
