# 🔐 Hướng Dẫn Đổi Mật Khẩu Admin Panel

## ⚙️ Cơ Chế Xác Thực Hiện Tại
Admin panel sử dụng **SHA-256 hash + salt** để xác thực mật khẩu. Mật khẩu **không** được lưu dạng plaintext trong code.

### Nguyên lý:
```
password + "dacsantaybac_salt" → SHA-256 hash → so sánh với hash lưu trong code
```

## 🔄 Cách Đổi Mật Khẩu

### Bước 1: Tạo hash cho mật khẩu mới

Mở trình duyệt, nhấn F12 → Console, chạy lệnh sau:

```javascript
async function generateHash(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'dacsantaybac_salt');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Thay 'MAT_KHAU_MOI' bằng mật khẩu bạn muốn
generateHash('MAT_KHAU_MOI').then(hash => console.log('Hash:', hash));
```

Copy giá trị hash hiển thị trong console.

### Bước 2: Cập nhật hash trong `js/admin.js`

Mở file `js/admin.js`, tìm đoạn (khoảng dòng 120):

```javascript
const validUsers = {
    'admin': '86574abbdfb97cca59f5ccd35b7506c998a0059bd5cc1f37ca4bebb629edaa87'
};
```

Thay chuỗi hash cũ bằng hash mới vừa tạo. Nếu muốn đổi cả username, thay `'admin'` thành tên mới.

### Bước 3: Commit & push
```bash
git add js/admin.js
git commit -m "security: update admin password hash"
git push origin main
```

### Bước 4: Test đăng nhập
- Truy cập admin panel
- Đăng nhập với mật khẩu mới
- Xóa localStorage cũ nếu đã đăng nhập trước đó (F12 → Application → Clear)

## 💡 Ví Dụ Cụ Thể

Đổi mật khẩu thành `TayBac@2026`:

```javascript
// Chạy trong Console (F12)
generateHash('TayBac@2026').then(hash => console.log(hash));
// Kết quả: một chuỗi 64 ký tự hex
```

Sau đó thay giá trị hash trong `js/admin.js`.

## ⚡ Lưu Ý Quan Trọng

### ✅ Nên:
- Chọn mật khẩu mạnh (≥ 8 ký tự, gồm chữ hoa, chữ thường, số, ký tự đặc biệt)
- Backup file `js/admin.js` trước khi sửa
- Test đăng nhập ngay sau khi đổi
- **Không** ghi mật khẩu plaintext vào code, README, hoặc tài liệu

### ❌ Không nên:
- Dùng mật khẩu quá đơn giản (`123456`, `password`)
- Đổi salt `dacsantaybac_salt` (sẽ làm mất hết các phiên đăng nhập cũ)
- Share hash công khai (hash có thể bị brute-force nếu mật khẩu yếu)

## 🆘 Quên Mật Khẩu?

Nếu quên mật khẩu, không thể khôi phục từ hash. Cần tạo hash mới:

1. Chạy `generateHash('mat_khau_moi')` trong Console
2. Thay hash trong `js/admin.js`
3. Push code lên GitHub

## 📞 Cần Hỗ Trợ
- **Zalo:** 0988040027

---
*Cập nhật: 26/02/2026*
