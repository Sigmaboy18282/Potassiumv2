// --- 5 SECOND LOADER ---
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => document.getElementById('loader').style.display = 'none', 1000);
    }, 5000);
});

// UI Elements
const mainUI = document.getElementById('main-ui');
const viewport = document.getElementById('proxy-viewport');
const frame = document.getElementById('proxy-frame');
const targetInput = document.getElementById('target');
const homeBtn = document.getElementById('back-home');

// --- THE EMBED ENGINE ---
targetInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let val = this.value.trim();
        if (!val) return;

        let finalUrl;
        if (val.includes('.') && !val.includes(' ')) {
            finalUrl = val.startsWith('http') ? val : 'https://' + val;
        } else {
            // Dark Mode DDG
            finalUrl = "https://duckduckgo.com/?q=" + encodeURIComponent(val) + "&kae=d&kh=-1";
        }

        // The Ghost Bridge Relay
        const relay = "https://translate.google.com/translate?sl=auto&tl=en&u=";
        
        // INSTEAD OF REDIRECTING: We embed.
        frame.src = relay + encodeURIComponent(finalUrl);
        
        // Show the viewport, hide the main UI
        mainUI.style.display = 'none';
        viewport.style.display = 'flex';
        document.getElementById('current-view').innerText = "TUNNELING: " + val;
    }
});

// --- HOME BUTTON ---
homeBtn.onclick = () => {
    viewport.style.display = 'none';
    mainUI.style.display = 'flex';
    frame.src = "about:blank"; // Clear frame to save memory
};

// --- SETTINGS & CLOAKING ---
const modal = document.getElementById('settings-modal');
document.getElementById('settings-trigger').onclick = () => modal.style.display = 'flex';
document.getElementById('close-settings').onclick = () => modal.style.display = 'none';

document.getElementById('cloak-select').addEventListener('change', (e) => {
    if(e.target.value === 'google') document.title = "Google Docs";
    else if(e.target.value === 'drive') document.title = "My Drive";
    else document.title = "POTASSIUM";
});

// Random User Counter
document.getElementById('user-count').innerText = Math.floor(Math.random() * 50) + 120;
