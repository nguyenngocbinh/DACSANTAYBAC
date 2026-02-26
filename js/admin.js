// ==========================================
// Admin Panel - Đặc Sản Tây Bắc
// Single source of truth: data/products.json
// ==========================================

const CATEGORY_MAP = {
    'herbal': 'Dược liệu',
    'food': 'Thực phẩm',
    'oil': 'Tinh dầu',
    'drink': 'Đồ uống'
};

const CATEGORY_REVERSE = Object.fromEntries(
    Object.entries(CATEGORY_MAP).map(([k, v]) => [v, k])
);

const availableEmojis = [
    '🌿', '🍯', '🌰', '🍵', '🍄', '🌱', '🥜', '🌼', '🥔', '💧', '🫘', '🪷', '🍃',
    '🌸', '🌺', '🌻', '🌷', '🌹', '🥀', '🌾', '🍀', '🍁', '🍂',
    '🥥', '🥑', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏', '🍐', '🍑', '🍒',
    '🍓', '🫐', '🍇', '🍈', '🍉', '🍅', '🫒', '🌶️', '🫑', '🥒', '🥬', '🥦',
    '🍆', '🥕', '🌽', '🥔', '🍠', '🍛', '🍜', '🍝', '🍞', '🥨',
    '🧴', '🦌', '🔴', '🎋', '🥩'
];

let products = [];
let currentProducts = [];
let isLoggedIn = false;
let currentEditingId = null;

// ==========================================
// Initialize
// ==========================================
document.addEventListener('DOMContentLoaded', async function() {
    await loadProductsFromJSON();
    initializeAdmin();
});

async function loadProductsFromJSON() {
    try {
        const response = await fetch('../data/products.json');
        if (!response.ok) throw new Error('Failed to load products');
        const data = await response.json();
        // Map JSON format to admin format
        products = data.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            category: CATEGORY_MAP[p.category] || p.category,
            categoryCode: p.category,
            emoji: p.emoji || '📦',
            description: p.description,
            unit: p.unit || '',
            imageUrl: p.image || ''
        }));
        currentProducts = [...products];
        document.getElementById('totalProducts').textContent = products.length;
    } catch (error) {
        console.error('Error loading products:', error);
        showStatusMessage('❌ Không thể tải dữ liệu sản phẩm!', 'error');
    }
}

function initializeAdmin() {
    setupEventListeners();
    generateEmojiPicker();
    checkLoginStatus();
}

function setupEventListeners() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    const editForm = document.getElementById('editForm');
    if (editForm) editForm.addEventListener('submit', handleEditSubmit);
}

function generateEmojiPicker() {
    const emojiPicker = document.getElementById('emojiPicker');
    if (!emojiPicker) return;
    emojiPicker.innerHTML = '';

    availableEmojis.forEach(emoji => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'emoji-option';
        button.textContent = emoji;
        button.onclick = () => selectEmoji(emoji, button);
        emojiPicker.appendChild(button);
    });
}

function selectEmoji(emoji, button) {
    document.querySelectorAll('.emoji-option').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    document.getElementById('editEmoji').value = emoji;
}

// ==========================================
// Authentication (SHA-256 hashed)
// ==========================================
function checkLoginStatus() {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        showDashboard();
    } else {
        showLogin();
    }
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    hashPassword(password).then(hashedPw => {
        const validUsers = {
            'admin': '86574abbdfb97cca59f5ccd35b7506c998a0059bd5cc1f37ca4bebb629edaa87'
        };

        if (validUsers[username] && validUsers[username] === hashedPw) {
            localStorage.setItem('adminLoggedIn', 'true');
            showStatusMessage('✅ Đăng nhập thành công!', 'success');
            setTimeout(() => showDashboard(), 1000);
        } else {
            showStatusMessage('❌ Sai tên đăng nhập hoặc mật khẩu!', 'error');
        }
    });
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'dacsantaybac_salt');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function showLogin() {
    document.getElementById('loginModal').style.display = 'flex';
    document.getElementById('dashboard').classList.remove('active');
    isLoggedIn = false;
}

function showDashboard() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('dashboard').classList.add('active');
    isLoggedIn = true;
    loadProducts();
    updateStatistics();
}

function logout() {
    localStorage.removeItem('adminLoggedIn');
    showStatusMessage('👋 Đã đăng xuất!', 'success');
    setTimeout(() => {
        showLogin();
        document.getElementById('loginForm').reset();
    }, 1000);
}

// ==========================================
// Product Management
// ==========================================
function loadProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    currentProducts.forEach(product => {
        const currentPrice = getCurrentPrice(product.id);
        const currentData = getCurrentProductData(product.id);
        const hasChangedPrice = currentPrice !== product.price;
        const hasChangedImage = currentData.emoji !== product.emoji || currentData.imageUrl !== product.imageUrl;
        const hasChangedInfo = currentData.name !== product.name || currentData.description !== product.description;

        const displayEmoji = currentData.emoji || product.emoji;
        const displayImageUrl = currentData.imageUrl || product.imageUrl;
        const displayName = currentData.name || product.name;
        const displayCategory = currentData.category || product.category;
        const displayDescription = currentData.description || product.description;

        // Resolve image URL path for admin subfolder
        const imgSrc = displayImageUrl ? (displayImageUrl.startsWith('http') ? displayImageUrl : '../' + displayImageUrl) : '';

        grid.innerHTML += `
            <div class="product-card" data-category="${displayCategory}" data-name="${displayName.toLowerCase()}">
                <div class="product-header">
                    <h4>${escapeHtml(displayName)}</h4>
                    <span class="product-emoji">${displayEmoji}</span>
                </div>
                <div class="product-image-section">
                    <div class="product-image-preview">
                        ${imgSrc
                            ? `<img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(displayName)}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
                               <span style="display:none;font-size:2.5rem;">${displayEmoji}</span>`
                            : displayEmoji}
                    </div>
                    <div class="image-url-display">${displayImageUrl ? escapeHtml(displayImageUrl) : 'Chỉ sử dụng emoji'}</div>
                </div>
                <div class="product-info">
                    <p><strong>Danh mục:</strong> ${escapeHtml(displayCategory)}</p>
                    <p><strong>Mô tả:</strong> ${escapeHtml(displayDescription)}</p>
                    ${product.unit ? `<p><strong>Đơn vị:</strong> ${escapeHtml(product.unit)}</p>` : ''}
                </div>
                <div class="price-section">
                    <div class="price-display">
                        <span class="original-price">Giá gốc: ${formatPrice(product.price)}</span>
                        <span class="current-price">Hiện tại: ${formatPrice(currentPrice)}</span>
                    </div>
                    ${hasChangedPrice ? '<small style="color:#28a745;font-weight:bold;">💰 Giá đã thay đổi</small>' : ''}
                    ${hasChangedImage ? '<small style="color:#6f42c1;font-weight:bold;">🖼️ Ảnh đã thay đổi</small>' : ''}
                    ${hasChangedInfo ? '<small style="color:#fd7e14;font-weight:bold;">📝 Thông tin đã thay đổi</small>' : ''}
                </div>
                <div class="price-edit">
                    <input type="number" class="price-input" id="price${product.id}" placeholder="${currentPrice}" value="${currentPrice}">
                    <button class="btn-sm btn-edit" onclick="updatePrice(${product.id})"><i class="fas fa-save"></i></button>
                </div>
                <div class="product-actions">
                    <button class="btn-sm btn-edit" onclick="openEditModal(${product.id})"><i class="fas fa-edit"></i> Chỉnh sửa</button>
                    <button class="btn-sm btn-reset" onclick="resetProduct(${product.id})"><i class="fas fa-undo"></i> Reset</button>
                </div>
            </div>
        `;
    });
}

function getCurrentPrice(productId) {
    const saved = localStorage.getItem(`product_${productId}_price`);
    if (saved) return parseInt(saved);
    const product = products.find(p => p.id === productId);
    return product ? product.price : 0;
}

function getCurrentProductData(productId) {
    const saved = localStorage.getItem(`product_${productId}_data`);
    if (saved) return JSON.parse(saved);
    const product = products.find(p => p.id === productId);
    return product ? { ...product } : {};
}

function updatePrice(productId) {
    const input = document.getElementById(`price${productId}`);
    const newPrice = parseInt(input.value);

    if (isNaN(newPrice) || newPrice <= 0) {
        showStatusMessage('❌ Vui lòng nhập giá hợp lệ!', 'error');
        return;
    }

    localStorage.setItem(`product_${productId}_price`, newPrice);
    const product = products.find(p => p.id === productId);
    showStatusMessage(`✅ Đã cập nhật giá ${product.name} thành ${formatPrice(newPrice)}`, 'success');
    syncToWebsite();
    loadProducts();
    updateStatistics();
}

function openEditModal(productId) {
    currentEditingId = productId;
    const product = products.find(p => p.id === productId);
    const currentData = getCurrentProductData(productId);

    document.getElementById('editTitle').textContent = `Chỉnh sửa: ${product.name}`;
    document.getElementById('editName').value = currentData.name || product.name;
    document.getElementById('editCategory').value = currentData.category || product.category;
    document.getElementById('editPrice').value = getCurrentPrice(productId);
    document.getElementById('editDescription').value = currentData.description || product.description;
    document.getElementById('editEmoji').value = currentData.emoji || product.emoji;
    document.getElementById('editImageUrl').value = currentData.imageUrl || product.imageUrl || '';

    document.querySelectorAll('.emoji-option').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.textContent === (currentData.emoji || product.emoji)) btn.classList.add('selected');
    });

    document.getElementById('editModal').classList.add('active');
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('active');
    currentEditingId = null;
}

function handleEditSubmit(e) {
    e.preventDefault();
    if (!currentEditingId) return;

    const newData = {
        name: document.getElementById('editName').value,
        category: document.getElementById('editCategory').value,
        description: document.getElementById('editDescription').value,
        emoji: document.getElementById('editEmoji').value,
        imageUrl: document.getElementById('editImageUrl').value
    };

    const newPrice = parseInt(document.getElementById('editPrice').value);

    localStorage.setItem(`product_${currentEditingId}_data`, JSON.stringify(newData));
    localStorage.setItem(`product_${currentEditingId}_price`, newPrice);

    const product = products.find(p => p.id === currentEditingId);
    showStatusMessage(`✅ Đã cập nhật thông tin ${product.name}`, 'success');

    syncToWebsite();
    closeEditModal();
    loadProducts();
    updateStatistics();
}

// Sync admin changes to website (via websiteProducts localStorage)
function syncToWebsite() {
    const websiteData = products.map(p => {
        const data = getCurrentProductData(p.id);
        const price = getCurrentPrice(p.id);
        return {
            id: p.id,
            name: data.name || p.name,
            price: price,
            category: CATEGORY_REVERSE[data.category || p.category] || p.categoryCode,
            image: data.imageUrl || p.imageUrl,
            emoji: data.emoji || p.emoji,
            description: data.description || p.description,
            unit: p.unit
        };
    });
    localStorage.setItem('websiteProducts', JSON.stringify(websiteData));
}

function resetProduct(productId) {
    if (confirm('Bạn có chắc muốn khôi phục sản phẩm này về trạng thái ban đầu?')) {
        localStorage.removeItem(`product_${productId}_price`);
        localStorage.removeItem(`product_${productId}_data`);
        const product = products.find(p => p.id === productId);
        showStatusMessage(`🔄 Đã khôi phục "${product.name}" về trạng thái ban đầu`, 'success');
        syncToWebsite();
        loadProducts();
        updateStatistics();
    }
}

function resetAllData() {
    if (confirm('Bạn có chắc muốn khôi phục TẤT CẢ sản phẩm về trạng thái ban đầu?')) {
        products.forEach(p => {
            localStorage.removeItem(`product_${p.id}_price`);
            localStorage.removeItem(`product_${p.id}_data`);
        });
        localStorage.removeItem('websiteProducts');
        showStatusMessage('🔄 Đã khôi phục tất cả sản phẩm!', 'success');
        loadProducts();
        updateStatistics();
    }
}

function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;

    document.querySelectorAll('.product-card').forEach(card => {
        const name = card.getAttribute('data-name');
        const category = card.getAttribute('data-category');
        const matchesSearch = name.includes(searchTerm);
        const matchesCategory = !categoryFilter || category === categoryFilter;
        card.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
    });
}

function updateStatistics() {
    let modifiedPrices = 0, modifiedImages = 0, totalPrice = 0;

    products.forEach(product => {
        const currentPrice = getCurrentPrice(product.id);
        const currentData = getCurrentProductData(product.id);
        totalPrice += currentPrice;
        if (currentPrice !== product.price) modifiedPrices++;
        if (currentData.emoji !== product.emoji || currentData.imageUrl !== product.imageUrl ||
            currentData.name !== product.name || currentData.description !== product.description) {
            modifiedImages++;
        }
    });

    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('modifiedProducts').textContent = modifiedPrices;
    document.getElementById('modifiedImages').textContent = modifiedImages;
    document.getElementById('averagePrice').textContent = products.length > 0
        ? formatPrice(Math.round(totalPrice / products.length))
        : '0₫';
}

// ==========================================
// Utilities
// ==========================================
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showStatusMessage(message, type) {
    const el = document.getElementById('statusMessage');
    if (!el) return;
    el.textContent = message;
    el.className = `status-message ${type} show`;
    setTimeout(() => el.classList.remove('show'), 4000);
}

// ==========================================
// Excel Export/Import
// ==========================================
function exportToExcel() {
    const exportData = currentProducts.map(product => {
        const currentPrice = getCurrentPrice(product.id);
        const currentData = getCurrentProductData(product.id);
        return {
            'ID': product.id,
            'Tên sản phẩm': currentData.name || product.name,
            'Danh mục': CATEGORY_REVERSE[currentData.category || product.category] || product.categoryCode,
            'Giá gốc': product.price,
            'Giá hiện tại': currentPrice,
            'Hình ảnh': currentData.imageUrl || currentData.emoji || product.emoji,
            'Mô tả': currentData.description || product.description,
            'Đơn vị': product.unit || ''
        };
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sản phẩm");

    const colWidths = Object.keys(exportData[0]).map((key, i) => {
        const maxLen = Math.max(key.length, ...exportData.map(row => String(row[key] || '').length));
        return { width: Math.min(maxLen + 2, 50) };
    });
    ws['!cols'] = colWidths;

    XLSX.writeFile(wb, `dacsantaybac_products_${new Date().toISOString().split('T')[0]}.xlsx`);
    showStatusMessage('✅ Đã xuất file Excel thành công!', 'success');
}

function downloadTemplate() {
    const templateData = [
        { 'ID': 1, 'Tên sản phẩm': 'Tam thất khô', 'Danh mục': 'herbal', 'Giá gốc': 120000, 'Giá hiện tại': 120000, 'Hình ảnh': '🌿', 'Mô tả': 'Tam thất khô cao cấp từ Tây Bắc', 'Đơn vị': '100g' },
        { 'ID': 2, 'Tên sản phẩm': 'Mật ong rừng', 'Danh mục': 'food', 'Giá gốc': 250000, 'Giá hiện tại': 250000, 'Hình ảnh': 'images/mat-ong-rung.jpg', 'Mô tả': 'Mật ong rừng nguyên chất', 'Đơn vị': '500ml' }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");

    const instructions = [
        ['HƯỚNG DẪN SỬ DỤNG FILE EXCEL'],
        [''],
        ['1. Cột ID: Số thứ tự sản phẩm (bắt buộc)'],
        ['2. Cột Tên sản phẩm: Tên hiển thị'],
        ['3. Cột Danh mục: herbal, food, oil, drink'],
        ['4. Cột Giá gốc: Giá ban đầu'],
        ['5. Cột Giá hiện tại: Giá bán hiện tại'],
        ['6. Cột Hình ảnh: Link ảnh hoặc emoji'],
        ['7. Cột Mô tả: Mô tả chi tiết'],
        ['8. Cột Đơn vị: 100g, 1kg, 500ml...']
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(instructions), "Hướng dẫn");

    XLSX.writeFile(wb, 'template_dacsantaybac_products.xlsx');
    showStatusMessage('✅ Đã tải file mẫu Excel!', 'success');
}

function openImportModal() {
    document.getElementById('importModal').style.display = 'flex';
}

function closeImportModal() {
    document.getElementById('importModal').style.display = 'none';
    document.getElementById('importFile').value = '';
    document.getElementById('overwriteData').checked = false;
}

function processImportFile() {
    const file = document.getElementById('importFile').files[0];
    if (!file) {
        showStatusMessage('❌ Vui lòng chọn file để import!', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

            if (jsonData.length === 0) {
                showStatusMessage('❌ File không có dữ liệu!', 'error');
                return;
            }

            const required = ['ID', 'Tên sản phẩm', 'Danh mục', 'Giá gốc', 'Giá hiện tại'];
            const missing = required.filter(col => !(col in jsonData[0]));
            if (missing.length > 0) {
                showStatusMessage(`❌ File thiếu cột: ${missing.join(', ')}`, 'error');
                return;
            }

            importProducts(jsonData);
        } catch (error) {
            console.error('Import error:', error);
            showStatusMessage('❌ Lỗi đọc file!', 'error');
        }
    };
    reader.readAsArrayBuffer(file);
}

function importProducts(importData) {
    const overwrite = document.getElementById('overwriteData').checked;
    let imported = 0, updated = 0, errors = 0;

    importData.forEach(row => {
        try {
            const id = parseInt(row['ID']);
            const name = row['Tên sản phẩm']?.toString().trim();
            const category = row['Danh mục']?.toString().trim();
            const originalPrice = parseInt(row['Giá gốc']);
            const currentPrice = parseInt(row['Giá hiện tại']);
            const image = row['Hình ảnh']?.toString().trim() || '';
            const description = row['Mô tả']?.toString().trim() || '';

            if (!id || !name || !category || isNaN(originalPrice) || isNaN(currentPrice)) {
                errors++; return;
            }

            const validCats = ['herbal', 'food', 'oil', 'drink'];
            if (!validCats.includes(category)) { errors++; return; }

            const catDisplay = CATEGORY_MAP[category] || category;

            localStorage.setItem(`product_${id}_price`, currentPrice.toString());
            localStorage.setItem(`product_${id}_data`, JSON.stringify({
                name, category: catDisplay, description,
                emoji: image.startsWith('images/') ? '📦' : image,
                imageUrl: image.startsWith('images/') ? image : ''
            }));

            const exists = currentProducts.findIndex(p => p.id === id);
            exists >= 0 ? updated++ : imported++;
        } catch (err) {
            errors++;
        }
    });

    syncToWebsite();
    loadProducts();
    updateStatistics();
    closeImportModal();

    let msg = 'Import hoàn thành! ';
    if (imported > 0) msg += `Thêm mới: ${imported}. `;
    if (updated > 0) msg += `Cập nhật: ${updated}. `;
    if (errors > 0) msg += `Lỗi: ${errors} dòng.`;
    showStatusMessage(msg, (imported > 0 || updated > 0) ? 'success' : 'error');
}
