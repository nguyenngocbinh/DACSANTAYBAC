// Pikachu Matching Game - Đặc Sản Tây Bắc Theme
class PikachuGame {
    constructor() {
        this.gameState = 'start';
        this.score = 0;
        this.timeLeft = 0;
        this.selectedTiles = [];
        this.board = [];
        this.difficulty = 'medium';
        this.gameTimer = null;
        this.pathDisplay = null;
        this.hintsLeft = 3;
        this.matchedPairs = 0;
        
        // Đặc sản Tây Bắc items
        this.gameItems = [
            '🐄', '🐐', '🐟', '🌾', '🍯', '🌿', '🥔', '🌽',
            '🫒', '🍄', '🥜', '🌰', '🌶️', '🥒', '🍅', '🧄',
            '🥬', '🫛', '🥕', '🫘'
        ];
        
        // Difficulty settings
        this.difficultySettings = {
            easy: { rows: 6, cols: 8, time: 300, pairs: 12 },
            medium: { rows: 8, cols: 10, time: 240, pairs: 20 },
            hard: { rows: 10, cols: 12, time: 180, pairs: 30 },
            expert: { rows: 12, cols: 14, time: 150, pairs: 42 }
        };
        
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDisplay();
        this.showStartScreen();
    }

    bindEvents() {
        // Back button
        document.querySelector('.back-btn').addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        // Difficulty selection
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.difficulty = e.target.dataset.difficulty;
            });
        });

        // Game buttons
        document.querySelector('.start-btn').addEventListener('click', () => this.startGame());
        
        // Resume, restart, home buttons
        const resumeBtn = document.querySelector('.resume-btn');
        const restartBtns = document.querySelectorAll('.restart-btn');
        const homeBtns = document.querySelectorAll('.home-btn');
        
        if (resumeBtn) resumeBtn.addEventListener('click', () => this.resumeGame());
        
        restartBtns.forEach(btn => {
            btn.addEventListener('click', () => this.restartGame());
        });
        
        homeBtns.forEach(btn => {
            btn.addEventListener('click', () => this.showStartScreen());
        });
        
        // Control buttons
        document.querySelector('.pause-btn').addEventListener('click', () => this.pauseGame());
        document.querySelector('.hint-btn').addEventListener('click', () => this.useHint());
        document.querySelector('.shuffle-btn').addEventListener('click', () => this.shuffleBoard());

        // Shop buttons
        document.querySelectorAll('.shop-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                window.location.href = 'index.html#products';
            });
        });

        // Copy voucher codes
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-voucher')) {
                const code = e.target.previousElementSibling.textContent;
                navigator.clipboard.writeText(code).then(() => {
                    e.target.textContent = '✓ Đã sao chép!';
                    e.target.style.background = '#4CAF50';
                    setTimeout(() => {
                        e.target.textContent = '📋 Sao chép';
                        e.target.style.background = '#4CAF50';
                    }, 2000);
                });
            }
        });

        // Touch events for mobile
        if (this.isMobile) {
            document.addEventListener('touchstart', this.handleTouch.bind(this));
            document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
        }
    }

    handleTouch(e) {
        if (this.gameState !== 'playing') return;
        
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        
        if (element && element.classList.contains('game-tile')) {
            e.preventDefault();
            this.selectTile(element);
        }
    }

    updateDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('time').textContent = this.formatTime(this.timeLeft);
        document.getElementById('hints').textContent = this.hintsLeft;
    }

    updateProgress() {
        const settings = this.difficultySettings[this.difficulty];
        const totalPairs = Math.min(settings.pairs, Math.floor((settings.rows * settings.cols) / 2));
        const progressPercent = (this.matchedPairs / totalPairs) * 100;
        
        // Update progress bar
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progressPercent}%`;
        }
        
        // Update progress text
        const currentPairsElement = document.getElementById('current-pairs');
        const totalPairsElement = document.getElementById('total-pairs');
        
        if (currentPairsElement) currentPairsElement.textContent = this.matchedPairs;
        if (totalPairsElement) totalPairsElement.textContent = totalPairs;
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    showScreen(screenId) {
        document.querySelectorAll('.overlay-screen').forEach(screen => {
            screen.classList.add('hidden');
        });
        document.getElementById(screenId).classList.remove('hidden');
    }

    showStartScreen() {
        this.gameState = 'start';
        this.showScreen('start-screen');
        this.clearBoard();
    }

    startGame() {
        const settings = this.difficultySettings[this.difficulty];
        this.gameState = 'playing';
        this.score = 0;
        this.timeLeft = settings.time;
        this.selectedTiles = [];
        this.matchedPairs = 0;
        this.hintsLeft = 3;
        
        this.hideAllScreens();
        this.generateBoard();
        this.startTimer();
        this.updateDisplay();
        this.updateProgress();
    }

    hideAllScreens() {
        document.querySelectorAll('.overlay-screen').forEach(screen => {
            screen.classList.add('hidden');
        });
    }

    generateBoard() {
        const settings = this.difficultySettings[this.difficulty];
        const gameBoard = document.querySelector('.game-board');
        
        // Set grid layout
        gameBoard.style.gridTemplateColumns = `repeat(${settings.cols}, 1fr)`;
        gameBoard.style.gridTemplateRows = `repeat(${settings.rows}, 1fr)`;
        
        // Generate pairs
        const totalTiles = settings.rows * settings.cols;
        const availablePairs = Math.floor(totalTiles / 2);
        const pairsToUse = Math.min(settings.pairs, availablePairs);
        
        // Create tile data
        this.board = [];
        const items = this.shuffleArray([...this.gameItems]).slice(0, pairsToUse);
        
        // Add pairs
        for (let i = 0; i < pairsToUse; i++) {
            this.board.push({ id: i * 2, item: items[i], matched: false });
            this.board.push({ id: i * 2 + 1, item: items[i], matched: false });
        }
        
        // Fill remaining tiles with empty
        while (this.board.length < totalTiles) {
            this.board.push({ id: this.board.length, item: '', matched: false, empty: true });
        }
        
        // Shuffle board
        this.board = this.shuffleArray(this.board);
        
        // Render board
        this.renderBoard();
    }

    renderBoard() {
        const gameBoard = document.querySelector('.game-board');
        gameBoard.innerHTML = '';
        
        this.board.forEach((tile, index) => {
            const tileElement = document.createElement('div');
            tileElement.className = 'game-tile';
            tileElement.dataset.index = index;
            
            if (tile.empty) {
                tileElement.classList.add('empty');
            } else {
                tileElement.textContent = tile.item;
                tileElement.addEventListener('click', () => this.selectTile(tileElement));
            }
            
            if (tile.matched) {
                tileElement.classList.add('matched');
            }
            
            gameBoard.appendChild(tileElement);
        });
    }

    selectTile(tileElement) {
        if (this.gameState !== 'playing') return;
        if (tileElement.classList.contains('matched') || tileElement.classList.contains('empty')) return;
        if (tileElement.style.opacity === '0') return; // Don't select disappeared tiles
        if (this.selectedTiles.includes(tileElement)) return;
        if (this.selectedTiles.length >= 2) return;
        
        tileElement.classList.add('selected');
        this.selectedTiles.push(tileElement);
        
        if (this.selectedTiles.length === 2) {
            setTimeout(() => this.checkMatch(), 300);
        }
    }

    checkMatch() {
        const [tile1, tile2] = this.selectedTiles;
        const index1 = parseInt(tile1.dataset.index);
        const index2 = parseInt(tile2.dataset.index);
        
        if (this.board[index1].item === this.board[index2].item) {
            // Match found
            this.handleMatch(tile1, tile2, index1, index2);
        } else {
            // No match
            this.handleNoMatch(tile1, tile2);
        }
        
        this.selectedTiles = [];
    }

    handleMatch(tile1, tile2, index1, index2) {
        // Check if tiles can connect
        const path = this.findPath(index1, index2);
        
        if (path) {
            // Valid match
            tile1.classList.remove('selected');
            tile2.classList.remove('selected');
            
            // Add success animation
            tile1.classList.add('match-success');
            tile2.classList.add('match-success');
            
            // Show path first
            this.showPath(path);
            
            // After a short delay, make tiles disappear
            setTimeout(() => {
                tile1.classList.add('matched');
                tile2.classList.add('matched');
                
                // Update board state
                this.board[index1].matched = true;
                this.board[index2].matched = true;
                
                this.matchedPairs++;
                this.score += 100;
                
                // Bonus points for quick matches
                if (this.timeLeft > this.difficultySettings[this.difficulty].time * 0.8) {
                    this.score += 50;
                }
                
                this.updateDisplay();
                this.updateProgress();
                this.checkWin();
            }, 500);
            
        } else {
            // No valid path
            this.handleNoMatch(tile1, tile2);
        }
    }

    handleNoMatch(tile1, tile2) {
        setTimeout(() => {
            tile1.classList.remove('selected');
            tile2.classList.remove('selected');
        }, 500);
    }

    findPath(start, end) {
        const settings = this.difficultySettings[this.difficulty];
        const startRow = Math.floor(start / settings.cols);
        const startCol = start % settings.cols;
        const endRow = Math.floor(end / settings.cols);
        const endCol = end % settings.cols;
        
        // Try direct connection
        if (this.canConnectDirect(startRow, startCol, endRow, endCol)) {
            return this.createPath(startRow, startCol, endRow, endCol, 'direct');
        }
        
        // Try one-turn connection
        const oneTurnPath = this.canConnectOneTurn(startRow, startCol, endRow, endCol);
        if (oneTurnPath) {
            return oneTurnPath;
        }
        
        // Try two-turn connection
        const twoTurnPath = this.canConnectTwoTurn(startRow, startCol, endRow, endCol);
        if (twoTurnPath) {
            return twoTurnPath;
        }
        
        return null;
    }

    canConnectDirect(startRow, startCol, endRow, endCol) {
        const settings = this.difficultySettings[this.difficulty];
        
        // Same row
        if (startRow === endRow) {
            const minCol = Math.min(startCol, endCol);
            const maxCol = Math.max(startCol, endCol);
            for (let col = minCol + 1; col < maxCol; col++) {
                const index = startRow * settings.cols + col;
                if (!this.board[index].empty && !this.board[index].matched) {
                    return false;
                }
            }
            return true;
        }
        
        // Same column
        if (startCol === endCol) {
            const minRow = Math.min(startRow, endRow);
            const maxRow = Math.max(startRow, endRow);
            for (let row = minRow + 1; row < maxRow; row++) {
                const index = row * settings.cols + startCol;
                if (!this.board[index].empty && !this.board[index].matched) {
                    return false;
                }
            }
            return true;
        }
        
        return false;
    }

    canConnectOneTurn(startRow, startCol, endRow, endCol) {
        const settings = this.difficultySettings[this.difficulty];
        
        // Try corner at (startRow, endCol)
        const corner1Index = startRow * settings.cols + endCol;
        if (this.board[corner1Index].empty || this.board[corner1Index].matched) {
            if (this.canConnectDirect(startRow, startCol, startRow, endCol) &&
                this.canConnectDirect(startRow, endCol, endRow, endCol)) {
                return this.createPath(startRow, startCol, endRow, endCol, 'one-turn', [startRow, endCol]);
            }
        }
        
        // Try corner at (endRow, startCol)
        const corner2Index = endRow * settings.cols + startCol;
        if (this.board[corner2Index].empty || this.board[corner2Index].matched) {
            if (this.canConnectDirect(startRow, startCol, endRow, startCol) &&
                this.canConnectDirect(endRow, startCol, endRow, endCol)) {
                return this.createPath(startRow, startCol, endRow, endCol, 'one-turn', [endRow, startCol]);
            }
        }
        
        return null;
    }

    canConnectTwoTurn(startRow, startCol, endRow, endCol) {
        const settings = this.difficultySettings[this.difficulty];
        
        // Try extending in all directions
        const directions = [
            [-1, 0], [1, 0], [0, -1], [0, 1] // up, down, left, right
        ];
        
        for (const [dRow, dCol] of directions) {
            for (let step = 1; step < Math.max(settings.rows, settings.cols); step++) {
                const midRow = startRow + dRow * step;
                const midCol = startCol + dCol * step;
                
                // Check bounds
                if (midRow < -1 || midRow >= settings.rows + 1 || 
                    midCol < -1 || midCol >= settings.cols + 1) break;
                
                // Check if position is valid (empty or outside board)
                if (midRow >= 0 && midRow < settings.rows && 
                    midCol >= 0 && midCol < settings.cols) {
                    const midIndex = midRow * settings.cols + midCol;
                    if (!this.board[midIndex].empty && !this.board[midIndex].matched) break;
                }
                
                // Try to connect from this point to end
                const oneTurnPath = this.canConnectOneTurn(midRow, midCol, endRow, endCol);
                if (oneTurnPath && this.canConnectDirect(startRow, startCol, midRow, midCol)) {
                    return this.createPath(startRow, startCol, endRow, endCol, 'two-turn', [midRow, midCol]);
                }
            }
        }
        
        return null;
    }

    createPath(startRow, startCol, endRow, endCol, type, corners = []) {
        return {
            start: [startRow, startCol],
            end: [endRow, endCol],
            type: type,
            corners: corners
        };
    }

    showPath(path) {
        // Clear existing paths
        document.querySelectorAll('.path-line').forEach(line => line.remove());
        
        const gameBoard = document.querySelector('.game-board');
        const tileSize = 54; // 50px + 4px gap
        
        setTimeout(() => {
            // Draw path based on type
            if (path.type === 'direct') {
                this.drawDirectPath(path.start, path.end, tileSize);
            } else if (path.type === 'one-turn') {
                this.drawOneTurnPath(path.start, path.end, path.corners[0], tileSize);
            } else if (path.type === 'two-turn') {
                this.drawTwoTurnPath(path.start, path.end, path.corners[0], tileSize);
            }
            
            // Remove path after animation
            setTimeout(() => {
                document.querySelectorAll('.path-line').forEach(line => line.remove());
            }, 1000);
        }, 100);
    }

    drawDirectPath(start, end, tileSize) {
        const gameBoard = document.querySelector('.game-board');
        const line = document.createElement('div');
        line.className = 'path-line';
        
        if (start[0] === end[0]) {
            // Horizontal line
            line.classList.add('horizontal');
            const minCol = Math.min(start[1], end[1]);
            const maxCol = Math.max(start[1], end[1]);
            line.style.left = `${(minCol + 0.5) * tileSize}px`;
            line.style.top = `${(start[0] + 0.5) * tileSize}px`;
            line.style.width = `${(maxCol - minCol) * tileSize}px`;
        } else {
            // Vertical line
            line.classList.add('vertical');
            const minRow = Math.min(start[0], end[0]);
            const maxRow = Math.max(start[0], end[0]);
            line.style.left = `${(start[1] + 0.5) * tileSize}px`;
            line.style.top = `${(minRow + 0.5) * tileSize}px`;
            line.style.height = `${(maxRow - minRow) * tileSize}px`;
        }
        
        gameBoard.appendChild(line);
    }

    drawOneTurnPath(start, end, corner, tileSize) {
        // Draw two lines: start to corner, corner to end
        this.drawDirectPath(start, corner, tileSize);
        this.drawDirectPath(corner, end, tileSize);
    }

    drawTwoTurnPath(start, end, midPoint, tileSize) {
        // This is a simplified version - for two-turn paths
        this.drawDirectPath(start, midPoint, tileSize);
        this.drawOneTurnPath(midPoint, end, end, tileSize);
    }

    useHint() {
        if (this.hintsLeft <= 0 || this.gameState !== 'playing') return;
        
        // Find a possible match
        const possibleMatch = this.findPossibleMatch();
        
        if (possibleMatch) {
            this.hintsLeft--;
            this.updateDisplay();
            
            // Highlight tiles
            const settings = this.difficultySettings[this.difficulty];
            const tiles = document.querySelectorAll('.game-tile');
            const tile1 = tiles[possibleMatch.index1];
            const tile2 = tiles[possibleMatch.index2];
            
            tile1.classList.add('hint');
            tile2.classList.add('hint');
            
            // Show hint message
            this.showHintMessage('Hai ô được làm nổi bật có thể kết nối!');
            
            setTimeout(() => {
                tile1.classList.remove('hint');
                tile2.classList.remove('hint');
            }, 3000);
        } else {
            this.showHintMessage('Không có nước đi khả thi! Hãy xáo trộn.');
        }
    }

    findPossibleMatch() {
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i].matched || this.board[i].empty) continue;
            
            for (let j = i + 1; j < this.board.length; j++) {
                if (this.board[j].matched || this.board[j].empty) continue;
                
                if (this.board[i].item === this.board[j].item) {
                    const path = this.findPath(i, j);
                    if (path) {
                        return { index1: i, index2: j, path: path };
                    }
                }
            }
        }
        return null;
    }

    showHintMessage(message) {
        const hintDisplay = document.createElement('div');
        hintDisplay.className = 'hint-display';
        hintDisplay.textContent = message;
        
        document.querySelector('.game-main').appendChild(hintDisplay);
        
        setTimeout(() => {
            hintDisplay.classList.add('hidden');
            setTimeout(() => hintDisplay.remove(), 500);
        }, 2000);
    }

    shuffleBoard() {
        if (this.gameState !== 'playing') return;
        
        // Get all unmatched items
        const unmatchedItems = [];
        this.board.forEach((tile, index) => {
            if (!tile.matched && !tile.empty) {
                unmatchedItems.push(tile.item);
            }
        });
        
        // Shuffle items
        const shuffledItems = this.shuffleArray([...unmatchedItems]);
        
        // Reassign items to unmatched tiles
        let itemIndex = 0;
        this.board.forEach((tile, index) => {
            if (!tile.matched && !tile.empty) {
                tile.item = shuffledItems[itemIndex++];
            }
        });
        
        this.renderBoard();
        this.score = Math.max(0, this.score - 50); // Penalty for shuffle
        this.updateDisplay();
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    startTimer() {
        this.gameTimer = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.gameOver();
            }
        }, 1000);
    }

    pauseGame() {
        if (this.gameState !== 'playing') return;
        
        this.gameState = 'paused';
        clearInterval(this.gameTimer);
        this.showPauseScreen();
    }

    resumeGame() {
        this.gameState = 'playing';
        this.hideAllScreens();
        this.startTimer();
    }

    restartGame() {
        this.gameState = 'start';
        clearInterval(this.gameTimer);
        this.showStartScreen();
    }

    showPauseScreen() {
        document.getElementById('pause-score').textContent = this.score;
        document.getElementById('pause-time').textContent = this.formatTime(this.timeLeft);
        document.getElementById('pause-pairs').textContent = this.matchedPairs;
        this.showScreen('pause-screen');
    }

    checkWin() {
        const settings = this.difficultySettings[this.difficulty];
        const totalPairs = Math.min(settings.pairs, Math.floor((settings.rows * settings.cols) / 2));
        
        if (this.matchedPairs >= totalPairs) {
            this.gameWin();
        }
    }

    gameWin() {
        this.gameState = 'finished';
        clearInterval(this.gameTimer);
        
        // Calculate final score with time bonus
        const timeBonus = this.timeLeft * 10;
        const difficultyMultiplier = {
            easy: 1, medium: 1.5, hard: 2, expert: 3
        };
        const finalScore = Math.floor((this.score + timeBonus) * difficultyMultiplier[this.difficulty]);
        
        this.showGameOverScreen(true, finalScore);
    }

    gameOver() {
        this.gameState = 'finished';
        clearInterval(this.gameTimer);
        this.showGameOverScreen(false, this.score);
    }

    showGameOverScreen(isWin, finalScore) {
        // Update final stats
        document.getElementById('final-score').textContent = finalScore;
        document.getElementById('final-pairs').textContent = this.matchedPairs;
        document.getElementById('final-time').textContent = this.formatTime(
            this.difficultySettings[this.difficulty].time - this.timeLeft
        );
        
        // Show appropriate message
        const messageElement = document.querySelector('#game-over-screen h2');
        if (isWin) {
            messageElement.textContent = '🎉 Chúc mừng! Bạn đã thắng!';
            messageElement.style.color = '#4CAF50';
        } else {
            messageElement.textContent = '⏰ Hết thời gian!';
            messageElement.style.color = '#FF5722';
        }
        
        // Generate voucher if score is high enough
        const voucherContainer = document.getElementById('voucher-container');
        if (finalScore >= 500) {
            const voucher = this.generateVoucher(finalScore);
            voucherContainer.innerHTML = `
                <div class="voucher-reward">
                    <h3>🎁 Phần thưởng đặc biệt!</h3>
                    <p>Bạn đã nhận được mã giảm giá cho các đặc sản Tây Bắc:</p>
                    <div class="voucher-code">
                        <span>${voucher.code}</span>
                        <button class="copy-voucher">📋 Sao chép</button>
                    </div>
                    <p><strong>Giảm ${voucher.discount}%</strong> cho đơn hàng từ ${voucher.minOrder.toLocaleString()}đ</p>
                    <p><em>Có hiệu lực đến ${voucher.expiry}</em></p>
                </div>
            `;
            
            // Save voucher to localStorage
            this.saveVoucher(voucher);
        } else {
            voucherContainer.innerHTML = `
                <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 10px; margin: 1rem 0;">
                    <p>💡 <strong>Mẹo:</strong> Đạt 500 điểm trở lên để nhận mã giảm giá!</p>
                    <p>Điểm của bạn: ${finalScore}/500</p>
                </div>
            `;
        }
        
        this.showScreen('game-over-screen');
    }

    generateVoucher(score) {
        const voucherTypes = [
            { discount: 10, minOrder: 200000, scoreRequired: 500 },
            { discount: 15, minOrder: 300000, scoreRequired: 800 },
            { discount: 20, minOrder: 500000, scoreRequired: 1200 },
            { discount: 25, minOrder: 1000000, scoreRequired: 1800 }
        ];
        
        // Find appropriate voucher type based on score
        let voucherType = voucherTypes[0];
        for (const type of voucherTypes) {
            if (score >= type.scoreRequired) {
                voucherType = type;
            }
        }
        
        // Generate voucher code
        const code = `PIKACHU${voucherType.discount}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        
        // Set expiry date (30 days from now)
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 30);
        
        return {
            code: code,
            discount: voucherType.discount,
            minOrder: voucherType.minOrder,
            expiry: expiry.toLocaleDateString('vi-VN'),
            type: 'pikachu-game',
            generated: new Date().toISOString()
        };
    }

    saveVoucher(voucher) {
        let vouchers = JSON.parse(localStorage.getItem('gameVouchers') || '[]');
        vouchers.push(voucher);
        
        // Keep only last 10 vouchers
        if (vouchers.length > 10) {
            vouchers = vouchers.slice(-10);
        }
        
        localStorage.setItem('gameVouchers', JSON.stringify(vouchers));
    }

    clearBoard() {
        const gameBoard = document.querySelector('.game-board');
        gameBoard.innerHTML = '';
        clearInterval(this.gameTimer);
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PikachuGame();
});
