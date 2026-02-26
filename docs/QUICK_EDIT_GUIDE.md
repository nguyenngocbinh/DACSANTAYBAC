# 🚀 Hướng Dẫn Chỉnh Sửa Nhanh Giá & Sản Phẩm

## 💰 Cách 1: Admin Panel (Nhanh nhất — không cần code)

### Truy cập
- **Online:** https://nguyenngocbinh.github.io/DACSANTAYBAC/admin/admin.html
- **Local:** Mở `admin/admin.html` trong trình duyệt
- Đăng nhập với tài khoản admin

### Chỉnh giá
1. Tìm sản phẩm (ô tìm kiếm hoặc lọc danh mục)
2. Nhập giá mới vào ô input → click 💾
3. Hoặc click **✏️ Chỉnh sửa** để sửa chi tiết (tên, mô tả, ảnh, emoji)

### Ưu điểm
- ⚡ Cập nhật tức thì (lưu localStorage)
- 📊 Export/Import Excel hàng loạt
- 🔍 Tìm kiếm & lọc dễ dàng

### Hạn chế
- Chỉ lưu trên trình duyệt hiện tại (localStorage)
- Xóa cache = mất thay đổi

---

## 📝 Cách 2: Sửa `data/products.json` (Lưu vĩnh viễn)

### Chỉnh giá
Mở `data/products.json`, tìm sản phẩm và sửa field `price`:

```json
{
  "id": 1,
  "name": "Tam Thất Bắc Thái Lat",
  "category": "herbal",
  "price": 1300000,       ← Sửa giá ở đây
  "originalPrice": 1300000,
  "image": "images/tam-that-bac-thai-lat.jpg",
  "emoji": "🌿",
  "description": "Tam thất Bắc Thái Lat cao cấp từ Tây Bắc",
  "unit": "1kg"
}
```

### Thêm sản phẩm mới
Thêm object vào cuối mảng (trước `]`):

```json
{
  "id": 25,
  "name": "Sản Phẩm Mới",
  "category": "herbal",
  "price": 100000,
  "originalPrice": 100000,
  "image": "",
  "emoji": "🌿",
  "description": "Mô tả sản phẩm",
  "unit": "100g"
}
```

### Danh mục hợp lệ
| Code | Hiển thị | Ví dụ |
|------|----------|-------|
| `herbal` | Dược liệu | Tam thất, Sâm, Nấm linh chi |
| `food` | Thực phẩm | Mật ong, Thịt khô, Mắc ca |
| `oil` | Tinh dầu | Tinh dầu quế, Tinh dầu xả |
| `drink` | Đồ uống | (Chưa có sản phẩm) |

### Sau khi sửa
1. Cập nhật mảng `PRODUCTS_FALLBACK` trong `js/script.js` cho khớp
2. Commit & push:
```bash
git add data/products.json js/script.js
git commit -m "update: thay đổi giá/sản phẩm"
git push origin main
```

---

## 🖼️ Thêm/Thay Ảnh Sản Phẩm

### Bước 1: Đặt tên ảnh (kebab-case)
```
✅ tam-that-moi.jpg
✅ mat-ong-rung.jpg
❌ tam thất mới.jpg (có dấu cách + tiếng Việt có dấu)
```

### Bước 2: Copy vào thư mục `images/`

### Bước 3: Cập nhật `data/products.json`
```json
{
  "id": 25,
  "image": "images/tam-that-moi.jpg",
  ...
}
```

### Bước 4: Cập nhật fallback trong `js/script.js` → Commit & push

---

## 📊 Cách 3: Import Excel (Hàng loạt)

1. Vào Admin Panel → click **Xuất Excel** để lấy template
2. Sửa file `.xlsx` trong Excel/Google Sheets
3. Quay lại Admin Panel → click **Import Excel** → chọn file
4. Tất cả sản phẩm được cập nhật

---

## 🏆 Khuyến Nghị

| Tình huống | Phương pháp | Thời gian |
|-----------|------------|-----------|
| Sửa giá 1-2 sản phẩm | Admin Panel | 1 phút |
| Sửa giá hàng loạt | Import Excel | 5 phút |
| Thêm sản phẩm mới | Sửa `products.json` | 5-10 phút |
| Thêm/đổi ảnh | Copy ảnh + sửa JSON | 5 phút |

---
*Cập nhật: 26/02/2026*
