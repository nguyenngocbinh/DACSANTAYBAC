# Website Bán Hàng - Đặc Sản Tây Bắc

🌿 Một website bán hàng chuyên các sản phẩm đặc sản Tây Bắc và thảo dược thiên nhiên được xây dựng bằng HTML, CSS và JavaScript.

## 🚀 Demo

- **Live Demo**: [https://nguyenngocbinh.github.io/web_ban_hang](https://nguyenngocbinh.github.io/web_ban_hang)
- **Repository**: [https://github.com/nguyenngocbinh/web_ban_hang](https://github.com/nguyenngocbinh/web_ban_hang)

## ✨ Tính Năng

### 🛍️ Tính năng chính
- **21 sản phẩm đặc sản**: Tam thất, sâm ngọc linh, hà thủ ô, mật ong rừng...
- **Giỏ hàng thông minh**: Thêm/xóa sản phẩm, cập nhật số lượng, tính tổng tiền
- **Lọc sản phẩm**: Lọc theo 4 danh mục (Thảo dược, Thực phẩm, Đồ uống, Tinh dầu)
- **Form liên hệ**: Thu thập thông tin khách hàng đặt hàng
- **Responsive Design**: Tối ưu cho mobile và desktop

### 🎨 Giao diện
- Header cố định với logo "Đặc Sản Tây Bắc" và giỏ hàng
- Hero section với slogan "Tinh hoa đất trời"
- Grid sản phẩm với hover effects và emoji icons
- Modal giỏ hàng với tính năng checkout
- Footer với thông tin liên hệ vùng Tây Bắc

### 📱 Responsive
- Desktop: Grid 3-4 cột
- Tablet: Grid 2-3 cột  
- Mobile: Grid 1-2 cột

## 🚀 Cách Sử Dụng

1. **Mở website**: Mở file `index.html` trong trình duyệt
2. **Duyệt sản phẩm**: Xem danh sách sản phẩm và lọc theo danh mục
3. **Thêm vào giỏ**: Click nút "Thêm vào giỏ" trên sản phẩm
4. **Quản lý giỏ hàng**: Click icon giỏ hàng để xem và chỉnh sửa
5. **Đặt hàng**: Click "Đặt hàng" để hoàn tất
6. **Liên hệ**: Điền form liên hệ để gửi yêu cầu

## 📁 Cấu Trúc Thư Mục

```
web_ban_hang/
├── index.html          # Trang chính
├── css/
│   └── style.css       # File CSS chính với theme xanh lá
├── js/
│   └── script.js       # JavaScript với 21 sản phẩm đặc sản
├── package.json        # Cấu hình dự án
├── .gitignore         # Loại trừ files không cần thiết
└── README.md          # Tài liệu hướng dẫn
```

## 🛠️ Công Nghệ Sử Dụng

- **HTML5**: Cấu trúc trang web semantic
- **CSS3**: Styling với Grid, Flexbox, Animations (theme xanh lá tự nhiên)
- **JavaScript ES6+**: Tương tác và xử lý logic giỏ hàng
- **Font Awesome**: Icons cho giao diện
- **Emoji Icons**: Biểu tượng sản phẩm sinh động

## 📊 Dữ Liệu Sản Phẩm

Website hiện có 21 sản phẩm đặc sản Tây Bắc thuộc 4 danh mục:

### 🌿 Thảo dược (12 sản phẩm)
- Tam Thất Khô Tây Bắc - 2,800,000đ
- Hà Thủ Ô Rừng - 1,200,000đ  
- Sâm Tố Nữ - 3,200,000đ
- Ba Kích Tím - 1,800,000đ
- Sâm Ngọc Linh - 5,500,000đ
- Tam Thất Hoang - 3,800,000đ
- Nấm Lim Xanh - 2,200,000đ
- Hạt Kỳ Tử Đỏ - 380,000đ
- Nhung Hươu Ngâm Mật Ong - 4,200,000đ
- Sâm Cau - 1,600,000đ
- Trinh Nữ Hoàng Cung - 2,800,000đ

### 🍯 Thực phẩm (8 sản phẩm)
- Mật Ong Rừng Nguyên Chất - 450,000đ
- Quả Trâu Cổ Khô - 320,000đ
- Quả Sim Rừng - 280,000đ
- Thịt Trâu Khô - 750,000đ
- Thịt Lợn Khô - 620,000đ
- Thịt Bò Khô - 890,000đ
- Ngô Tím Cay - 180,000đ

### 🍷 Đồ uống (1 sản phẩm)
- Rượu Mận Tây Bắc - 680,000đ

### 🧴 Tinh dầu (2 sản phẩm)
- Tinh Dầu Quế - 420,000đ
- Tinh Dầu Xả - 350,000đ

## 🎯 Tính Năng Nâng Cao

### Giỏ hàng thông minh
- Lưu trữ trong memory (có thể mở rộng với localStorage)
- Cập nhật số lượng realtime
- Hiển thị tổng tiền tự động
- Thông báo khi thêm/xóa sản phẩm

### UX/UI tối ưu
- Smooth scrolling
- Hover animations
- Loading states
- Form validation
- Responsive navigation

## 🔧 Tùy Chỉnh

### Thêm sản phẩm mới
Chỉnh sửa mảng `products` trong `js/script.js`:

```javascript
{
    id: 22,
    name: "Tên sản phẩm mới",
    price: 1000000,
    category: "herbal|food|drink|oil",
    image: "🌿", // Emoji hoặc đường dẫn ảnh
    description: "Mô tả sản phẩm đặc sản"
}
```

### Thay đổi màu sắc
Chỉnh sửa biến CSS trong `css/style.css`:
- Primary color: `#27ae60` (xanh lá tự nhiên)
- Secondary color: `#e67e22` (cam đất)
- Success color: `#2ecc71` (xanh lá sáng)
- Dark color: `#2c3e50` (xanh đậm)

### Tích hợp thanh toán
Thay thế hàm `checkout()` trong `script.js` để tích hợp:
- VNPay
- MoMo
- PayPal
- Stripe

## 📞 Hỗ Trợ & Liên Hệ

### 🔗 Thông tin liên hệ:
- **📱 Điện thoại & Zalo**: 0988040027
- **📘 Facebook**: Hải béo
- **📧 Email**: info@dacsantaybac.com

### 🛠️ Hỗ trợ kỹ thuật:
Để được hỗ trợ hoặc báo lỗi, vui lòng:
1. Mở Developer Tools (F12) để xem console errors
2. Kiểm tra file paths và tên files
3. Đảm bảo browser hỗ trợ ES6+

## 🚀 Triển Khai

### Hosting tĩnh
- GitHub Pages
- Netlify  
- Vercel
- Firebase Hosting

### Hosting có server
- Heroku
- DigitalOcean
- AWS
- Google Cloud

## 📈 Phát Triển Tiếp

### Frontend
- [ ] Tích hợp React/Vue.js
- [ ] Progressive Web App (PWA)
- [ ] Dark mode
- [ ] Multi-language

### Backend
- [ ] Node.js/Express API
- [ ] Database (MongoDB/PostgreSQL)
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Payment integration
- [ ] Email notifications

### Mobile
- [ ] React Native app
- [ ] Flutter app

---

**Đặc Sản Tây Bắc** - Website chuyên cung cấp thảo dược thiên nhiên và đặc sản vùng miền chất lượng cao! 🌿🏔️
