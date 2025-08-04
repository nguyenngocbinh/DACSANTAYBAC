# 🚀 Hướng Dẫn Chỉnh Sửa Nhanh Giá & Ảnh Sản Phẩm

## 💰 **CÁCH 1: Admin Panel - Chỉnh Sửa Giá (NHANH NHẤT)**

### 📍 **Truy Cập Admin Panel:**
```
URL: https://nguyenngocbinh.github.io/DACSANTAYBAC/admin.html
Login: admin / admin123
```

### 🔧 **Các Bước Chỉnh Sửa Giá:**

1. **Đăng Nhập Admin Panel**
   - Mở link admin panel
   - Nhập username: `admin`
   - Nhập password: `admin123`

2. **Tìm Sản Phẩm**
   - Sử dụng ô tìm kiếm để tìm sản phẩm
   - Or lọc theo danh mục (Dược liệu, Thực phẩm, Đồ uống, Tinh dầu)

3. **Chỉnh Sửa Giá**
   - Click nút ✏️ (Edit) bên cạnh sản phẩm
   - Nhập giá mới trong modal popup
   - Click "Cập Nhật Giá"

4. **Lưu & Backup**
   - Thay đổi được lưu tự động vào localStorage
   - Click "Backup Data" để tải file JSON backup
   - Website chính sẽ cập nhật giá ngay lập tức

### ✅ **Ưu Điểm Admin Panel:**
- ⚡ **Cực nhanh** - Không cần code
- 🔄 **Real-time** - Thay đổi ngay lập tức
- 💾 **Auto-save** - Lưu tự động
- 📊 **Dashboard** - Thống kê trực quan
- 🔍 **Search & Filter** - Tìm kiếm dễ dàng

---

## 🖼️ **CÁCH 2: Chỉnh Sửa Ảnh Sản Phẩm**

### 📂 **Hiện Tại: Sử Dụng Emoji Icons**
```javascript
// Trong file js/script.js (trên GitLab)
{ id: 1, name: "Tam thất khô", image: "🌿", ... },
{ id: 2, name: "Hà thủ ô", image: "🍃", ... },
{ id: 3, name: "Mật ong rừng", image: "🍯", ... },
```

### 🔄 **Option A: Thay Đổi Emoji (NHANH)**
1. **Edit trên GitLab:**
   - Truy cập: https://gitlab.com/nguyenngocbinh/DACSANTAYBAC
   - Edit file `js/script.js`
   - Thay đổi emoji trong property `image`

2. **Emoji Suggestions:**
   ```javascript
   // Dược liệu
   "🌿" "🍃" "🌱" "🌾" "🍄" "🌸" "🌺"
   // Thực phẩm  
   "🍯" "🥩" "🌶️" "🎋" "🧀"
   // Đồ uống
   "🍵" "🍶" "🌼"
   // Tinh dầu
   "🛢️" "🥥" "⭐"
   ```

### 🖼️ **Option B: Sử Dụng Ảnh Thật (CHUYÊN NGHIỆP)**

#### **Bước 1: Tạo Thư Mục Images**
```bash
# Trong GitLab repository
mkdir images
```

#### **Bước 2: Upload Ảnh**
- Upload ảnh vào folder `images/`
- Định dạng: JPG/PNG, kích thước 300x300px
- Tên file: `tam-that-kho.jpg`, `ha-thu-o.jpg`, etc.

#### **Bước 3: Cập Nhật Code**
```javascript
// Thay đổi trong js/script.js
{ 
  id: 1, 
  name: "Tam thất khô", 
  image: "images/tam-that-kho.jpg",  // ← Thay emoji bằng đường dẫn ảnh
  ... 
},
```

#### **Bước 4: Update CSS (Nếu Cần)**
```css
/* Trong css/style.css */
.product-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
}
```

---

## ⚡ **CÁCH 3: Chỉnh Sửa Trực Tiếp Code**

### 📝 **Workflow Nhanh:**

#### **A. Chỉnh Sửa Giá Trong Code:**
1. **Truy cập GitLab:** https://gitlab.com/nguyenngocbinh/DACSANTAYBAC
2. **Edit file:** `js/script.js` 
3. **Tìm sản phẩm:**
   ```javascript
   { id: 1, name: "Tam thất khô", price: 120000, ... }
                                    ↑ Thay đổi giá ở đây
   ```
4. **Commit changes**
5. **Deploy lên GitHub** (theo workflow)

#### **B. Thêm Sản Phẩm Mới:**
```javascript
// Thêm vào cuối array products
{ 
  id: 22, 
  name: "Sản phẩm mới", 
  category: "herbal", 
  price: 85000, 
  originalPrice: 85000, 
  image: "🌿", 
  description: "Mô tả sản phẩm", 
  unit: "100g" 
},
```

---

## 🏆 **KHUYẾN NGHỊ WORKFLOW**

### 🥇 **Cho Thay Đổi Giá Thường Xuyên:**
**→ Sử dụng Admin Panel**
- Nhanh nhất, không cần code
- Real-time update
- Backup/restore dễ dàng

### 🥈 **Cho Thay Đổi Ảnh/Thông Tin:**
**→ Edit trên GitLab → Deploy GitHub**
- Professional workflow
- Version control đầy đủ
- Bảo mật source code

### 🥉 **Cho Cập Nhật Lớn:**
**→ Clone GitLab → Edit Local → Push**
- IDE support đầy đủ
- Test kỹ trước khi deploy
- Bulk changes

---

## 📋 **Quick Reference**

### **🔗 Admin Panel:**
```
URL: https://nguyenngocbinh.github.io/DACSANTAYBAC/admin.html
Login: admin / admin123
Chức năng: Chỉnh giá, backup/restore, thống kê
```

### **🔗 GitLab (Source Code):**
```
URL: https://gitlab.com/nguyenngocbinh/DACSANTAYBAC
File: js/script.js (line ~1-30 for products array)
Chức năng: Sửa giá, ảnh, thông tin, thêm sản phẩm
```

### **🔗 GitHub (Production):**
```
URL: https://github.com/nguyenngocbinh/DACSANTAYBAC
Auto-deploy: Sau khi push từ GitLab
Website: https://nguyenngocbinh.github.io/DACSANTAYBAC/
```

---

## ⚡ **TÓM TẮT - CÁCH NHANH NHẤT:**

### **Chỉnh Giá:** → Admin Panel (2 phút)
### **Chỉnh Ảnh/Info:** → GitLab edit (5 phút)  
### **Thêm Sản Phẩm:** → GitLab edit + deploy (10 phút)

🎯 **Admin Panel là cách nhanh nhất cho việc quản lý giá hàng ngày!**
