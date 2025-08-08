# 📊 Hướng Dẫn Quản Lý Sản Phẩm Bằng Excel

## 🎯 Tổng Quan
Hệ thống đã được nâng cấp với tính năng quản lý sản phẩm bằng file Excel/CSV, giúp việc cập nhật hàng loạt sản phẩm trở nên dễ dàng và nhanh chóng.

## ✨ Tính Năng Mới

### 📤 Xuất Excel
- **Nút:** "Xuất Excel" trong Admin Panel
- **Chức năng:** Xuất toàn bộ dữ liệu sản phẩm hiện tại ra file CSV
- **File xuất:** `dacsantaybac_products_YYYY-MM-DD.csv`

### 📥 Import Excel  
- **Nút:** "Import Excel" trong Admin Panel
- **Chức năng:** Nhập dữ liệu từ file CSV để cập nhật sản phẩm
- **Hỗ trợ:** File CSV với encoding UTF-8

### 📋 Tải File Mẫu
- **Nút:** "File Mẫu" trong Admin Panel  
- **Chức năng:** Tải file CSV mẫu với cấu trúc đúng
- **File mẫu:** `template_dacsantaybac_products.csv`

## 📊 Cấu Trúc File Excel/CSV

### Các Cột Bắt Buộc:
| Cột | Tên | Mô Tả | Ví Dụ |
|-----|-----|-------|-------|
| A | ID | Số thứ tự sản phẩm (duy nhất) | 1, 2, 3... |
| B | Tên sản phẩm | Tên hiển thị | Tam thất khô |
| C | Danh mục | Loại sản phẩm | herbal, food, oil, drink |
| D | Giá gốc | Giá ban đầu (VNĐ) | 120000 |
| E | Giá hiện tại | Giá bán hiện tại (VNĐ) | 150000 |
| F | Hình ảnh | Link ảnh hoặc emoji | images/abc.jpg hoặc 🌿 |
| G | Mô tả | Mô tả chi tiết sản phẩm | Tam thất khô cao cấp... |
| H | Đơn vị | Đơn vị bán | 100g, 1kg, 500ml |

### Danh Mục Hợp Lệ:
- **herbal:** Dược liệu (tam thất, sâm, nấm linh chi...)
- **food:** Thực phẩm (mật ong, hạt khô, thịt khô...)  
- **oil:** Tinh dầu (tinh dầu sả, quế, tràm...)
- **drink:** Đồ uống (trà, chè, rượu cần...)

## 🔧 Cách Sử Dụng

### 1. Xuất Dữ Liệu Hiện Tại
```
1. Vào Admin Panel
2. Click "Xuất Excel"
3. File CSV sẽ được tải về máy
4. Mở bằng Excel để chỉnh sửa
```

### 2. Chỉnh Sửa Dữ Liệu
```
1. Mở file CSV bằng Excel
2. Chỉnh sửa giá, tên, mô tả...
3. Thêm sản phẩm mới (nếu cần)
4. Lưu file dưới dạng CSV (UTF-8)
```

### 3. Import Dữ Liệu
```
1. Vào Admin Panel
2. Click "Import Excel"
3. Chọn file CSV đã chỉnh sửa
4. Chọn tùy chọn:
   - ☐ Chỉ cập nhật sản phẩm có sẵn
   - ☑ Ghi đè toàn bộ (thêm sản phẩm mới)
5. Click "Import Dữ Liệu"
```

## ⚠️ Lưu Ý Quan Trọng

### ✅ Điều Kiện Hợp Lệ:
- ID phải là số nguyên dương
- ID không được trùng lặp
- Giá phải là số (không có dấu phẩy, chấm)
- Danh mục chỉ chấp nhận: herbal, food, oil, drink
- File phải có đủ các cột bắt buộc

### ❌ Những Điều Cần Tránh:
- Không để trống cột ID, Tên, Danh mục, Giá
- Không sử dụng ký tự đặc biệt trong ID
- Không thay đổi tên cột trong file mẫu
- Không sử dụng danh mục ngoài 4 loại cho phép

### 🔄 Xử Lý Lỗi:
- Nếu có lỗi, hệ thống sẽ báo số dòng bị lỗi
- Sản phẩm hợp lệ vẫn được import
- Kiểm tra console browser để xem chi tiết lỗi

## 🎯 Ví Dụ Thực Tế

### File CSV Mẫu:
```csv
ID,Tên sản phẩm,Danh mục,Giá gốc,Giá hiện tại,Hình ảnh,Mô tả,Đơn vị
1,Tam thất khô,herbal,120000,150000,🌿,Tam thất khô cao cấp từ Tây Bắc,100g
2,Mật ong rừng,food,250000,280000,images/mat-ong.jpg,Mật ong rừng nguyên chất,500ml
3,Tinh dầu sả,oil,80000,90000,🧴,Tinh dầu sả đuổi muỗi,30ml
```

### Kết Quả Import:
- ✅ Sản phẩm ID 1: Cập nhật giá từ 120k → 150k
- ✅ Sản phẩm ID 2: Cập nhật giá và thông tin
- ✅ Sản phẩm ID 3: Thêm mới (nếu chọn ghi đè)

## 💡 Mẹo Sử Dụng

### 1. Backup Định Kỳ:
- Xuất Excel hàng tuần để backup
- Lưu file với tên có ngày tháng

### 2. Cập Nhật Hàng Loạt:
- Sử dụng Excel để tính giá theo %
- Copy formula cho nhiều sản phẩm cùng lúc

### 3. Quản Lý Danh Mục:
- Sử dụng Data Validation trong Excel
- Tạo dropdown cho cột Danh mục

### 4. Format Số:
- Format cột giá thành Number (không có dấu phẩy)
- Đảm bảo không có ký tự đặc biệt

---
*📝 Cập nhật: 08/08/2025*
*🔗 [Quay lại README chính](../README.md)*
