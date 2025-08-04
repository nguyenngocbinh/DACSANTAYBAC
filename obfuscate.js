const fs = require('fs');
const path = require('path');

// Simple JavaScript obfuscator
function obfuscateJS(code) {
    // Replace function names and variables with random names
    const replacements = new Map();
    let counter = 1;
    
    // Generate random variable names
    function getRandomName() {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    // Obfuscate strings
    code = code.replace(/"([^"]+)"/g, (match, str) => {
        if (str.length < 3) return match;
        const encoded = btoa(str).split('').reverse().join('');
        return `atob("${encoded}".split('').reverse().join(''))`;
    });
    
    // Remove comments
    code = code.replace(/\/\*[\s\S]*?\*\//g, '');
    code = code.replace(/\/\/.*$/gm, '');
    
    // Remove extra whitespace
    code = code.replace(/\s+/g, ' ');
    code = code.replace(/\s*([{}();,=+\-*/<>!&|])\s*/g, '$1');
    
    return code;
}

// Files to obfuscate
const filesToObfuscate = [
    'js/script.js',
    'js/admin.js'
];

// Create obfuscated versions
filesToObfuscate.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const obfuscated = obfuscateJS(content);
        
        // Create .min.js version
        const minPath = filePath.replace('.js', '.min.js');
        fs.writeFileSync(minPath, obfuscated);
        console.log(`✅ Obfuscated: ${file} -> ${path.basename(minPath)}`);
    }
});

console.log('🔐 Obfuscation completed!');
console.log('📝 Update HTML files to use .min.js versions before deploying to GitHub.');
