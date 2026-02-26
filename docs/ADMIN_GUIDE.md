# 👨‍💼 Hướng Dẫn Sử Dụng Admin Panel

## 🔗 Truy Cập
- **Online:** https://nguyenngocbinh.github.io/DACSANTAYBAC/admin/admin.html
- **Local:** Mở file `admin/admin.html` trong trình duyệt

## 🔐 Đăng Nhập
- **Tên đăng nhập:** `admin`
- **Mật khẩu:** Liên hệ quản trị viên (mật khẩu được mã hóa SHA-256)
- Phiên đăng nhập được lưu trong localStorage

> ⚠️ Mật khẩu không được lưu dạng plaintext. Xem [PASSWORD_CHANGE_GUIDE.md](PASSWORD_CHANGE_GUIDE.md) để đổi mật khẩu.

## 📊 Dashboard
Sau khi đăng nhập, dashboard hiển thị:
- **Tổng sản phẩm:** 24 sản phẩm
- **Đã sửa giá:** Số sản phẩm có giá khác giá gốc
- **Đã sửa thông tin:** Số sản phẩm đã thay đổi tên/mô tả/ảnh
- **Giá trung bình:** Trung bình giá tất cả sản phẩm

## 🛒 Quản Lý Sản Phẩm

### Xem danh sách
- Hiển thị 24 sản phẩm với ảnh/emoji, giá gốc, giá hiện tại
- **Tìm kiếm:** Gõ tên sản phẩm trong ô tìm kiếm
- **Lọc danh mục:** Dược liệu, Thực phẩm, Đồ uống, Tinh dầu

### Chỉnh sửa nhanh giá
1. Nhập giá mới vào ô input bên cạnh sản phẩm
2. Click nút 💾 (Save)
3. Giá được lưu vào localStorage và đồng bộ tự động

### Chỉnh sửa chi tiết
1. Click nút **✏️ Chỉnh sửa** trên thẻ sản phẩm
2. Modal popup hiển thị:
   - Tên sản phẩm
   - Danh mục (dropdown)
   - Giá (VNĐ)
   - Mô tả
   - Emoji (bộ chọn emoji)
   - Đường dẫn ảnh (tùy chọn)
3. Click **Lưu** để cập nhật

### Khôi phục sản phẩm
- **Reset 1 sản phẩm:** Click nút **↩️ Reset** trên thẻ sản phẩm
- **Reset tất cả:** Click nút **Reset Tất Cả** trên thanh công cụ

## 📊 Excel Import/Export

### Xuất Excel
1. Click **📥 Xuất Excel**
2. File `.xlsx` tự động tải về: `dacsantaybac_products_YYYY-MM-DD.xlsx`
3. Chứa tất cả sản phẩm với giá hiện tại

### Import Excel
1. Click **📤 Import Excel**
2. Chọn file `.xlsx` hoặc `.csv`
3. Tùy chọn "Ghi đè dữ liệu hiện tại"
4. Click **Import**

### Tải file mẫu
1. Click **📎 File Mẫu**
2. File template `.xlsx` tải về với cấu trúc đúng + sheet hướng dẫn

### Cấu trúc file Excel
| Cột | Tên | Ví dụ |
|-----|-----|-------|
| ID | Số thứ tự (bắt buộc) | 1, 2, 3... |
| Tên sản phẩm | Tên hiển thị | Tam Thất Bắc Thái Lat |
| Danh mục | `herbal`, `food`, `oil`, `drink` | herbal |
| Giá gốc | Giá ban đầu (VNĐ) | 1300000 |
| Giá hiện tại | Giá bán (VNĐ) | 1300000 |
| Hình ảnh | Đường dẫn ảnh hoặc emoji | images/tam-that.jpg |
| Mô tả | Mô tả chi tiết | Tam thất cao cấp... |
| Đơn vị | Đơn vị bán | 1kg |

## 💾 Lưu Trữ Dữ Liệu

### Cơ chế hoạt động
- **Nguồn gốc:** `data/products.json` (24 sản phẩm gốc)
- **Thay đổi admin:** Lưu trong localStorage dưới key:
  - `product_{id}_price` — giá đã sửa
  - `product_{id}_data` — thông tin đã sửa (tên, mô tả, emoji, ảnh)
  - `websiteProducts` — dữ liệu đồng bộ sang trang chủ
- **Trang chủ tự động đọc** thay đổi từ localStorage khi tải trang

### Lưu ý quan trọng
- Dữ liệu localStorage **chỉ tồn tại trên trình duyệt hiện tại**
- Xóa cache trình duyệt = mất thay đổi admin
- Để lưu vĩnh viễn: sửa `data/products.json` rồi commit & push

## 🔧 Khắc Phục Sự Cố

### Không thể đăng nhập
- Xóa localStorage: F12 → Application → Local Storage → Clear
- Đảm bảo nhập đúng username/password
- Kiểm tra console (F12) xem có lỗi JS không

### Sản phẩm không hiển thị
- Kiểm tra file `data/products.json` có tồn tại không
- Nếu mở local qua `file://`: script.js sử dụng fallback data tự động
- Xem console (F12) để kiểm tra lỗi

### Giá không cập nhật trên trang chủ
- Refresh trang chủ (F5 hoặc Ctrl+Shift+R)
- Kiểm tra localStorage có key `websiteProducts` không

## 📞 Liên Hệ Hỗ Trợ
- **Zalo:** 0988040027
- **Facebook:** Hải béo

---
*Cập nhật: 26/02/2026*
