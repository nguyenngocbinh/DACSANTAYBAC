// Pikachu Matching Game - Đặc Sản Tây Bắc Theme (Complete Rewrite)
class PikachuGame {
    constructor() {
        this.gameState = 'start';
        this.score = 0;
        this.timeLeft = 0;
        this.selectedTile = null;
        this.board = [];
        this.rows = 0;
        this.cols = 0;
        this.difficulty = 'medium';
        this.gameTimer = null;
        this.hintsLeft = 3;
        this.matchedPairs = 0;
        this.totalPairs = 0;
        this.isProcessing = false;

        // Đặc sản Tây Bắc items
        this.gameItems = [
            '🍯', '🌿', '🥔', '🌽', '🍄', '🥜', '🌰', '🌶️',
            '🥒', '🍅', '🧄', '🥬', '🥕', '🐄', '🐐', '🐟',
            '🌾', '🫒', '🫛', '🫘'
        ];

        // Board sizes fill completely (no empty tiles), pairs = rows*cols/2
        this.difficultySettings = {
            easy:   { rows: 4, cols: 6,  time: 300 },
            medium: { rows: 6, cols: 8,  time: 240 },
            hard:   { rows: 6, cols: 10, time: 180 },
            expert: { rows: 8, cols: 10, time: 150 }
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDisplay();
    }

    bindEvents() {
        // Difficulty selection
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.difficulty = btn.dataset.difficulty;
            });
        });

        // Start button
        document.querySelector('.start-btn').addEventListener('click', () => this.startGame());

        // Game controls
        document.querySelector('.pause-btn').addEventListener('click', () => this.pauseGame());
        document.querySelector('.hint-btn').addEventListener('click', () => this.useHint());
        document.querySelector('.shuffle-btn').addEventListener('click', () => this.shuffleBoard());

        // Resume
        const resumeBtn = document.querySelector('.resume-btn');
        if (resumeBtn) resumeBtn.addEventListener('click', () => this.resumeGame());

        // Restart buttons
        document.querySelectorAll('.restart-btn').forEach(btn => {
            btn.addEventListener('click', () => this.restartGame());
        });

        // Home buttons
        document.querySelectorAll('.home-btn').forEach(btn => {
            btn.addEventListener('click', () => this.goHome());
        });

        // Shop buttons
        document.querySelectorAll('.shop-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                window.location.href = 'index.html#products';
            });
        });

        // Copy voucher (event delegation)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-voucher')) {
                const code = e.target.previousElementSibling?.textContent;
                if (code) {
                    navigator.clipboard.writeText(code).then(() => {
                        e.target.textContent = '✓ Đã sao chép!';
                        setTimeout(() => { e.target.textContent = '📋 Sao chép'; }, 2000);
                    });
                }
            }
        });
    }

    // ═══════════════════════════════════════
    //  Display
    // ═══════════════════════════════════════

    updateDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('time').textContent = this.formatTime(this.timeLeft);
        document.getElementById('hints').textContent = this.hintsLeft;
    }

    formatTime(s) {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec.toString().padStart(2, '0')}`;
    }

    showScreen(id) {
        document.querySelectorAll('.overlay-screen').forEach(s => s.classList.add('hidden'));
        const el = document.getElementById(id);
        if (el) el.classList.remove('hidden');
    }

    hideAllScreens() {
        document.querySelectorAll('.overlay-screen').forEach(s => s.classList.add('hidden'));
    }

    showMessage(text) {
        document.querySelectorAll('.hint-display').forEach(el => el.remove());
        const msg = document.createElement('div');
        msg.className = 'hint-display';
        msg.textContent = text;
        document.querySelector('.game-main').appendChild(msg);
        setTimeout(() => { if (msg.parentNode) msg.remove(); }, 2500);
    }

    // ═══════════════════════════════════════
    //  Game Flow
    // ═══════════════════════════════════════

    startGame() {
        const settings = this.difficultySettings[this.difficulty];
        this.rows = settings.rows;
        this.cols = settings.cols;
        this.totalPairs = (this.rows * this.cols) / 2;
        this.score = 0;
        this.timeLeft = settings.time;
        this.matchedPairs = 0;
        this.hintsLeft = 3;
        this.selectedTile = null;
        this.isProcessing = false;
        this.gameState = 'playing';

        this.hideAllScreens();
        this.generateBoard();
        this.renderBoard();
        this.startTimer();
        this.updateDisplay();
    }

    restartGame() {
        this.clearTimer();
        this.gameState = 'start';
        this.clearBoard();
        this.showScreen('start-screen');
    }

    goHome() {
        this.clearTimer();
        this.gameState = 'start';
        this.clearBoard();
        this.showScreen('start-screen');
    }

    clearTimer() {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
    }

    startTimer() {
        this.clearTimer();
        this.gameTimer = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            if (this.timeLeft <= 0) this.gameOver(false);
        }, 1000);
    }

    pauseGame() {
        if (this.gameState !== 'playing') return;
        this.gameState = 'paused';
        this.clearTimer();
        document.getElementById('pause-score').textContent = this.score;
        document.getElementById('pause-time').textContent = this.formatTime(this.timeLeft);
        document.getElementById('pause-pairs').textContent = this.matchedPairs;
        this.showScreen('pause-screen');
    }

    resumeGame() {
        if (this.gameState !== 'paused') return;
        this.gameState = 'playing';
        this.hideAllScreens();
        this.startTimer();
    }

    gameOver(isWin) {
        this.gameState = 'finished';
        this.clearTimer();

        const timeBonus = isWin ? this.timeLeft * 10 : 0;
        const mult = { easy: 1, medium: 1.5, hard: 2, expert: 3 }[this.difficulty] || 1;
        const finalScore = Math.floor((this.score + timeBonus) * mult);

        document.getElementById('final-score').textContent = finalScore;
        document.getElementById('final-pairs').textContent = this.matchedPairs;
        document.getElementById('final-time').textContent = this.formatTime(
            this.difficultySettings[this.difficulty].time - this.timeLeft
        );

        const h2 = document.querySelector('#game-over-screen h2');
        if (isWin) {
            h2.innerHTML = '<i class="fas fa-trophy"></i> Chúc mừng! Bạn đã thắng!';
            h2.style.color = '';
        } else {
            h2.innerHTML = '<i class="fas fa-clock"></i> Hết thời gian!';
            h2.style.color = '#FFD700';
        }

        const vc = document.getElementById('voucher-container');
        if (finalScore >= 500) {
            const voucher = this.generateVoucher(finalScore);
            vc.innerHTML = `
                <div class="voucher-reward">
                    <h3>🎁 Phần thưởng!</h3>
                    <p>Mã giảm giá đặc sản Tây Bắc:</p>
                    <div class="voucher-code">
                        <span>${voucher.code}</span>
                        <button class="copy-voucher">📋 Sao chép</button>
                    </div>
                    <p><strong>Giảm ${voucher.discount}%</strong> đơn từ ${voucher.minOrder.toLocaleString()}đ</p>
                    <p><em>Hiệu lực đến ${voucher.expiry}</em></p>
                </div>`;
            this.saveVoucher(voucher);
        } else {
            vc.innerHTML = `
                <div style="background:rgba(255,255,255,0.1);padding:1rem;border-radius:10px;margin:1rem 0;">
                    <p>💡 Đạt 500+ điểm để nhận mã giảm giá! (${finalScore}/500)</p>
                </div>`;
        }

        this.showScreen('game-over-screen');
    }

    // ═══════════════════════════════════════
    //  Board Generation & Rendering
    // ═══════════════════════════════════════

    generateBoard() {
        // Create item pairs - reuse items cyclically if needed
        const items = [];
        for (let i = 0; i < this.totalPairs; i++) {
            items.push(this.gameItems[i % this.gameItems.length]);
        }

        // Each item appears exactly twice
        let tiles = [];
        items.forEach(item => {
            tiles.push({ item, matched: false });
            tiles.push({ item, matched: false });
        });

        // Shuffle tiles
        tiles = this.shuffleArray(tiles);

        // Fill 2D board
        this.board = [];
        let idx = 0;
        for (let r = 0; r < this.rows; r++) {
            this.board[r] = [];
            for (let c = 0; c < this.cols; c++) {
                this.board[r][c] = tiles[idx++];
            }
        }

        // Ensure at least one matchable pair exists
        if (!this.findAnyMatch()) {
            this.generateBoard();
        }
    }

    renderBoard() {
        const gameBoard = document.querySelector('.game-board');
        gameBoard.innerHTML = '';

        // Calculate responsive tile size
        const container = document.querySelector('.game-board-container');
        const availW = container.clientWidth - 30;
        const availH = container.clientHeight - 30;
        const gap = 3;
        const tileW = Math.floor((availW - (this.cols + 1) * gap) / this.cols);
        const tileH = Math.floor((availH - (this.rows + 1) * gap) / this.rows);
        const tileSize = Math.max(28, Math.min(tileW, tileH, 55));
        const fontSize = Math.max(14, Math.min(Math.floor(tileSize * 0.55), 26));

        gameBoard.style.gridTemplateColumns = `repeat(${this.cols}, ${tileSize}px)`;
        gameBoard.style.gridTemplateRows = `repeat(${this.rows}, ${tileSize}px)`;
        gameBoard.style.gap = `${gap}px`;

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const tile = this.board[r][c];
                const el = document.createElement('div');
                el.className = 'game-tile';
                el.dataset.row = r;
                el.dataset.col = c;
                el.style.fontSize = `${fontSize}px`;

                if (tile.matched) {
                    el.classList.add('matched');
                } else {
                    el.textContent = tile.item;
                    el.addEventListener('click', () => this.onTileClick(r, c, el));
                }

                gameBoard.appendChild(el);
            }
        }
    }

    clearBoard() {
        document.querySelector('.game-board').innerHTML = '';
        const svg = document.querySelector('.path-svg');
        if (svg) svg.remove();
    }

    getTileEl(r, c) {
        return document.querySelector(`.game-tile[data-row="${r}"][data-col="${c}"]`);
    }

    // ═══════════════════════════════════════
    //  Tile Selection & Matching
    // ═══════════════════════════════════════

    onTileClick(r, c, el) {
        if (this.gameState !== 'playing' || this.isProcessing) return;
        if (this.board[r][c].matched) return;

        // Clear any hint highlights
        this.clearHints();

        if (!this.selectedTile) {
            // First tile selected
            this.selectedTile = { r, c, el };
            el.classList.add('selected');
        } else if (this.selectedTile.r === r && this.selectedTile.c === c) {
            // Clicked same tile → deselect
            el.classList.remove('selected');
            this.selectedTile = null;
        } else {
            // Second tile selected
            el.classList.add('selected');
            this.isProcessing = true;

            const { r: r1, c: c1, el: el1 } = this.selectedTile;
            const r2 = r, c2 = c, el2 = el;

            if (this.board[r1][c1].item === this.board[r2][c2].item) {
                const path = this.findPath(r1, c1, r2, c2);
                if (path) {
                    this.handleMatch(r1, c1, r2, c2, el1, el2, path);
                    return;
                }
            }

            // No match or no valid path → deselect both
            setTimeout(() => {
                el1.classList.remove('selected');
                el2.classList.remove('selected');
                this.selectedTile = null;
                this.isProcessing = false;
            }, 300);
        }
    }

    handleMatch(r1, c1, r2, c2, el1, el2, path) {
        // Draw the connecting path, then animate match
        this.drawPath(path, () => {
            el1.classList.remove('selected');
            el2.classList.remove('selected');
            el1.classList.add('match-success');
            el2.classList.add('match-success');

            setTimeout(() => {
                // Mark matched in data
                this.board[r1][c1].matched = true;
                this.board[r2][c2].matched = true;

                // Visual: hide tiles
                el1.classList.remove('match-success');
                el2.classList.remove('match-success');
                el1.classList.add('matched');
                el2.classList.add('matched');
                el1.textContent = '';
                el2.textContent = '';

                // Update score
                this.matchedPairs++;
                this.score += 100;
                this.updateDisplay();

                // Reset selection
                this.selectedTile = null;
                this.isProcessing = false;

                // Check win or deadlock
                if (this.matchedPairs >= this.totalPairs) {
                    this.gameOver(true);
                } else if (!this.findAnyMatch()) {
                    this.autoShuffle();
                }
            }, 350);
        });
    }

    // ═══════════════════════════════════════
    //  Path Finding (Pikachu/Shisen-Sho: max 2 bends)
    //
    //  Uses virtual border: row -1, row=rows, col -1, col=cols
    //  are always passable, allowing paths to route around the board.
    // ═══════════════════════════════════════

    isPassable(r, c) {
        // Outside the board = always passable (virtual border)
        if (r < 0 || r >= this.rows || c < 0 || c >= this.cols) return true;
        return this.board[r][c].matched;
    }

    /**
     * Check if there's a clear straight line between two points
     * on the same row or same column. Does NOT check endpoints themselves.
     */
    canStraightLine(r1, c1, r2, c2) {
        if (r1 === r2) {
            const min = Math.min(c1, c2);
            const max = Math.max(c1, c2);
            for (let c = min + 1; c < max; c++) {
                if (!this.isPassable(r1, c)) return false;
            }
            return true;
        }
        if (c1 === c2) {
            const min = Math.min(r1, r2);
            const max = Math.max(r1, r2);
            for (let r = min + 1; r < max; r++) {
                if (!this.isPassable(r, c1)) return false;
            }
            return true;
        }
        return false;
    }

    /**
     * Find a path between (r1,c1) and (r2,c2) with at most 2 bends.
     * Returns array of [row,col] waypoints, or null if no path exists.
     */
    findPath(r1, c1, r2, c2) {
        if (r1 === r2 && c1 === c2) return null;

        // ── 0 bends: direct straight line ──
        if ((r1 === r2 || c1 === c2) && this.canStraightLine(r1, c1, r2, c2)) {
            return [[r1, c1], [r2, c2]];
        }

        // ── 1 bend: via one corner ──
        // Corner at (r1, c2)
        if (this.isPassable(r1, c2) &&
            this.canStraightLine(r1, c1, r1, c2) &&
            this.canStraightLine(r1, c2, r2, c2)) {
            return [[r1, c1], [r1, c2], [r2, c2]];
        }
        // Corner at (r2, c1)
        if (this.isPassable(r2, c1) &&
            this.canStraightLine(r1, c1, r2, c1) &&
            this.canStraightLine(r2, c1, r2, c2)) {
            return [[r1, c1], [r2, c1], [r2, c2]];
        }

        // ── 2 bends: scan rows (path goes vertical → horizontal → vertical) ──
        for (let r = -1; r <= this.rows; r++) {
            if (r === r1 || r === r2) continue;
            if (this.isPassable(r, c1) && this.isPassable(r, c2) &&
                this.canStraightLine(r1, c1, r, c1) &&
                this.canStraightLine(r, c1, r, c2) &&
                this.canStraightLine(r, c2, r2, c2)) {
                return [[r1, c1], [r, c1], [r, c2], [r2, c2]];
            }
        }

        // ── 2 bends: scan cols (path goes horizontal → vertical → horizontal) ──
        for (let c = -1; c <= this.cols; c++) {
            if (c === c1 || c === c2) continue;
            if (this.isPassable(r1, c) && this.isPassable(r2, c) &&
                this.canStraightLine(r1, c1, r1, c) &&
                this.canStraightLine(r1, c, r2, c) &&
                this.canStraightLine(r2, c, r2, c2)) {
                return [[r1, c1], [r1, c], [r2, c], [r2, c2]];
            }
        }

        return null;
    }

    // ═══════════════════════════════════════
    //  Path Drawing (SVG overlay)
    // ═══════════════════════════════════════

    drawPath(path, callback) {
        const container = document.querySelector('.game-board-container');
        const containerRect = container.getBoundingClientRect();
        const boardEl = document.querySelector('.game-board');
        const boardRect = boardEl.getBoundingClientRect();

        // Remove old SVG
        const oldSvg = container.querySelector('.path-svg');
        if (oldSvg) oldSvg.remove();

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('path-svg');
        svg.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:20;overflow:visible;';
        container.appendChild(svg);

        const getPos = (r, c) => {
            // Clamp to board range for DOM lookup
            const clampR = Math.max(0, Math.min(r, this.rows - 1));
            const clampC = Math.max(0, Math.min(c, this.cols - 1));
            const el = this.getTileEl(clampR, clampC);
            if (!el) return { x: 0, y: 0 };
            const rect = el.getBoundingClientRect();

            let x = rect.left + rect.width / 2 - containerRect.left;
            let y = rect.top + rect.height / 2 - containerRect.top;

            // Adjust for virtual border points (outside board)
            if (r < 0) y = boardRect.top - containerRect.top - 10;
            if (r >= this.rows) y = boardRect.bottom - containerRect.top + 10;
            if (c < 0) x = boardRect.left - containerRect.left - 10;
            if (c >= this.cols) x = boardRect.right - containerRect.left + 10;

            return { x, y };
        };

        // Draw polyline
        const pts = path.map(([r, c]) => {
            const p = getPos(r, c);
            return `${p.x},${p.y}`;
        }).join(' ');

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        line.setAttribute('points', pts);
        line.setAttribute('fill', 'none');
        line.setAttribute('stroke', '#FF6B35');
        line.setAttribute('stroke-width', '3');
        line.setAttribute('stroke-linecap', 'round');
        line.setAttribute('stroke-linejoin', 'round');
        line.style.filter = 'drop-shadow(0 0 6px rgba(255,107,53,0.5))';
        svg.appendChild(line);

        // Draw dots at waypoints
        path.forEach(([r, c]) => {
            const p = getPos(r, c);
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', p.x);
            circle.setAttribute('cy', p.y);
            circle.setAttribute('r', '4');
            circle.setAttribute('fill', '#FF6B35');
            svg.appendChild(circle);
        });

        // Remove path after delay, then callback
        setTimeout(() => {
            svg.remove();
            if (callback) callback();
        }, 350);
    }

    // ═══════════════════════════════════════
    //  Hint System
    // ═══════════════════════════════════════

    clearHints() {
        document.querySelectorAll('.game-tile.hint').forEach(el => el.classList.remove('hint'));
    }

    useHint() {
        if (this.hintsLeft <= 0 || this.gameState !== 'playing' || this.isProcessing) return;

        const match = this.findAnyMatch();
        if (match) {
            this.hintsLeft--;
            this.updateDisplay();

            const el1 = this.getTileEl(match.r1, match.c1);
            const el2 = this.getTileEl(match.r2, match.c2);
            if (el1) el1.classList.add('hint');
            if (el2) el2.classList.add('hint');

            setTimeout(() => this.clearHints(), 3000);
        } else {
            this.showMessage('Không có nước đi! Đang xáo trộn...');
            this.autoShuffle();
        }
    }

    /**
     * Find any pair of unmatched tiles with the same item that can be connected.
     * Returns { r1, c1, r2, c2 } or null.
     */
    findAnyMatch() {
        for (let r1 = 0; r1 < this.rows; r1++) {
            for (let c1 = 0; c1 < this.cols; c1++) {
                if (this.board[r1][c1].matched) continue;
                for (let r2 = r1; r2 < this.rows; r2++) {
                    const startC = (r2 === r1) ? c1 + 1 : 0;
                    for (let c2 = startC; c2 < this.cols; c2++) {
                        if (this.board[r2][c2].matched) continue;
                        if (this.board[r1][c1].item === this.board[r2][c2].item) {
                            if (this.findPath(r1, c1, r2, c2)) {
                                return { r1, c1, r2, c2 };
                            }
                        }
                    }
                }
            }
        }
        return null;
    }

    // ═══════════════════════════════════════
    //  Shuffle
    // ═══════════════════════════════════════

    shuffleBoard() {
        if (this.gameState !== 'playing' || this.isProcessing) return;
        this.score = Math.max(0, this.score - 50);
        this.updateDisplay();
        this.doShuffle();
    }

    autoShuffle() {
        this.showMessage('Không còn nước đi! Xáo trộn...');
        setTimeout(() => this.doShuffle(), 800);
    }

    doShuffle(attempt = 0) {
        if (attempt > 50) return; // Safety limit

        // Collect all unmatched items
        const items = [];
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (!this.board[r][c].matched) {
                    items.push(this.board[r][c].item);
                }
            }
        }

        // Shuffle and reassign
        const shuffled = this.shuffleArray(items);
        let i = 0;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (!this.board[r][c].matched) {
                    this.board[r][c].item = shuffled[i++];
                }
            }
        }

        // Reset selection and re-render
        this.selectedTile = null;
        this.renderBoard();

        // If still no match, try again
        if (!this.findAnyMatch() && this.matchedPairs < this.totalPairs) {
            this.doShuffle(attempt + 1);
        }
    }

    // ═══════════════════════════════════════
    //  Utility
    // ═══════════════════════════════════════

    shuffleArray(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    generateVoucher(score) {
        const types = [
            { discount: 10, minOrder: 200000, req: 500 },
            { discount: 15, minOrder: 300000, req: 800 },
            { discount: 20, minOrder: 500000, req: 1200 },
            { discount: 25, minOrder: 1000000, req: 1800 }
        ];
        let type = types[0];
        for (const t of types) {
            if (score >= t.req) type = t;
        }

        const code = `PIKACHU${type.discount}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 30);

        return {
            code,
            discount: type.discount,
            minOrder: type.minOrder,
            expiry: expiry.toLocaleDateString('vi-VN'),
            type: 'pikachu-game',
            generated: new Date().toISOString()
        };
    }

    saveVoucher(voucher) {
        let vouchers = JSON.parse(localStorage.getItem('tayBacVouchers') || '[]');
        vouchers.push({
            code: voucher.code,
            discount: voucher.discount,
            date: new Date().toLocaleDateString('vi-VN'),
            used: false
        });
        if (vouchers.length > 10) vouchers = vouchers.slice(-10);
        localStorage.setItem('tayBacVouchers', JSON.stringify(vouchers));
    }
}

// Global function for HTML onclick
function goBack() {
    window.location.href = 'index.html';
}

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    new PikachuGame();
});
