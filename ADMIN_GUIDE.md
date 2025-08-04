# Hướng Dẫn Sử Dụng Admin Panel

## Truy Cập Admin Panel
1. Mở file `admin.html` trong trình duyệt
2. Hoặc truy cập: `http://localhost:3000/admin.html` (nếu đang chạy server)

## Đăng Nhập
- **Tên đăng nhập:** `admin`
- **Mật khẩu:** `admin123`

## Chức Năng Chính

### 1. Dashboard
- Hiển thị thống kê tổng quan:
  - Tổng số sản phẩm
  - Số sản phẩm đã thay đổi giá
  - Giá trung bình
  - Số danh mục

### 2. Quản Lý Giá Sản Phẩm
- **Xem danh sách:** Hiển thị tất cả 21 sản phẩm với giá gốc và giá hiện tại
- **Tìm kiếm:** Tìm sản phẩm theo tên
- **Lọc theo danh mục:** Dược liệu, Thực phẩm, Đồ uống, Tinh dầu
- **Chỉnh sửa giá:** Click nút chỉnh sửa (✏️) để thay đổi giá
- **Khôi phục giá gốc:** Click nút khôi phục (↶) để về giá ban đầu

### 3. Quản Lý Dữ Liệu
- **Backup:** Tải xuống file JSON chứa dữ liệu giá hiện tại
- **Restore:** Khôi phục từ file backup
- **Reset All:** Khôi phục giá gốc cho tất cả sản phẩm

### 4. Hiển Thị Thay Đổi
- Giá đã thay đổi được highlight màu cam
- Hiển thị % tăng/giảm so với giá gốc
- Mũi tên lên/xuống cho thay đổi tăng/giảm

## Lưu Trữ Dữ Liệu
- Tất cả thay đổi được lưu tự động vào **localStorage**
- Dữ liệu được đồng bộ với website chính
- Không cần can thiệp vào mã nguồn

## Bảo Mật
- Yêu cầu đăng nhập để truy cập
- Session được lưu trong localStorage
- Tự động đăng xuất khi đóng trình duyệt

## Tương Thích
- Hoạt động trên tất cả trình duyệt hiện đại
- Responsive design - tương thích mobile
- Không cần kết nối internet (trừ Font Awesome)

## Lưu Ý Quan Trọng
1. **Backup thường xuyên:** Nên backup dữ liệu trước khi thay đổi lớn
2. **Test trước khi áp dụng:** Kiểm tra giá trên website chính sau khi thay đổi
3. **Giá phải > 0:** Hệ thống không cho phép giá âm
4. **Đồng bộ dữ liệu:** Refresh website chính để thấy giá mới

## Khắc Phục Sự Cố

### Không thể đăng nhập:
- Kiểm tra tên đăng nhập: `admin`
- Kiểm tra mật khẩu: `admin123`
- Clear cache trình duyệt

### Giá không cập nhật trên website:
- Refresh trang chính (F5)
- Clear localStorage của website chính
- Kiểm tra console có lỗi JavaScript không

### Mất dữ liệu:
- Restore từ file backup
- Hoặc dùng chức năng "Reset All" để về giá gốc

## Liên Hệ Hỗ Trợ
- **Zalo:** 0988040027
- **Facebook:** Hải béo
- **Email:** Thông qua form liên hệ trên website

---
*Phiên bản: 1.0 - Cập nhật: ${new Date().toLocaleDateString('vi-VN')}*
