// Flappy Bird Tây Bắc - Game Engine

class TayBacBirdGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Game state
        this.gameState = 'start'; // start, playing, paused, gameOver
        this.score = 0;
        this.specialtyCount = 0;
        this.highScore = localStorage.getItem('tayBacBirdHighScore') || 0;
        
        // Game objects
        this.bird = null;
        this.pipes = [];
        this.specialties = [];
        this.particles = [];
        
        // Game settings
        this.gravity = 0.6;
        this.jumpStrength = -12;
        this.pipeWidth = 80;
        this.pipeGap = 200;
        this.pipeSpeed = 3;
        this.specialtySpeed = 2;
        
        // Timing
        this.lastTime = 0;
        this.pipeTimer = 0;
        this.specialtyTimer = 0;
        
        // Images (using emoji for simplicity, can be replaced with actual images)
        this.images = {
            bird: '🦅',
            tree: '🌲',
            specialty: ['🌿', '🍄', '🥜', '🫖', '🌰', '🍯'],
            mountain: '⛰️',
            cloud: '☁️'
        };
        
        // Initialize
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateUI();
        this.createBird();
        this.gameLoop();
    }
    
    setupEventListeners() {
        // Start button
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        
        // Restart button
        document.getElementById('restartBtn').addEventListener('click', () => this.restartGame());
        
        // Pause/Resume buttons
        document.getElementById('pauseBtn').addEventListener('click', () => this.pauseGame());
        document.getElementById('resumeBtn').addEventListener('click', () => this.resumeGame());
        document.getElementById('menuBtn').addEventListener('click', () => this.backToMenu());
        
        // Controls
        this.canvas.addEventListener('click', () => this.jump());
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.jump();
            }
            if (e.code === 'Escape') {
                this.pauseGame();
            }
        });
        
        // Prevent context menu on canvas
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    createBird() {
        this.bird = {
            x: 100,
            y: this.canvas.height / 2,
            width: 40,
            height: 30,
            velocity: 0,
            rotation: 0,
            trail: []
        };
    }
    
    startGame() {
        this.gameState = 'playing';
        this.score = 0;
        this.specialtyCount = 0;
        this.pipes = [];
        this.specialties = [];
        this.particles = [];
        this.createBird();
        this.pipeTimer = 0;
        this.specialtyTimer = 0;
        
        this.hideScreen('startScreen');
        this.showElement('pauseBtn');
        this.updateUI();
    }
    
    restartGame() {
        this.hideScreen('gameOverScreen');
        this.startGame();
    }
    
    pauseGame() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            this.showScreen('pauseScreen');
            this.hideElement('pauseBtn');
        }
    }
    
    resumeGame() {
        if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.hideScreen('pauseScreen');
            this.showElement('pauseBtn');
        }
    }
    
    backToMenu() {
        this.gameState = 'start';
        this.hideScreen('pauseScreen');
        this.hideElement('pauseBtn');
        this.showScreen('startScreen');
    }
    
    jump() {
        if (this.gameState === 'playing') {
            this.bird.velocity = this.jumpStrength;
            this.createParticles(this.bird.x, this.bird.y, '#FFD700', 5);
            
            // Add trail effect
            this.bird.trail.push({
                x: this.bird.x,
                y: this.bird.y,
                life: 10
            });
            
            if (this.bird.trail.length > 5) {
                this.bird.trail.shift();
            }
        }
    }
    
    update(deltaTime) {
        if (this.gameState !== 'playing') return;
        
        // Update bird
        this.updateBird();
        
        // Update pipes
        this.updatePipes(deltaTime);
        
        // Update specialties
        this.updateSpecialties(deltaTime);
        
        // Update particles
        this.updateParticles();
        
        // Check collisions
        this.checkCollisions();
        
        // Update timers
        this.pipeTimer += deltaTime;
        this.specialtyTimer += deltaTime;
        
        // Spawn pipes
        if (this.pipeTimer > 2000) {
            this.createPipe();
            this.pipeTimer = 0;
        }
        
        // Spawn specialties
        if (this.specialtyTimer > 3000) {
            this.createSpecialty();
            this.specialtyTimer = 0;
        }
    }
    
    updateBird() {
        // Apply gravity
        this.bird.velocity += this.gravity;
        this.bird.y += this.bird.velocity;
        
        // Update rotation based on velocity
        this.bird.rotation = Math.min(Math.max(this.bird.velocity * 3, -30), 90);
        
        // Update trail
        this.bird.trail.forEach(trail => trail.life--);
        this.bird.trail = this.bird.trail.filter(trail => trail.life > 0);
        
        // Check bounds
        if (this.bird.y < 0) {
            this.bird.y = 0;
            this.bird.velocity = 0;
        }
        
        if (this.bird.y > this.canvas.height - this.bird.height) {
            this.gameOver();
        }
    }
    
    updatePipes(deltaTime) {
        this.pipes.forEach(pipe => {
            pipe.x -= this.pipeSpeed;
            
            // Score when passing pipe
            if (!pipe.scored && pipe.x + this.pipeWidth < this.bird.x) {
                pipe.scored = true;
                this.score++;
                this.createParticles(this.bird.x, this.bird.y, '#4CAF50', 8);
                this.updateUI();
            }
        });
        
        // Remove off-screen pipes
        this.pipes = this.pipes.filter(pipe => pipe.x > -this.pipeWidth);
    }
    
    updateSpecialties(deltaTime) {
        this.specialties.forEach(specialty => {
            specialty.x -= this.specialtySpeed;
            specialty.rotation += 3;
            
            // Floating effect
            specialty.floatOffset += 0.1;
            specialty.y += Math.sin(specialty.floatOffset) * 0.5;
        });
        
        // Remove off-screen specialties
        this.specialties = this.specialties.filter(specialty => specialty.x > -30);
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.2; // gravity
            particle.life--;
            particle.alpha = particle.life / particle.maxLife;
        });
        
        this.particles = this.particles.filter(particle => particle.life > 0);
    }
    
    createPipe() {
        const minHeight = 100;
        const maxHeight = this.canvas.height - this.pipeGap - minHeight;
        const height = Math.random() * (maxHeight - minHeight) + minHeight;
        
        this.pipes.push({
            x: this.canvas.width,
            topHeight: height,
            bottomY: height + this.pipeGap,
            bottomHeight: this.canvas.height - (height + this.pipeGap),
            scored: false
        });
    }
    
    createSpecialty() {
        const specialty = this.images.specialty[Math.floor(Math.random() * this.images.specialty.length)];
        
        this.specialties.push({
            x: this.canvas.width,
            y: Math.random() * (this.canvas.height - 100) + 50,
            width: 30,
            height: 30,
            type: specialty,
            rotation: 0,
            floatOffset: 0,
            collected: false
        });
    }
    
    createParticles(x, y, color, count) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 30,
                maxLife: 30,
                color: color,
                alpha: 1
            });
        }
    }
    
    checkCollisions() {
        // Bird vs pipes
        this.pipes.forEach(pipe => {
            if (this.bird.x < pipe.x + this.pipeWidth &&
                this.bird.x + this.bird.width > pipe.x) {
                
                if (this.bird.y < pipe.topHeight ||
                    this.bird.y + this.bird.height > pipe.bottomY) {
                    this.gameOver();
                }
            }
        });
        
        // Bird vs specialties
        this.specialties.forEach(specialty => {
            if (!specialty.collected &&
                this.bird.x < specialty.x + specialty.width &&
                this.bird.x + this.bird.width > specialty.x &&
                this.bird.y < specialty.y + specialty.height &&
                this.bird.y + this.bird.height > specialty.y) {
                
                specialty.collected = true;
                this.specialtyCount++;
                this.createParticles(specialty.x, specialty.y, '#FFD700', 10);
                this.updateUI();
            }
        });
        
        // Remove collected specialties
        this.specialties = this.specialties.filter(specialty => !specialty.collected);
    }
    
    gameOver() {
        this.gameState = 'gameOver';
        this.hideElement('pauseBtn');
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('tayBacBirdHighScore', this.highScore);
        }
        
        // Check for voucher rewards
        this.checkVoucherReward();
        
        this.showScreen('gameOverScreen');
        this.updateGameOverUI();
    }
    
    checkVoucherReward() {
        let voucherText = '';
        let discount = 0;
        
        if (this.specialtyCount >= 100) {
            discount = 20;
            voucherText = 'TAYBAC20';
        } else if (this.specialtyCount >= 50) {
            discount = 15;
            voucherText = 'TAYBAC15';
        } else if (this.specialtyCount >= 25) {
            discount = 10;
            voucherText = 'TAYBAC10';
        } else if (this.specialtyCount >= 10) {
            discount = 5;
            voucherText = 'TAYBAC05';
        }
        
        if (discount > 0) {
            document.getElementById('voucherReward').classList.remove('hidden');
            document.getElementById('voucherText').textContent = voucherText;
            
            // Save voucher to localStorage
            const vouchers = JSON.parse(localStorage.getItem('tayBacVouchers') || '[]');
            vouchers.push({
                code: voucherText,
                discount: discount,
                date: new Date().toLocaleDateString('vi-VN'),
                used: false
            });
            localStorage.setItem('tayBacVouchers', JSON.stringify(vouchers));
        } else {
            document.getElementById('voucherReward').classList.add('hidden');
        }
    }
    
    render() {
        // Clear canvas
        this.ctx.fillStyle = 'linear-gradient(to bottom, #87CEEB 0%, #98FB98 60%, #228B22 100%)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background elements
        this.drawBackground();
        
        // Draw pipes
        this.drawPipes();
        
        // Draw specialties
        this.drawSpecialties();
        
        // Draw bird
        this.drawBird();
        
        // Draw particles
        this.drawParticles();
    }
    
    drawBackground() {
        // Draw clouds
        this.ctx.font = '40px Arial';
        this.ctx.fillText('☁️', 150, 80);
        this.ctx.fillText('☁️', 400, 60);
        this.ctx.fillText('☁️', 600, 90);
        
        // Draw mountains in background
        this.ctx.font = '60px Arial';
        this.ctx.fillText('⛰️', 200, 450);
        this.ctx.fillText('⛰️', 500, 430);
    }
    
    drawPipes() {
        this.pipes.forEach(pipe => {
            // Draw as stylized trees
            this.ctx.fillStyle = '#228B22';
            
            // Top tree
            this.ctx.fillRect(pipe.x, 0, this.pipeWidth, pipe.topHeight);
            
            // Bottom tree  
            this.ctx.fillRect(pipe.x, pipe.bottomY, this.pipeWidth, pipe.bottomHeight);
            
            // Tree texture
            this.ctx.font = '20px Arial';
            for (let i = 0; i < pipe.topHeight; i += 25) {
                this.ctx.fillText('🌲', pipe.x + 30, i + 20);
            }
            
            for (let i = 0; i < pipe.bottomHeight; i += 25) {
                this.ctx.fillText('🌲', pipe.x + 30, pipe.bottomY + i + 20);
            }
        });
    }
    
    drawSpecialties() {
        this.specialties.forEach(specialty => {
            this.ctx.save();
            this.ctx.translate(specialty.x + specialty.width/2, specialty.y + specialty.height/2);
            this.ctx.rotate(specialty.rotation * Math.PI / 180);
            
            // Add glow effect
            this.ctx.shadowColor = '#FFD700';
            this.ctx.shadowBlur = 10;
            
            this.ctx.font = '25px Arial';
            this.ctx.fillText(specialty.type, -12, 8);
            
            this.ctx.restore();
        });
    }
    
    drawBird() {
        this.ctx.save();
        
        // Draw trail
        this.bird.trail.forEach((trail, index) => {
            const alpha = trail.life / 10;
            this.ctx.globalAlpha = alpha * 0.5;
            this.ctx.fillStyle = '#FFD700';
            this.ctx.beginPath();
            this.ctx.arc(trail.x + 20, trail.y + 15, 5 - index, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        this.ctx.globalAlpha = 1;
        
        // Draw bird with traditional outfit
        this.ctx.translate(this.bird.x + this.bird.width/2, this.bird.y + this.bird.height/2);
        this.ctx.rotate(this.bird.rotation * Math.PI / 180);
        
        // Bird body
        this.ctx.font = '35px Arial';
        this.ctx.fillText('🦅', -17, 12);
        
        // Traditional hat (conical hat)
        this.ctx.font = '15px Arial';
        this.ctx.fillText('👒', -8, -10);
        
        this.ctx.restore();
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.alpha;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    gameLoop(currentTime = 0) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        this.update(deltaTime);
        this.render();
        
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    updateUI() {
        document.getElementById('specialtyScore').textContent = this.specialtyCount;
        document.getElementById('highScore').textContent = this.highScore;
    }
    
    updateGameOverUI() {
        document.getElementById('finalSpecialty').textContent = this.specialtyCount;
        document.getElementById('finalScore').textContent = this.score;
    }
    
    showScreen(screenId) {
        document.getElementById(screenId).classList.remove('hidden');
    }
    
    hideScreen(screenId) {
        document.getElementById(screenId).classList.add('hidden');
    }
    
    showElement(elementId) {
        document.getElementById(elementId).classList.remove('hidden');
    }
    
    hideElement(elementId) {
        document.getElementById(elementId).classList.add('hidden');
    }
}

// Utility functions
function goBack() {
    window.location.href = 'index.html';
}

function goToShop() {
    window.location.href = 'index.html#products';
}

function copyVoucher() {
    const voucherText = document.getElementById('voucherText').textContent;
    navigator.clipboard.writeText(voucherText).then(() => {
        showNotification('Đã sao chép mã voucher: ' + voucherText);
    }).catch(() => {
        showNotification('Không thể sao chép mã voucher', 'error');
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
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

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.game = new TayBacBirdGame();
});
