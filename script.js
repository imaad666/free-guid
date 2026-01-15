const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const guidDisplay = document.getElementById('guidDisplay');
const themeToggle = document.getElementById('themeToggle');

let currentGuid = null;

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    
    const moonIcon = themeToggle.querySelector('.moon-icon');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    
    if (document.body.classList.contains('dark-mode')) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
});

// Generate GUID
generateBtn.addEventListener('click', async () => {
    try {
        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';
        
        // Use relative path for Vercel, or localhost for local dev
        const apiUrl = window.location.hostname === 'localhost' 
            ? 'http://localhost:3000/api/generate' 
            : '/api/generate';
        
        const response = await fetch(apiUrl, {
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
    
    const copyIcon = copyBtn.querySelector('.copy-icon');
    const checkIcon = copyBtn.querySelector('.check-icon');
    
    try {
        await navigator.clipboard.writeText(currentGuid);
        copyIcon.style.display = 'none';
        checkIcon.style.display = 'block';
        setTimeout(() => {
            copyIcon.style.display = 'block';
            checkIcon.style.display = 'none';
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
        copyIcon.style.display = 'none';
        checkIcon.style.display = 'block';
        setTimeout(() => {
            copyIcon.style.display = 'block';
            checkIcon.style.display = 'none';
        }, 1000);
    }
});
