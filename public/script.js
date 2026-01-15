const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const guidDisplay = document.getElementById('guidDisplay');
const themeToggle = document.getElementById('themeToggle');

let currentGuid = null;

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Generate GUID
generateBtn.addEventListener('click', async () => {
    try {
        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';
        
        const response = await fetch('http://localhost:3000/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            currentGuid = data.guid;
            guidDisplay.textContent = currentGuid;
            copyBtn.disabled = false;
        } else {
            guidDisplay.textContent = 'Error generating GUID';
            copyBtn.disabled = true;
        }
    } catch (error) {
        console.error('Error:', error);
        guidDisplay.textContent = 'Error: Could not connect to server';
        copyBtn.disabled = true;
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate';
    }
});

// Copy to clipboard
copyBtn.addEventListener('click', async () => {
    if (!currentGuid) return;
    
    try {
        await navigator.clipboard.writeText(currentGuid);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 1000);
    } catch (error) {
        console.error('Failed to copy:', error);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = currentGuid;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        copyBtn.textContent = '✓';
        setTimeout(() => {
            copyBtn.textContent = '📋';
        }, 1000);
    }
});
