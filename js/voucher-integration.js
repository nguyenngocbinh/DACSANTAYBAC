// Voucher Integration System for Tây Bắc Website

class VoucherManager {
    constructor() {
        this.vouchers = this.loadVouchers();
        this.init();
    }
    
    init() {
        this.addVoucherSection();
        this.checkGameVouchers();
    }
    
    loadVouchers() {
        return JSON.parse(localStorage.getItem('tayBacVouchers') || '[]');
    }
    
    saveVouchers() {
        localStorage.setItem('tayBacVouchers', JSON.stringify(this.vouchers));
    }
    
    addVoucherSection() {
        // Add voucher input to checkout if it doesn't exist
        const cartFooter = document.querySelector('.cart-footer');
        if (cartFooter && !document.getElementById('voucherSection')) {
            const voucherSection = document.createElement('div');
            voucherSection.id = 'voucherSection';
            voucherSection.className = 'voucher-section';
            voucherSection.innerHTML = `
                <div class="voucher-input-group">
                    <input type="text" id="voucherInput" placeholder="Nhập mã giảm giá" maxlength="20">
                    <button onclick="voucherManager.applyVoucher()" class="voucher-btn">Áp dụng</button>
                </div>
                <div id="voucherStatus" class="voucher-status"></div>
                <div id="gameVoucherList" class="game-voucher-list"></div>
            `;
            
            cartFooter.insertBefore(voucherSection, cartFooter.firstChild);
            this.displayGameVouchers();
        }
    }
    
    checkGameVouchers() {
        // Check if user has new vouchers from game
        const unusedVouchers = this.vouchers.filter(v => !v.used);
        if (unusedVouchers.length > 0) {
            this.showVoucherNotification(unusedVouchers.length);
        }
    }
    
    displayGameVouchers() {
        const gameVoucherList = document.getElementById('gameVoucherList');
        if (!gameVoucherList) return;
        
        const unusedVouchers = this.vouchers.filter(v => !v.used);
        
        if (unusedVouchers.length === 0) {
            gameVoucherList.innerHTML = `
                <div class="no-vouchers">
                    <p><i class="fas fa-gamepad"></i> Chơi mini game để nhận voucher giảm giá!</p>
                    <a href="game.html" class="play-game-btn">
                        <i class="fas fa-play"></i> Chơi ngay
                    </a>
                </div>
            `;
            return;
        }
        
        gameVoucherList.innerHTML = `
            <h4><i class="fas fa-gift"></i> Voucher từ mini game của bạn:</h4>
            <div class="voucher-grid">
                ${unusedVouchers.map(voucher => `
                    <div class="voucher-card" onclick="voucherManager.useQuickVoucher('${voucher.code}')">
                        <div class="voucher-discount">${voucher.discount}%</div>
                        <div class="voucher-code">${voucher.code}</div>
                        <div class="voucher-date">${voucher.date}</div>
                        <div class="voucher-action">Nhấn để sử dụng</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    applyVoucher() {
        const voucherInput = document.getElementById('voucherInput');
        const voucherCode = voucherInput.value.trim().toUpperCase();
        
        if (!voucherCode) {
            this.showVoucherStatus('Vui lòng nhập mã voucher', 'error');
            return;
        }
        
        const voucher = this.vouchers.find(v => v.code === voucherCode && !v.used);
        
        if (!voucher) {
            this.showVoucherStatus('Mã voucher không hợp lệ hoặc đã được sử dụng', 'error');
            return;
        }
        
        this.useVoucher(voucher);
        voucherInput.value = '';
    }
    
    useQuickVoucher(voucherCode) {
        const voucher = this.vouchers.find(v => v.code === voucherCode && !v.used);
        if (voucher) {
            this.useVoucher(voucher);
        }
    }
    
    useVoucher(voucher) {
        // Mark voucher as used
        voucher.used = true;
        this.saveVouchers();
        
        // Apply discount to cart
        this.applyDiscount(voucher.discount);
        
        // Show success message
        this.showVoucherStatus(`Đã áp dụng voucher ${voucher.code} - Giảm ${voucher.discount}%`, 'success');
        
        // Update display
        this.displayGameVouchers();
        
        // Add discount info to cart
        this.showDiscountInfo(voucher);
    }
    
    applyDiscount(discountPercent) {
        // Get current cart total
        const cartTotalElement = document.getElementById('cartTotal');
        if (!cartTotalElement) return;
        
        const currentTotal = this.extractPriceFromText(cartTotalElement.textContent);
        const discountAmount = currentTotal * (discountPercent / 100);
        const newTotal = currentTotal - discountAmount;
        
        // Store original total for display
        window.originalCartTotal = currentTotal;
        window.currentDiscount = discountPercent;
        
        // Update display
        cartTotalElement.innerHTML = `
            <div class="total-breakdown">
                <div class="original-total">Tạm tính: ${this.formatPrice(currentTotal)}</div>
                <div class="discount-line">Giảm giá (${discountPercent}%): -${this.formatPrice(discountAmount)}</div>
                <div class="final-total">Tổng cộng: ${this.formatPrice(newTotal)}</div>
            </div>
        `;
    }
    
    showDiscountInfo(voucher) {
        const cartFooter = document.querySelector('.cart-footer');
        let discountInfo = document.getElementById('discountInfo');
        
        if (!discountInfo) {
            discountInfo = document.createElement('div');
            discountInfo.id = 'discountInfo';
            discountInfo.className = 'discount-info';
            cartFooter.insertBefore(discountInfo, cartFooter.lastElementChild);
        }
        
        discountInfo.innerHTML = `
            <div class="applied-discount">
                <i class="fas fa-tags"></i>
                <span>Voucher ${voucher.code} đã được áp dụng (${voucher.discount}% giảm giá)</span>
                <button onclick="voucherManager.removeDiscount()" class="remove-discount">×</button>
            </div>
        `;
    }
    
    removeDiscount() {
        // Restore original total
        if (window.originalCartTotal) {
            const cartTotalElement = document.getElementById('cartTotal');
            cartTotalElement.textContent = this.formatPrice(window.originalCartTotal);
            
            // Remove discount info
            const discountInfo = document.getElementById('discountInfo');
            if (discountInfo) {
                discountInfo.remove();
            }
            
            // Clear stored values
            delete window.originalCartTotal;
            delete window.currentDiscount;
            
            this.showVoucherStatus('Đã hủy áp dụng voucher', 'info');
        }
    }
    
    showVoucherStatus(message, type) {
        const voucherStatus = document.getElementById('voucherStatus');
        if (!voucherStatus) return;
        
        voucherStatus.className = `voucher-status ${type}`;
        voucherStatus.textContent = message;
        
        // Clear message after 3 seconds
        setTimeout(() => {
            voucherStatus.textContent = '';
            voucherStatus.className = 'voucher-status';
        }, 3000);
    }
    
    showVoucherNotification(count) {
        const notification = document.createElement('div');
        notification.className = 'voucher-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-gift"></i>
                <span>Bạn có ${count} voucher mới từ mini game!</span>
                <button onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.remove();
            }
        }, 5000);
    }
    
    extractPriceFromText(text) {
        // Extract number from Vietnamese currency format
        const numberStr = text.replace(/[^\d]/g, '');
        return parseInt(numberStr) || 0;
    }
    
    formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    }
}

// Initialize voucher manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.voucherManager = new VoucherManager();
});

// Add CSS for voucher components
const voucherCSS = `
    .voucher-section {
        margin-bottom: 1rem;
        padding: 1rem;
        background: rgba(76, 175, 80, 0.1);
        border-radius: 10px;
        border: 1px solid rgba(76, 175, 80, 0.2);
    }
    
    .voucher-input-group {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    #voucherInput {
        flex: 1;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 0.9rem;
    }
    
    .voucher-btn {
        background: #4CAF50;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background 0.3s;
    }
    
    .voucher-btn:hover {
        background: #45a049;
    }
    
    .voucher-status {
        padding: 0.5rem;
        border-radius: 5px;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }
    
    .voucher-status.success {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .voucher-status.error {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    
    .voucher-status.info {
        background: #d1ecf1;
        color: #0c5460;
        border: 1px solid #bee5eb;
    }
    
    .game-voucher-list h4 {
        margin-bottom: 0.5rem;
        color: #4CAF50;
        font-size: 0.9rem;
    }
    
    .voucher-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 0.5rem;
    }
    
    .voucher-card {
        background: linear-gradient(135deg, #FFD700, #FFA000);
        padding: 0.8rem;
        border-radius: 8px;
        text-align: center;
        cursor: pointer;
        transition: transform 0.3s, box-shadow 0.3s;
        color: #333;
        font-size: 0.8rem;
    }
    
    .voucher-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 193, 7, 0.3);
    }
    
    .voucher-discount {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 0.2rem;
    }
    
    .voucher-code {
        font-family: 'Courier New', monospace;
        font-weight: bold;
        margin-bottom: 0.2rem;
    }
    
    .voucher-date {
        font-size: 0.7rem;
        opacity: 0.8;
        margin-bottom: 0.2rem;
    }
    
    .voucher-action {
        font-size: 0.7rem;
        font-style: italic;
    }
    
    .no-vouchers {
        text-align: center;
        padding: 1rem;
        color: #666;
    }
    
    .play-game-btn {
        background: linear-gradient(135deg, #FFD700, #FFA000);
        color: #333;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: bold;
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        margin-top: 0.5rem;
        transition: transform 0.3s;
    }
    
    .play-game-btn:hover {
        transform: translateY(-2px);
    }
    
    .total-breakdown {
        text-align: right;
    }
    
    .original-total {
        color: #666;
        text-decoration: line-through;
        font-size: 0.9rem;
    }
    
    .discount-line {
        color: #4CAF50;
        font-weight: bold;
        font-size: 0.9rem;
    }
    
    .final-total {
        font-size: 1.1rem;
        font-weight: bold;
        margin-top: 0.3rem;
    }
    
    .applied-discount {
        background: #d4edda;
        color: #155724;
        padding: 0.5rem;
        border-radius: 5px;
        margin: 0.5rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;
    }
    
    .remove-discount {
        background: none;
        border: none;
        color: #155724;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
    }
    
    .voucher-notification {
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #FFD700, #FFA000);
        color: #333;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideInRight 0.3s ease;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content button {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: #333;
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = voucherCSS;
document.head.appendChild(style);
