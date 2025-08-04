# Website Bán Hàng - ShopOnline

Một website bán hàng trực tuyến hiện đại và responsive được xây dựng bằng HTML, CSS và JavaScript.

## ✨ Tính Năng

### 🛍️ Tính năng chính
- **Hiển thị sản phẩm**: Giao diện grid responsive với thông tin chi tiết
- **Giỏ hàng**: Thêm/xóa sản phẩm, cập nhật số lượng, tính tổng tiền
- **Lọc sản phẩm**: Lọc theo danh mục (Điện tử, Thời trang, Gia dụng)
- **Form liên hệ**: Thu thập thông tin khách hàng
- **Responsive Design**: Tối ưu cho mobile và desktop

### 🎨 Giao diện
- Header cố định với logo và giỏ hàng
- Hero section với call-to-action
- Grid sản phẩm với hover effects
- Modal giỏ hàng
- Footer với thông tin liên hệ

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
│   └── style.css       # File CSS chính
├── js/
│   └── script.js       # File JavaScript chính
└── README.md           # Tài liệu hướng dẫn
```

## 🛠️ Công Nghệ Sử Dụng

- **HTML5**: Cấu trúc trang web semantic
- **CSS3**: Styling với Grid, Flexbox, Animations
- **JavaScript ES6+**: Tương tác và xử lý logic
- **Font Awesome**: Icons
- **Google Fonts**: Typography

## 📊 Dữ Liệu Sản Phẩm

Website hiện có 9 sản phẩm mẫu thuộc 3 danh mục:

### Điện tử
- Smartphone Samsung Galaxy - 12,000,000đ
- Laptop Dell XPS - 25,000,000đ  
- Tai Nghe Bluetooth - 1,500,000đ

### Thời trang
- Áo Thun Nam - 299,000đ
- Giày Sneaker - 890,000đ
- Váy Đầm Nữ - 650,000đ

### Gia dụng
- Nồi Cơm Điện - 1,200,000đ
- Máy Pha Cà Phê - 2,500,000đ
- Bàn Ủi Hơi Nước - 850,000đ

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
    id: 10,
    name: "Tên sản phẩm",
    price: 1000000,
    category: "electronics|fashion|home",
    image: "🎮", // Emoji hoặc đường dẫn ảnh
    description: "Mô tả sản phẩm"
}
```

### Thay đổi màu sắc
Chỉnh sửa biến CSS trong `css/style.css`:
- Primary color: `#e74c3c` (đỏ)
- Success color: `#2ecc71` (xanh lá)
- Dark color: `#2c3e50` (xanh đậm)

### Tích hợp thanh toán
Thay thế hàm `checkout()` trong `script.js` để tích hợp:
- VNPay
- MoMo
- PayPal
- Stripe

## 📞 Hỗ Trợ

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

**ShopOnline** - Website bán hàng trực tuyến đơn giản, hiệu quả và dễ sử dụng! 🛒✨
