// ==========================================
// Đặc Sản Tây Bắc - Main Website Script
// Single source of truth: data/products.json
// Fallback: PRODUCTS_FALLBACK (for file:// protocol)
// ==========================================

// Fallback product data - used when fetch fails (e.g. opening file:// locally)
const PRODUCTS_FALLBACK = [
  {"id":1,"name":"Tam Thất Bắc Thái Lat","category":"herbal","price":1300000,"originalPrice":1300000,"image":"images/tam-that-bac-thai-lat.jpg","emoji":"🌿","description":"Tam thất Bắc Thái Lat cao cấp từ Tây Bắc","unit":"1kg"},
  {"id":2,"name":"Hà Thủ Ô","category":"herbal","price":80000,"originalPrice":80000,"image":"","emoji":"🍃","description":"Hà thủ ô tự nhiên, tốt cho tóc và gan thận","unit":"100g"},
  {"id":3,"name":"Mật Ong Rừng U Minh","category":"food","price":150000,"originalPrice":150000,"image":"","emoji":"🍯","description":"Mật ong rừng nguyên chất, không pha trộn","unit":"500ml"},
  {"id":4,"name":"Thảo Quả","category":"herbal","price":95000,"originalPrice":95000,"image":"","emoji":"🌰","description":"Thảo quả khô Tây Bắc, gia vị quý","unit":"100g"},
  {"id":5,"name":"Đông Trùng Hạ Thảo","category":"herbal","price":350000,"originalPrice":350000,"image":"","emoji":"🍄","description":"Đông trùng hạ thảo tự nhiên, bổ dưỡng","unit":"10g"},
  {"id":6,"name":"Nấm Linh Chi Đỏ","category":"herbal","price":200000,"originalPrice":200000,"image":"","emoji":"🍄","description":"Nấm linh chi đỏ Tây Bắc, tăng cường miễn dịch","unit":"100g"},
  {"id":7,"name":"Sâm Ngọc Linh","category":"herbal","price":5500000,"originalPrice":5500000,"image":"","emoji":"🌿","description":"Sâm Ngọc Linh chính gốc, quý hiếm và tốt cho sức khỏe","unit":"1 củ"},
  {"id":8,"name":"Tam Thất Hoang","category":"herbal","price":3800000,"originalPrice":3800000,"image":"","emoji":"🌱","description":"Tam thất hoang tự nhiên, giá trị dinh dưỡng cao","unit":"1kg"},
  {"id":9,"name":"Mắc Ca Khô","category":"food","price":320000,"originalPrice":320000,"image":"images/mac-ca-kho.jpg","emoji":"🥜","description":"Mắc ca khô tự nhiên, giàu dinh dưỡng và chất béo tốt","unit":"1kg"},
  {"id":10,"name":"Quả Sim Rừng","category":"food","price":280000,"originalPrice":280000,"image":"","emoji":"🫐","description":"Quả sim rừng tươi, hương vị đặc trưng vùng cao","unit":"1kg"},
  {"id":11,"name":"Nấm Lim Xanh","category":"herbal","price":2200000,"originalPrice":2200000,"image":"","emoji":"🍄","description":"Nấm lim xanh rừng quý hiếm, tăng cường miễn dịch","unit":"100g"},
  {"id":12,"name":"Thịt Trâu Khô","category":"food","price":750000,"originalPrice":750000,"image":"","emoji":"🥩","description":"Thịt trâu khô gác bếp thơm ngon, không chất bảo quản","unit":"500g"},
  {"id":13,"name":"Thịt Lợn Khô","category":"food","price":620000,"originalPrice":620000,"image":"","emoji":"🥩","description":"Thịt lợn khô truyền thống, đậm đà hương vị Tây Bắc","unit":"500g"},
  {"id":14,"name":"Thịt Bò Khô","category":"food","price":890000,"originalPrice":890000,"image":"","emoji":"🥩","description":"Thịt bò khô cao cấp, giàu protein","unit":"500g"},
  {"id":15,"name":"Hạt Kỳ Tử Đỏ","category":"herbal","price":380000,"originalPrice":380000,"image":"","emoji":"🔴","description":"Hạt kỳ tử đỏ Ninh Hạ, tốt cho mắt và gan","unit":"500g"},
  {"id":16,"name":"Nhung Hươu Ngâm Mật Ong","category":"herbal","price":4200000,"originalPrice":4200000,"image":"","emoji":"🦌","description":"Nhung hươu ngâm mật ong tự nhiên, bổ dương tráng thận","unit":"100g"},
  {"id":17,"name":"Sâm Cau","category":"herbal","price":130000,"originalPrice":130000,"image":"images/sam-cau.jpg","emoji":"🌿","description":"Sâm cau rừng tự nhiên, tăng cường sinh lực","unit":"1kg"},
  {"id":18,"name":"Tinh Dầu Quế Nguyên Chất","category":"oil","price":375000,"originalPrice":375000,"image":"images/tinh-dau-que.jpg","emoji":"🧴","description":"Tinh dầu quế nguyên chất, kháng khuẩn tự nhiên","unit":"1 chai"},
  {"id":19,"name":"Tinh Dầu Xả","category":"oil","price":350000,"originalPrice":350000,"image":"","emoji":"🧴","description":"Tinh dầu xả thơm mát, đuổi muỗi hiệu quả","unit":"30ml"},
  {"id":20,"name":"Ngô Tím Cay","category":"food","price":180000,"originalPrice":180000,"image":"","emoji":"🌽","description":"Ngô tím cay đặc sản Tây Bắc, vị ngọt tự nhiên","unit":"1kg"},
  {"id":21,"name":"Trinh Nữ Hoàng Cung","category":"herbal","price":2800000,"originalPrice":2800000,"image":"","emoji":"🌸","description":"Trinh nữ hoàng cung quý hiếm, dưỡng nhan sắc phụ nữ","unit":"100g"},
  {"id":22,"name":"Lá Lam Đường Hoặc","category":"herbal","price":450000,"originalPrice":450000,"image":"images/la-lam-duong-hoac.jpg","emoji":"🍃","description":"Lá lam đường hoặc tự nhiên từ vùng cao Tây Bắc","unit":"1kg"},
  {"id":23,"name":"Măng Rói","category":"food","price":185000,"originalPrice":185000,"image":"images/mang-roi.jpg","emoji":"🎋","description":"Măng rói khô đặc sản Tây Bắc, vị ngọt tự nhiên","unit":"1kg"},
  {"id":24,"name":"Sâm Tố Nữ","category":"herbal","price":650000,"originalPrice":650000,"image":"images/sam-to-nu.jpg","emoji":"🌿","description":"Sâm tố nữ quý hiếm, tốt cho sức khỏe phụ nữ","unit":"1kg"}
];

// Shopping cart
let products = [];
let cart = [];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const contactForm = document.getElementById('contactForm');

// ==========================================
// Initialize
// ==========================================
document.addEventListener('DOMContentLoaded', async function() {
    await loadProductsFromJSON();
    loadAdminOverrides();
    displayProducts(products);
    updateCartDisplay();
    loadCartFromStorage();
    initializeNavigation();
});

// Load products from JSON (single source of truth)
// Falls back to embedded data when fetch fails (e.g. file:// protocol)
async function loadProductsFromJSON() {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) throw new Error('Failed to load products');
        products = await response.json();
    } catch (error) {
        console.warn('Fetch failed (likely file:// protocol), using fallback data:', error.message);
        products = JSON.parse(JSON.stringify(PRODUCTS_FALLBACK));
    }
}

// Load admin price/data overrides from localStorage
function loadAdminOverrides() {
    const savedProducts = localStorage.getItem('websiteProducts');
    if (savedProducts) {
        try {
            const parsedProducts = JSON.parse(savedProducts);
            parsedProducts.forEach(savedProduct => {
                const product = products.find(p => p.id === savedProduct.id);
                if (product) {
                    Object.assign(product, savedProduct);
                }
            });
        } catch (e) {
            console.warn('Error loading admin overrides:', e);
        }
    }
}

// ==========================================
// Product Display
// ==========================================
function displayProducts(productsToShow) {
    if (!productsGrid) return;
    productsGrid.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.dataset.category = product.category;

    // Determine image display
    let imageContent;
    if (product.image) {
        imageContent = `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <span class="emoji-fallback" style="display:none;font-size:4rem;">${product.emoji || '📦'}</span>`;
    } else {
        imageContent = `<span style="font-size: 4rem;">${product.emoji || '📦'}</span>`;
    }

    const priceDisplay = product.originalPrice && product.originalPrice !== product.price
        ? `<span class="original-price-tag">${formatPrice(product.originalPrice)}</span> ${formatPrice(product.price)}`
        : formatPrice(product.price);

    productCard.innerHTML = `
        <div class="product-image">
            ${imageContent}
        </div>
        <div class="product-info">
            <h3>${escapeHtml(product.name)}</h3>
            <p>${escapeHtml(product.description)}</p>
            <div class="product-unit">${escapeHtml(product.unit || '')}</div>
            <div class="product-price">${priceDisplay}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> Thêm vào giỏ
            </button>
        </div>
    `;

    return productCard;
}

// ==========================================
// Price Formatting
// ==========================================
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// ==========================================
// XSS Protection
// ==========================================
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================================
// Product Filtering
// ==========================================
function filterProducts(category) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));

    // Find clicked button by category
    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });

    if (category === 'all') {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }
}

// ==========================================
// Shopping Cart
// ==========================================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            quantity: 1
        });
    }

    updateCartDisplay();
    saveCartToStorage();
    showNotification('Đã thêm đặc sản vào giỏ hàng!');
}

function updateCartDisplay() {
    if (!cartCount) return;
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    displayCartItems();
    updateCartTotal();
}

function displayCartItems() {
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-basket"></i><p>Giỏ hàng trống</p></div>';
        return;
    }

    cartItems.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${escapeHtml(item.name)}</h4>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
            saveCartToStorage();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCartToStorage();
    showNotification('Đã xóa sản phẩm khỏi giỏ hàng');
}

function updateCartTotal() {
    if (!cartTotal) return;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(total);
}

// Cart persistence
function saveCartToStorage() {
    localStorage.setItem('dacSanCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    try {
        const saved = localStorage.getItem('dacSanCart');
        if (saved) {
            cart = JSON.parse(saved);
            updateCartDisplay();
        }
    } catch (e) {
        console.warn('Error loading cart:', e);
    }
}

// ==========================================
// Cart Modal
// ==========================================
function toggleCart() {
    if (!cartModal) return;
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

// Close cart when clicking outside
if (cartModal) {
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            toggleCart();
        }
    });
}

// ==========================================
// Checkout
// ==========================================
function checkout() {
    if (cart.length === 0) {
        showNotification('Giỏ hàng trống!', 'error');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderLines = cart.map(item =>
        `• ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`
    ).join('\n');

    // Build Zalo message
    const zaloMessage = encodeURIComponent(
        `🌿 ĐƠN HÀNG ĐẶC SẢN TÂY BẮC\n\n${orderLines}\n\n💰 Tổng cộng: ${formatPrice(total)}\n\n📱 Xin hãy xác nhận đơn hàng giúp em ạ!`
    );
    const zaloLink = `https://zalo.me/0988040027`;

    // Show order summary then redirect
    const confirmOrder = confirm(
        `📋 ĐƠN HÀNG CỦA BẠN:\n\n${orderLines}\n\n💰 Tổng cộng: ${formatPrice(total)}\n\nNhấn OK để gửi đơn qua Zalo`
    );

    if (confirmOrder) {
        // Clear cart
        cart = [];
        updateCartDisplay();
        saveCartToStorage();
        toggleCart();
        // Open Zalo
        window.open(zaloLink, '_blank');
        showNotification('Cảm ơn bạn! Đang chuyển sang Zalo để xác nhận đơn hàng.');
    }
}

// ==========================================
// Navigation
// ==========================================
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function initializeNavigation() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Active nav on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu on link click (mobile)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            });
        });
    }
}

// ==========================================
// Contact Form
// ==========================================
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !phone || !message) {
            showNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
            return;
        }

        // Build Zalo message for contact
        const contactMsg = encodeURIComponent(
            `📨 LIÊN HỆ TỪ WEBSITE\n\nHọ tên: ${name}\nSĐT: ${phone}\nEmail: ${email}\nNội dung: ${message}`
        );

        showNotification('Cảm ơn bạn đã liên hệ! Đang chuyển sang Zalo...');
        contactForm.reset();

        setTimeout(() => {
            window.open(`https://zalo.me/0988040027`, '_blank');
        }, 1000);
    });
}

// ==========================================
// Search
// ==========================================
function searchProducts(query) {
    if (!query || query.trim() === '') {
        displayProducts(products);
        return;
    }
    const q = query.toLowerCase();
    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q)
    );
    displayProducts(filtered);
}

// ==========================================
// Notifications
// ==========================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 350px;
        font-size: 0.95rem;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Notification CSS
const notifStyle = document.createElement('style');
notifStyle.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .original-price-tag {
        text-decoration: line-through;
        color: #999;
        font-size: 0.9rem;
        margin-right: 0.5rem;
    }
    .product-unit {
        color: #888;
        font-size: 0.85rem;
        margin-bottom: 0.5rem;
    }
    .emoji-fallback {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
`;
document.head.appendChild(notifStyle);
