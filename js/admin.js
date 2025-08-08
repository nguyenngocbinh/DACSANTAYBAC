// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.products = [];
        this.originalProducts = [];
        this.isLoggedIn = false;
        this.init();
    }

    init() {
        // Load products from main script
        this.loadProducts();
        this.setupEventListeners();
        this.checkLoginStatus();
        this.updateStats();
    }

    loadProducts() {
        // Products data (from main script.js)
        this.originalProducts = [
            { id: 1, name: "Tam thất Bắc thái lát", category: "herbal", price: 1300000, originalPrice: 1300000, image: "images/tam that bac thai lat 1tr3 1kg.jpg", description: "Tam thất Bắc Thái Lat cao cấp từ Tây Bắc", unit: "1kg" },
            { id: 2, name: "Hà thủ ô", category: "herbal", price: 80000, originalPrice: 80000, image: "🍃", description: "Hà thủ ô tự nhiên", unit: "100g" },
            { id: 3, name: "Mật ong rừng U Minh", category: "food", price: 150000, originalPrice: 150000, image: "🍯", description: "Mật ong rừng nguyên chất", unit: "500ml" },
            { id: 4, name: "Thảo quả", category: "herbal", price: 95000, originalPrice: 95000, image: "�", description: "Thảo quả khô Tây Bắc", unit: "100g" },
            { id: 5, name: "Đông trùng hạ thảo", category: "herbal", price: 350000, originalPrice: 350000, image: "�", description: "Đông trùng hạ thảo tự nhiên", unit: "10g" },
            { id: 6, name: "Nấm linh chi đỏ", category: "herbal", price: 200000, originalPrice: 200000, image: "�", description: "Nấm linh chi đỏ Tây Bắc", unit: "100g" },
            { id: 7, name: "Sâm Ngọc Linh", price: 5500000, originalPrice: 5500000, category: "herbal", image: "🌿", description: "Sâm Ngọc Linh chính gốc, quý hiếm và tốt cho sức khỏe" },
            { id: 8, name: "Tam Thất Hoang", price: 3800000, originalPrice: 3800000, category: "herbal", image: "🌱", description: "Tam thất hoang tự nhiên, giá trị dinh dưỡng cao" },
            { id: 9, name: "Mắc Ca Khô", price: 320000, originalPrice: 320000, category: "food", image: "images/mac ca kho 320k 1 kg.jpg", description: "Mắc ca khô tự nhiên, giàu dinh dưỡng và chất béo tốt", unit: "1kg" },
            { id: 10, name: "Quả Sim Rừng", price: 280000, originalPrice: 280000, category: "food", image: "🫐", description: "Quả sim rừng tươi, hương vị đặc trưng vùng cao" },
            { id: 11, name: "Nấm Lim Xanh", price: 2200000, originalPrice: 2200000, category: "herbal", image: "�", description: "Nấm lim xanh rừng quý hiếm, tăng cường miễn dịch" },
            { id: 12, name: "Thịt Trâu Khô", price: 750000, originalPrice: 750000, category: "food", image: "🥩", description: "Thịt trâu khô thơm ngon, không chất bảo quản" },
            { id: 13, name: "Thịt Lợn Khô", price: 620000, originalPrice: 620000, category: "food", image: "🥩", description: "Thịt lợn khô truyền thống, đậm đà hương vị" },
            { id: 14, name: "Thịt Bò Khô", price: 890000, originalPrice: 890000, category: "food", image: "🥩", description: "Thịt bò khô cao cấp, giàu protein" },
            { id: 15, name: "Hạt Kỳ Tử Đỏ", price: 380000, originalPrice: 380000, category: "herbal", image: "🔴", description: "Hạt kỳ tử đỏ Ninh Hạ, tốt cho mắt và gan" },
            { id: 16, name: "Nhung Hươu Ngâm Mật Ong", price: 4200000, originalPrice: 4200000, category: "herbal", image: "🦌", description: "Nhung hươu ngâm mật ong tự nhiên, bổ dương tráng thận" },
            { id: 17, name: "Sâm Cau", price: 130000, originalPrice: 130000, category: "herbal", image: "images/sam cau 130k 1kg.jpg", description: "Sâm cau rừng tự nhiên, tăng cường sinh lực", unit: "1kg" },
            { id: 18, name: "Tinh Dầu Quế Nguyên Chất", price: 375000, originalPrice: 375000, category: "oil", image: "images/tinh dau que nguyen chat 375k 1 chai.jpg", description: "Tinh dầu quế nguyên chất, kháng khuẩn tự nhiên", unit: "1 chai" },
            { id: 19, name: "Tinh Dầu Xả", price: 350000, originalPrice: 350000, category: "oil", image: "🧴", description: "Tinh dầu xả thơm mát, đuổi muỗi hiệu quả" },
            { id: 20, name: "Ngô Tím Cay", price: 180000, originalPrice: 180000, category: "food", image: "🌽", description: "Ngô tím cay đặc sản Tây Bắc, vị ngọt tự nhiên" },
            { id: 21, name: "Trinh Nữ Hoàng Cung", price: 2800000, originalPrice: 2800000, category: "herbal", image: "�", description: "Trinh nữ hoàng cung quý hiếm, dư양 nhan sắc phụ nữ" },
            { id: 22, name: "La Lam Đường Hoặc", price: 450000, originalPrice: 450000, category: "herbal", image: "images/la lam duong hoac 450k 1kg.jpg", description: "La lam đường hoặc tự nhiên từ vùng cao Tây Bắc", unit: "1kg" },
            { id: 23, name: "Măng Rói", price: 185000, originalPrice: 185000, category: "food", image: "images/mang roi 185k 1kg.jpg", description: "Măng rói khô đặc sản Tây Bắc, vị ngọt tự nhiên", unit: "1kg" },
            { id: 24, name: "Sâm Tố Nữ", price: 650000, originalPrice: 650000, category: "herbal", image: "images/sam to nua 650k 1 kg.jpg", description: "Sâm tố nữ quý hiếm, tốt cho phụ nữ", unit: "1kg" }
        ];

        // Load saved products from localStorage
        const savedProducts = localStorage.getItem('adminProducts');
        if (savedProducts) {
            this.products = JSON.parse(savedProducts);
        } else {
            this.products = [...this.originalProducts];
        }
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // View website button
        const viewWebsiteBtn = document.getElementById('viewWebsite');
        if (viewWebsiteBtn) {
            viewWebsiteBtn.addEventListener('click', () => {
                window.open('index.html', '_blank');
            });
        }

        // Search and filter
        const searchInput = document.getElementById('searchProduct');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterProducts());
        }

        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.filterProducts());
        }

        // Edit price form
        const editPriceForm = document.getElementById('editPriceForm');
        if (editPriceForm) {
            editPriceForm.addEventListener('submit', (e) => this.handlePriceEdit(e));
        }

        // Modal close events
        this.setupModalEvents();

        // Backup and restore
        const backupBtn = document.getElementById('backupData');
        if (backupBtn) {
            backupBtn.addEventListener('click', () => this.backupData());
        }

        const restoreBtn = document.getElementById('restoreData');
        if (restoreBtn) {
            restoreBtn.addEventListener('click', () => this.restoreData());
        }

        const resetAllBtn = document.getElementById('resetAll');
        if (resetAllBtn) {
            resetAllBtn.addEventListener('click', () => this.resetAllPrices());
        }
    }

    setupModalEvents() {
        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('admin-modal')) {
                this.closeModal(e.target.id);
            }
        });

        // Close button events
        document.querySelectorAll('.admin-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.admin-modal');
                if (modal) {
                    this.closeModal(modal.id);
                }
            });
        });
    }

    checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        if (isLoggedIn) {
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;

        // Simple authentication (in production, use proper authentication)
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('adminLoggedIn', 'true');
            this.showDashboard();
            this.showNotification('Đăng nhập thành công!', 'success');
        } else {
            this.showNotification('Tên đăng nhập hoặc mật khẩu không đúng!', 'error');
        }
    }

    logout() {
        localStorage.removeItem('adminLoggedIn');
        this.showLogin();
        this.showNotification('Đã đăng xuất thành công!', 'info');
    }

    showLogin() {
        document.getElementById('loginModal').classList.add('active');
        document.getElementById('adminDashboard').classList.remove('active');
    }

    showDashboard() {
        document.getElementById('loginModal').classList.remove('active');
        document.getElementById('adminDashboard').classList.add('active');
        this.renderProducts();
        this.updateStats();
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }

    updateStats() {
        const totalProducts = this.products.length;
        const changedProducts = this.products.filter(p => p.price !== p.originalPrice).length;
        const avgPrice = Math.round(this.products.reduce((sum, p) => sum + p.price, 0) / totalProducts);
        const categories = [...new Set(this.products.map(p => p.category))].length;

        document.getElementById('totalProducts').textContent = totalProducts;
        document.getElementById('changedProducts').textContent = changedProducts;
        document.getElementById('avgPrice').textContent = this.formatPrice(avgPrice);
        document.getElementById('totalCategories').textContent = categories;
    }

    renderProducts() {
        const tbody = document.getElementById('productsTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        const searchTerm = document.getElementById('searchProduct')?.value.toLowerCase() || '';
        const categoryFilter = document.getElementById('categoryFilter')?.value || 'all';

        let filteredProducts = this.products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm);
            const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });

        filteredProducts.forEach(product => {
            const row = document.createElement('tr');
            
            const priceChanged = product.price !== product.originalPrice;
            const priceChange = product.price - product.originalPrice;
            const priceChangePercent = ((priceChange / product.originalPrice) * 100).toFixed(1);

            row.innerHTML = `
                <td>
                    <div class="product-name">${product.name}</div>
                    <small class="text-muted">${product.description}</small>
                </td>
                <td>
                    <span class="product-category category-${product.category}">
                        ${this.getCategoryName(product.category)}
                    </span>
                </td>
                <td>
                    <div class="price-original">${this.formatPrice(product.originalPrice)}</div>
                </td>
                <td>
                    <div class="price-current ${priceChanged ? 'price-changed' : ''}">${this.formatPrice(product.price)}</div>
                    ${priceChanged ? `
                        <div class="change-indicator ${priceChange > 0 ? 'change-up' : 'change-down'}">
                            <i class="fas fa-arrow-${priceChange > 0 ? 'up' : 'down'}"></i>
                            ${priceChangePercent}%
                        </div>
                    ` : ''}
                </td>
                <td>
                    <button class="action-btn btn-edit" onclick="adminPanel.openEditModal(${product.id})" title="Chỉnh sửa giá">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn btn-reset" onclick="adminPanel.resetPrice(${product.id})" title="Khôi phục giá gốc">
                        <i class="fas fa-undo"></i>
                    </button>
                </td>
            `;

            tbody.appendChild(row);
        });
    }

    filterProducts() {
        this.renderProducts();
    }

    getCategoryName(category) {
        const categories = {
            herbal: 'Dược liệu',
            food: 'Thực phẩm',
            drink: 'Đồ uống',
            oil: 'Tinh dầu'
        };
        return categories[category] || category;
    }

    openEditModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        document.getElementById('editProductId').value = product.id;
        document.getElementById('editProductName').value = product.name;
        document.getElementById('editOriginalPrice').value = product.originalPrice;
        document.getElementById('editCurrentPrice').value = product.price;

        this.openModal('editPriceModal');
    }

    handlePriceEdit(e) {
        e.preventDefault();
        
        const productId = parseInt(document.getElementById('editProductId').value);
        const newPrice = parseInt(document.getElementById('editCurrentPrice').value);

        if (newPrice < 0) {
            this.showNotification('Giá không thể âm!', 'error');
            return;
        }

        const product = this.products.find(p => p.id === productId);
        if (product) {
            const oldPrice = product.price;
            product.price = newPrice;
            
            this.saveProducts();
            this.renderProducts();
            this.updateStats();
            this.closeModal('editPriceModal');
            
            this.showNotification(
                `Đã cập nhật giá ${product.name} từ ${this.formatPrice(oldPrice)} thành ${this.formatPrice(newPrice)}`,
                'success'
            );
        }
    }

    resetPrice(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            if (confirm(`Khôi phục giá gốc cho ${product.name}?`)) {
                product.price = product.originalPrice;
                this.saveProducts();
                this.renderProducts();
                this.updateStats();
                this.showNotification(`Đã khôi phục giá gốc cho ${product.name}`, 'success');
            }
        }
    }

    resetAllPrices() {
        if (confirm('Bạn có chắc muốn khôi phục giá gốc cho tất cả sản phẩm?')) {
            this.products.forEach(product => {
                product.price = product.originalPrice;
            });
            this.saveProducts();
            this.renderProducts();
            this.updateStats();
            this.showNotification('Đã khôi phục giá gốc cho tất cả sản phẩm', 'success');
        }
    }

    saveProducts() {
        localStorage.setItem('adminProducts', JSON.stringify(this.products));
        
        // Also update the main website's products (if on same domain)
        try {
            localStorage.setItem('websiteProducts', JSON.stringify(this.products));
        } catch (e) {
            console.log('Could not update website products');
        }
    }

    backupData() {
        const backupData = {
            products: this.products,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };

        const dataStr = JSON.stringify(backupData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `backup-products-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('Đã tải xuống file backup', 'success');
    }

    restoreData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const backupData = JSON.parse(e.target.result);
                    
                    if (backupData.products && Array.isArray(backupData.products)) {
                        if (confirm('Khôi phục dữ liệu sẽ ghi đè lên dữ liệu hiện tại. Bạn có chắc?')) {
                            this.products = backupData.products;
                            this.saveProducts();
                            this.renderProducts();
                            this.updateStats();
                            this.showNotification('Đã khôi phục dữ liệu thành công', 'success');
                        }
                    } else {
                        this.showNotification('File backup không hợp lệ', 'error');
                    }
                } catch (error) {
                    this.showNotification('Lỗi đọc file backup', 'error');
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    }

    formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    }

    showNotification(message, type = 'info') {
        const notification = document.getElementById('adminNotification');
        const messageEl = document.getElementById('notificationMessage');
        
        if (notification && messageEl) {
            messageEl.textContent = message;
            notification.className = `admin-notification show ${type}`;
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 5000);
        }
    }

    closeNotification() {
        const notification = document.getElementById('adminNotification');
        if (notification) {
            notification.classList.remove('show');
        }
    }

    // Excel Export/Import Functions
    exportToExcel() {
        const exportData = this.products.map(product => ({
            'ID': product.id,
            'Tên sản phẩm': product.name,
            'Danh mục': product.category,
            'Giá gốc': product.originalPrice,
            'Giá hiện tại': product.price,
            'Hình ảnh': product.image,
            'Mô tả': product.description,
            'Đơn vị': product.unit || ''
        }));

        // Create CSV content
        const headers = Object.keys(exportData[0]);
        const csvContent = [
            headers.join(','),
            ...exportData.map(row => 
                headers.map(header => {
                    let cell = row[header] || '';
                    // Escape commas and quotes
                    if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"'))) {
                        cell = `"${cell.replace(/"/g, '""')}"`;
                    }
                    return cell;
                }).join(',')
            )
        ].join('\n');

        // Download file
        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `dacsantaybac_products_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showNotification('Đã xuất file Excel (CSV) thành công!', 'success');
    }

    downloadTemplate() {
        const templateData = [
            {
                'ID': 1,
                'Tên sản phẩm': 'Tam thất khô',
                'Danh mục': 'herbal',
                'Giá gốc': 120000,
                'Giá hiện tại': 120000,
                'Hình ảnh': '🌿',
                'Mô tả': 'Tam thất khô cao cấp từ Tây Bắc',
                'Đơn vị': '100g'
            },
            {
                'ID': 2,
                'Tên sản phẩm': 'Mật ong rừng',
                'Danh mục': 'food',
                'Giá gốc': 250000,
                'Giá hiện tại': 250000,
                'Hình ảnh': 'images/mat-ong-rung.jpg',
                'Mô tả': 'Mật ong rừng nguyên chất',
                'Đơn vị': '500ml'
            }
        ];

        const headers = Object.keys(templateData[0]);
        const csvContent = [
            headers.join(','),
            ...templateData.map(row => 
                headers.map(header => {
                    let cell = row[header] || '';
                    if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"'))) {
                        cell = `"${cell.replace(/"/g, '""')}"`;
                    }
                    return cell;
                }).join(',')
            )
        ].join('\n');

        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'template_dacsantaybac_products.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showNotification('Đã tải file mẫu Excel (CSV)!', 'info');
    }

    openImportModal() {
        // Create import modal if not exists
        if (!document.getElementById('importModal')) {
            this.createImportModal();
        }
        document.getElementById('importModal').style.display = 'flex';
    }

    createImportModal() {
        const modal = document.createElement('div');
        modal.id = 'importModal';
        modal.className = 'admin-modal';
        modal.innerHTML = `
            <div class="admin-modal-content" style="width: 500px;">
                <div class="admin-modal-header">
                    <h3><i class="fas fa-file-upload"></i> Import Dữ Liệu Excel/CSV</h3>
                    <button class="admin-close" onclick="adminPanel.closeImportModal()">×</button>
                </div>
                
                <div class="admin-modal-body">
                    <div style="margin-bottom: 1rem;">
                        <label for="importFile">Chọn file CSV (.csv):</label>
                        <input type="file" id="importFile" accept=".csv" style="width: 100%; padding: 8px; margin-top: 5px;">
                        <small style="color: #666; margin-top: 5px; display: block;">
                            File phải có cấu trúc: ID, Tên sản phẩm, Danh mục, Giá gốc, Giá hiện tại, Hình ảnh, Mô tả, Đơn vị
                        </small>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label>
                            <input type="checkbox" id="overwriteData" style="width: auto; margin-right: 10px;">
                            Ghi đè dữ liệu hiện tại (nếu không chọn sẽ chỉ cập nhật các sản phẩm có sẵn)
                        </label>
                    </div>
                    
                    <div style="display: flex; gap: 10px;">
                        <button class="btn btn-success" onclick="adminPanel.processImportFile()" style="flex: 1;">
                            <i class="fas fa-upload"></i> Import Dữ Liệu
                        </button>
                        <button class="btn btn-secondary" onclick="adminPanel.closeImportModal()" style="flex: 1;">
                            <i class="fas fa-times"></i> Hủy
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    closeImportModal() {
        const modal = document.getElementById('importModal');
        if (modal) {
            modal.style.display = 'none';
            const fileInput = document.getElementById('importFile');
            if (fileInput) fileInput.value = '';
            const checkbox = document.getElementById('overwriteData');
            if (checkbox) checkbox.checked = false;
        }
    }

    processImportFile() {
        const fileInput = document.getElementById('importFile');
        const file = fileInput.files[0];
        
        if (!file) {
            this.showNotification('Vui lòng chọn file để import!', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const csv = e.target.result;
                const lines = csv.split('\n');
                
                if (lines.length < 2) {
                    this.showNotification('File không có dữ liệu!', 'error');
                    return;
                }
                
                // Parse CSV
                const headers = lines[0].split(',').map(h => h.trim().replace(/["\uFEFF]/g, ''));
                const requiredColumns = ['ID', 'Tên sản phẩm', 'Danh mục', 'Giá gốc', 'Giá hiện tại'];
                const missingColumns = requiredColumns.filter(col => !headers.includes(col));
                
                if (missingColumns.length > 0) {
                    this.showNotification(`File thiếu các cột bắt buộc: ${missingColumns.join(', ')}`, 'error');
                    return;
                }
                
                const data = [];
                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (!line) continue;
                    
                    const values = this.parseCSVLine(line);
                    const row = {};
                    headers.forEach((header, index) => {
                        row[header] = values[index] || '';
                    });
                    data.push(row);
                }
                
                this.importProducts(data);
                
            } catch (error) {
                console.error('Error reading file:', error);
                this.showNotification('Lỗi đọc file! Vui lòng kiểm tra format file.', 'error');
            }
        };
        
        reader.readAsText(file, 'UTF-8');
    }

    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            const nextChar = line[i + 1];
            
            if (char === '"') {
                if (inQuotes && nextChar === '"') {
                    current += '"';
                    i++; // Skip next quote
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current.trim());
        return result;
    }

    importProducts(importData) {
        const overwrite = document.getElementById('overwriteData').checked;
        let imported = 0;
        let updated = 0;
        let errors = 0;
        
        importData.forEach(row => {
            try {
                const id = parseInt(row['ID']);
                const name = row['Tên sản phẩm']?.toString().trim();
                const category = row['Danh mục']?.toString().trim();
                const originalPrice = parseInt(row['Giá gốc']);
                const currentPrice = parseInt(row['Giá hiện tại']);
                const image = row['Hình ảnh']?.toString().trim() || '';
                const description = row['Mô tả']?.toString().trim() || '';
                const unit = row['Đơn vị']?.toString().trim() || '';
                
                // Validate data
                if (!id || !name || !category || isNaN(originalPrice) || isNaN(currentPrice)) {
                    errors++;
                    return;
                }
                
                // Check valid category
                const validCategories = ['herbal', 'food', 'oil', 'drink'];
                if (!validCategories.includes(category)) {
                    errors++;
                    return;
                }
                
                const existingIndex = this.products.findIndex(p => p.id === id);
                
                if (existingIndex >= 0) {
                    // Update existing product
                    if (overwrite) {
                        this.products[existingIndex] = {
                            id: id,
                            name: name,
                            category: category,
                            price: currentPrice,
                            originalPrice: originalPrice,
                            image: image,
                            description: description,
                            unit: unit
                        };
                    } else {
                        // Only update price
                        this.products[existingIndex].price = currentPrice;
                    }
                    updated++;
                } else if (overwrite) {
                    // Add new product
                    const newProduct = {
                        id: id,
                        name: name,
                        category: category,
                        price: currentPrice,
                        originalPrice: originalPrice,
                        image: image,
                        description: description,
                        unit: unit
                    };
                    
                    this.products.push(newProduct);
                    imported++;
                }
                
            } catch (error) {
                console.error('Error processing row:', row, error);
                errors++;
            }
        });
        
        // Save and refresh
        this.saveProducts();
        this.renderProducts();
        this.updateStats();
        this.closeImportModal();
        
        let message = `Import hoàn thành! `;
        if (imported > 0) message += `Thêm mới: ${imported} sản phẩm. `;
        if (updated > 0) message += `Cập nhật: ${updated} sản phẩm. `;
        if (errors > 0) message += `Lỗi: ${errors} dòng.`;
        
        this.showNotification(message, imported > 0 || updated > 0 ? 'success' : 'warning');
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminPanel = new AdminPanel();
});

// Global functions for button events
window.closeNotification = () => {
    if (window.adminPanel) {
        window.adminPanel.closeNotification();
    }
};

window.exportToExcel = () => {
    if (window.adminPanel) {
        window.adminPanel.exportToExcel();
    }
};

window.downloadTemplate = () => {
    if (window.adminPanel) {
        window.adminPanel.downloadTemplate();
    }
};

window.openImportModal = () => {
    if (window.adminPanel) {
        window.adminPanel.openImportModal();
    }
};
