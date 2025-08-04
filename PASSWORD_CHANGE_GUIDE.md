# 🔐 Hướng Dẫn Đổi Mật Khẩu Admin Panel

## 📋 Có 3 Cách Đổi Mật Khẩu:

### 🚀 **Cách 1: Sửa Trực Tiếp File admin.html (NHANH NHẤT)**

#### Bước 1: Mở file admin.html
- Tìm file `admin.html` trong thư mục project
- Mở bằng VS Code hoặc text editor

#### Bước 2: Tìm và sửa mật khẩu
Tìm dòng này (khoảng dòng 518):
```javascript
if (username === 'admin' && password === 'admin123') {
```

Thay đổi thành mật khẩu mới:
```javascript
if (username === 'admin' && password === 'MATKHAUMOI') {
```

#### Bước 3: Cập nhật placeholder (tùy chọn)
Tìm dòng này (khoảng dòng 374):
```html
<input type="password" id="password" placeholder="admin123" required>
```

Thay thành:
```html
<input type="password" id="password" placeholder="Nhập mật khẩu" required>
```

#### Bước 4: Cập nhật thông tin hiển thị (tùy chọn)
Tìm dòng này (khoảng dòng 381):
```html
<i class="fas fa-info-circle"></i> Tài khoản mặc định: admin / admin123
```

Thay thành:
```html
<i class="fas fa-info-circle"></i> Tài khoản: admin / (mật khẩu đã thay đổi)
```

### 💻 **Cách 2: Sửa Qua Git và Upload (BẢO MẬT HƠNG)**

```bash
# 1. Sửa file admin.html như cách 1
# 2. Commit và push
git add admin.html
git commit -m "Change admin password for security"
git push
```

### 🛠️ **Cách 3: Sử Dụng Tool Tự Động**

Tôi sẽ tạo tool để đổi mật khẩu tự động!

---

## ⚡ **Lưu Ý Quan Trọng:**

### ✅ **Nên làm:**
- Chọn mật khẩu mạnh (ít nhất 8 ký tự)
- Bao gồm chữ hoa, chữ thường, số
- Backup file trước khi sửa
- Test đăng nhập sau khi đổi

### ❌ **Không nên:**
- Dùng mật khẩu quá đơn giản (123456)
- Để mật khẩu giống username
- Quên backup file gốc
- Share mật khẩu công khai

---

## 🔧 **Ví Dụ Mật Khẩu Mạnh:**
- `TayBac2024!`
- `DacSan@123`
- `Admin$2024`
- `HaiBeo#789`

---

## 🆘 **Khắc Phục Khi Quên Mật Khẩu:**

### Nếu quên mật khẩu mới:
1. Mở file `admin.html`
2. Tìm dòng chứa mật khẩu
3. Đổi lại thành `admin123` hoặc mật khẩu khác
4. Save và test lại

### Nếu file bị lỗi:
1. Restore từ backup
2. Hoặc copy từ GitHub về
3. Hoặc sử dụng Git reset

---

## 📞 **Cần Hỗ Trợ:**
- **Zalo:** 0988040027  
- **Facebook:** Hải béo

*Cập nhật: ${new Date().toLocaleDateString('vi-VN')}*
