# 📊 Hướng Dẫn Quản Lý Sản Phẩm Bằng Excel

## 🎯 Tổng Quan
Admin Panel hỗ trợ xuất/nhập sản phẩm bằng file Excel (.xlsx), giúp cập nhật hàng loạt nhanh chóng.

> **Thư viện:** Sử dụng [SheetJS (xlsx)](https://sheetjs.com/) phiên bản 0.18.5

## ✨ Chức Năng

### 📥 Xuất Excel
- **Nút:** "Xuất Excel" trong Admin Panel
- **File xuất:** `dacsantaybac_products_YYYY-MM-DD.xlsx`
- **Nội dung:** Tất cả 24 sản phẩm với giá gốc + giá hiện tại

### 📤 Import Excel
- **Nút:** "Import Excel" trong Admin Panel
- **Hỗ trợ:** File `.xlsx`, `.xls`, `.csv`
- **Tùy chọn:** Ghi đè dữ liệu hiện tại hoặc chỉ cập nhật

### 📎 Tải File Mẫu
- **Nút:** "File Mẫu" trong Admin Panel
- **File:** `template_dacsantaybac_products.xlsx`
- **Gồm 2 sheet:** Template mẫu + Hướng dẫn

## 📊 Cấu Trúc Cột

| Cột | Tên | Bắt buộc | Ví dụ |
|-----|-----|----------|-------|
| A | ID | ✅ | 1, 2, 3... |
| B | Tên sản phẩm | ✅ | Tam Thất Bắc Thái Lat |
| C | Danh mục | ✅ | `herbal`, `food`, `oil`, `drink` |
| D | Giá gốc | ✅ | 1300000 |
| E | Giá hiện tại | ✅ | 1300000 |
| F | Hình ảnh | | `images/tam-that.jpg` hoặc emoji `🌿` |
| G | Mô tả | | Tam thất cao cấp từ Tây Bắc |
| H | Đơn vị | | 1kg, 100g, 500ml |

### Danh mục hợp lệ
| Code | Hiển thị |
|------|----------|
| `herbal` | 🌿 Dược liệu |
| `food` | 🍯 Thực phẩm |
| `oil` | 💧 Tinh dầu |
| `drink` | 🍵 Đồ uống |

## 🔧 Quy Trình Sử Dụng

### 1. Xuất dữ liệu hiện tại
1. Vào Admin Panel → đăng nhập
2. Click **Xuất Excel**
3. File `.xlsx` tải về máy
4. Mở bằng Excel / Google Sheets

### 2. Chỉnh sửa trong Excel
- Sửa giá, tên, mô tả trực tiếp trong Excel
- Thêm dòng mới để thêm sản phẩm
- **Không** đổi tên cột header

### 3. Import lại
1. Quay lại Admin Panel
2. Click **Import Excel**
3. Chọn file đã sửa
4. Check "Ghi đè dữ liệu hiện tại" (nếu muốn)
5. Click **Import**
6. Hệ thống báo kết quả: thêm mới / cập nhật / lỗi

## ⚠️ Lưu Ý

### ✅ Điều kiện hợp lệ
- ID: số nguyên dương, không trùng
- Giá: số nguyên (không dấu chấm/phẩy ngăn cách hàng nghìn)
- Danh mục: chỉ 4 giá trị `herbal`, `food`, `oil`, `drink`
- File phải có đủ 5 cột bắt buộc (ID, Tên, Danh mục, Giá gốc, Giá hiện tại)

### ❌ Tránh
- Để trống cột bắt buộc
- Dùng danh mục ngoài 4 loại cho phép
- Nhập giá dạng text ("một triệu ba")

### 🔄 Xử lý lỗi
- Dòng hợp lệ vẫn được import
- Dòng lỗi được đếm và báo tổng
- Xem F12 → Console để debug chi tiết

## 💡 Mẹo
- Xuất Excel trước khi import để có template chuẩn
- Backup bằng cách xuất Excel thường xuyên
- Dùng tính năng "Reset Tất Cả" nếu import sai

---
*Cập nhật: 26/02/2026*
