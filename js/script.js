// Sample products data - Đặc sản Tây Bắc
let products = [
    { id: 1, name: "Tam thất Bắc Thái Lat", category: "herbal", price: 1300000, originalPrice: 1300000, image: "images/tam that bac thai lat 1tr3 1kg.jpg", description: "Tam thất Bắc Thái Lat cao cấp từ Tây Bắc", unit: "1kg" },
    { id: 2, name: "Hà thủ ô", category: "herbal", price: 80000, originalPrice: 80000, image: "🍃", description: "Hà thủ ô tự nhiên", unit: "100g" },
    { id: 3, name: "Mật ong rừng U Minh", category: "food", price: 150000, originalPrice: 150000, image: "🍯", description: "Mật ong rừng nguyên chất", unit: "500ml" },
    { id: 4, name: "Thảo quả", category: "herbal", price: 95000, originalPrice: 95000, image: "�", description: "Thảo quả khô Tây Bắc", unit: "100g" },
    { id: 5, name: "Đông trùng hạ thảo", category: "herbal", price: 350000, originalPrice: 350000, image: "�", description: "Đông trùng hạ thảo tự nhiên", unit: "10g" },
    { id: 6, name: "Nấm linh chi đỏ", category: "herbal", price: 200000, originalPrice: 200000, image: "�", description: "Nấm linh chi đỏ Tây Bắc", unit: "100g" },
    {
        id: 7,
        name: "Sâm Ngọc Linh",
        price: 5500000,
        category: "herbal",
        image: "🌿",
        description: "Sâm Ngọc Linh chính gốc, quý hiếm và tốt cho sức khỏe"
    },
    {
        id: 8,
        name: "Tam Thất Hoang",
        price: 3800000,
        category: "herbal",
        image: "🌱",
        description: "Tam thất hoang tự nhiên, giá trị dinh dưỡng cao"
    },
    {
        id: 9,
        name: "Mắc Ca Khô",
        price: 320000,
        originalPrice: 320000,
        category: "food",
        image: "images/mac ca kho 320k 1 kg.jpg",
        description: "Mắc ca khô tự nhiên, giàu dinh dưỡng và chất béo tốt",
        unit: "1kg"
    },
    {
        id: 10,
        name: "Quả Sim Rừng",
        price: 280000,
        category: "food",
        image: "🫐",
        description: "Quả sim rừng tươi, hương vị đặc trưng vùng cao"
    },
    {
        id: 11,
        name: "Nấm Lim Xanh",
        price: 2200000,
        category: "herbal",
        image: "�",
        description: "Nấm lim xanh rừng quý hiếm, tăng cường miễn dịch"
    },
    {
        id: 12,
        name: "Thịt Trâu Khô",
        price: 750000,
        category: "food",
        image: "🥩",
        description: "Thịt trâu khô thơm ngon, không chất bảo quản"
    },
    {
        id: 13,
        name: "Thịt Lợn Khô",
        price: 620000,
        category: "food",
        image: "🥩",
        description: "Thịt lợn khô truyền thống, đậm đà hương vị"
    },
    {
        id: 14,
        name: "Thịt Bò Khô",
        price: 890000,
        category: "food",
        image: "🥩",
        description: "Thịt bò khô cao cấp, giàu protein"
    },
    {
        id: 15,
        name: "Hạt Kỳ Tử Đỏ",
        price: 380000,
        category: "herbal",
        image: "🔴",
        description: "Hạt kỳ tử đỏ Ninh Hạ, tốt cho mắt và gan"
    },
    {
        id: 16,
        name: "Nhung Hươu Ngâm Mật Ong",
        price: 4200000,
        category: "herbal",
        image: "🦌",
        description: "Nhung hươu ngâm mật ong tự nhiên, bổ dương tráng thận"
    },
    {
        id: 17,
        name: "Sâm Cau",
        price: 130000,
        originalPrice: 130000,
        category: "herbal",
        image: "images/sam cau 130k 1kg.jpg",
        description: "Sâm cau rừng tự nhiên, tăng cường sinh lực",
        unit: "1kg"
    },
    {
        id: 18,
        name: "Tinh Dầu Quế Nguyên Chất",
        price: 375000,
        originalPrice: 375000,
        category: "oil",
        image: "images/tinh dau que nguyen chat 375k 1 chai.jpg",
        description: "Tinh dầu quế nguyên chất, kháng khuẩn tự nhiên",
        unit: "1 chai"
    },
    {
        id: 19,
        name: "Tinh Dầu Xả",
        price: 350000,
        category: "oil",
        image: "🧴",
        description: "Tinh dầu xả thơm mát, đuổi muỗi hiệu quả"
    },
    {
        id: 20,
        name: "Ngô Tím Cay",
        price: 180000,
        category: "food",
        image: "🌽",
        description: "Ngô tím cay đặc sản Tây Bắc, vị ngọt tự nhiên"
    },
    {
        id: 21,
        name: "Trinh Nữ Hoàng Cung",
        price: 2800000,
        category: "herbal",
        image: "�",
        description: "Trinh nữ hoàng cung quý hiếm, dư양 nhan sắc phụ nữ"
    },
    {
        id: 22,
        name: "La Lam Đường Hoặc",
        price: 450000,
        originalPrice: 450000,
        category: "herbal", 
        image: "images/la lam duong hoac 450k 1kg.jpg",
        description: "La lam đường hoặc tự nhiên từ vùng cao Tây Bắc",
        unit: "1kg"
    },
    {
        id: 23,
        name: "Măng Rói",
        price: 185000,
        originalPrice: 185000,
        category: "food",
        image: "images/mang roi 185k 1kg.jpg", 
        description: "Măng rói khô đặc sản Tây Bắc, vị ngọt tự nhiên",
        unit: "1kg"
    },
    {
        id: 24,
        name: "Sâm Tố Nữ",
        price: 650000,
        originalPrice: 650000,
        category: "herbal",
        image: "images/sam to nua 650k 1 kg.jpg",
        description: "Sâm tố nữ quý hiếm, tốt cho phụ nữ",
        unit: "1kg"
    }
];

// Shopping cart
let cart = [];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const contactForm = document.getElementById('contactForm');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadProducts(); // Load updated prices from admin
    displayProducts(products);
    updateCartDisplay();
    initializeNavigation();
});

// Load products from localStorage if admin has updated prices
function loadProducts() {
    const savedProducts = localStorage.getItem('websiteProducts');
    if (savedProducts) {
        try {
            const parsedProducts = JSON.parse(savedProducts);
            // Merge with default products to ensure we have all fields
            parsedProducts.forEach(savedProduct => {
                const defaultProduct = products.find(p => p.id === savedProduct.id);
                if (defaultProduct) {
                    Object.assign(defaultProduct, savedProduct);
                }
            });
        } catch (e) {
            console.log('Error loading saved products');
        }
    }
}

// Display products
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.dataset.category = product.category;
    
    productCard.innerHTML = `
        <div class="product-image">
            <span style="font-size: 4rem;">${product.image}</span>
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">${formatPrice(product.price)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> Thêm vào giỏ
            </button>
        </div>
    `;
    
    return productCard;
}

// Format price to Vietnamese currency
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Filter products
function filterProducts(category) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showNotification('Đã thêm đặc sản vào giỏ hàng!');
}

// Update cart display
function updateCartDisplay() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    displayCartItems();
    updateCartTotal();
}

// Display cart items
function displayCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Giỏ hàng trống</div>';
        return;
    }
    
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Xóa</button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    showNotification('Đã xóa đặc sản khỏi giỏ hàng!');
}

// Update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(total);
}

// Toggle cart modal
function toggleCart() {
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

// Close cart when clicking outside
cartModal.addEventListener('click', function(e) {
    if (e.target === cartModal) {
        toggleCart();
    }
});

// Checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('Giỏ hàng trống!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderDetails = cart.map(item => `${item.name} x${item.quantity}`).join('\n');
    
    // Create order message
    const message = `
Đơn hàng đặc sản Tây Bắc:
${orderDetails}

Tổng cộng: ${formatPrice(total)}

Cảm ơn quý khách đã lựa chọn đặc sản Tây Bắc của chúng tôi!
Chúng tôi sẽ liên hệ xác nhận đơn hàng trong thời gian sớm nhất.
    `.trim();
    
    // You can integrate with a real payment system here
    alert(`Cảm ơn quý khách đã đặt hàng!\n\n${message}\n\nChúng tôi cam kết cung cấp đặc sản Tây Bắc chất lượng cao nhất.`);
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    toggleCart();
}

// Smooth scrolling
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

// Initialize navigation
function initializeNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update navigation on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
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
}

// Contact form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', formData);
    
    showNotification('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
    
    // Reset form
    contactForm.reset();
});

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Search functionality (bonus feature)
function searchProducts(query) {
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filteredProducts);
}

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}
