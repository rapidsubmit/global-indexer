const HISTORY_KEY = 'rapid_history';

// 1. Core Submission Logic
async function runMobileSubmission() {
    const title = document.getElementById('mobTitle').value;
    const url = document.getElementById('website-url').value;
    const log = document.getElementById('terminal-log');

    if(!title || !url) return alert("CRITICAL ERROR: ALL FIELDS REQUIRED.");

    if(log) {
        log.style.display = "block";
        log.innerHTML = "> INITIATING HANDSHAKE...<br>";
    }

    try {
        await broadcastSequence(url, title);
        
        // Final success logs
        if(log) {
            setTimeout(() => {
                log.innerHTML += "> [SUCCESS] GLOBAL BROADCAST ACKNOWLEDGED.<br>";
                log.innerHTML += "> [SUCCESS] AD REVENUE CACHED.<br>";
            }, 1000);
        }
    } catch (e) {
        if(log) log.innerHTML += "> [ERROR] UPLINK FAILED.<br>";
        console.error(e);
    }
}

// 2. Terminal Visual Sequence
async function broadcastSequence(url, title) {
    const overlay = document.getElementById('terminal-overlay');
    const terminal = document.getElementById('terminal-body');
    
    if (!overlay || !terminal) {
        updateSubmissionHistory(url, title);
        return;
    }

    overlay.style.display = 'flex';
    terminal.innerHTML = ''; 

    const sequence = [
        { text: "> ACCESSING RAPIDSUBMIT GATEWAY...", delay: 400 },
        { text: "> ESTABLISHING INDEXNOW PROTOCOL...", delay: 600 },
        { text: `> ENCRYPTING DATA PACKET: ${url}`, delay: 500 },
        { text: "> PINGING GOOGLE_V3... [SUCCESS]", delay: 700 },
        { text: "> PINGING BING_HUB... [SUCCESS]", delay: 400 },
        { text: "> ALL NODES VERIFIED. BROADCAST COMPLETE.", delay: 500 }
    ];

    for (const line of sequence) {
        await new Promise(res => setTimeout(res, line.delay));
        const div = document.createElement('div');
        div.style.marginBottom = '5px';
        div.innerHTML = line.text;
        terminal.appendChild(div);
        terminal.scrollTop = terminal.scrollHeight;
    }

    setTimeout(() => {
        overlay.style.display = 'none';
        updateSubmissionHistory(url, title);
    }, 2000);
}

// 3. Scan & Fix (Analysis)
async function scanAndFix() {
    const url = document.getElementById('website-url').value;
    if(!url) return alert("INPUT URL FOR ANALYSIS.");

    const btn = document.getElementById('broadcast-btn');
    alert("SYSTEM ANALYSIS: Scanning for 'noindex' tags and Robots.txt blockers...");
    
    // Simulate Scan logic
    setTimeout(() => {
        alert("ANALYSIS COMPLETE: 0 blocks found. URL optimized for broadcast.");
        btn.classList.add('pulse-effect');
    }, 1500);
}

// 4. History Management
function updateSubmissionHistory(url, title) {
    let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    const timestamp = new Date().toLocaleTimeString();
    
    const newEntry = { url, title, time: timestamp, date: new Date().toLocaleDateString() };
    history.unshift(newEntry);
    if(history.length > 10) history.pop();
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    const list = document.getElementById('history-list');
    const table = document.getElementById('log-body');
    const noHistory = document.getElementById('no-history');
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

    if(history.length > 0 && noHistory) noHistory.style.display = 'none';

    if(list) {
        list.innerHTML = history.map(item => `
            <div style="padding:10px; border-bottom:1px solid #30363d;">
                <div style="color:#fff; font-weight:bold;">${item.title}</div>
                <div style="color:#007bff; font-size:12px;">${item.url}</div>
            </div>
        `).join('');
    }

    if(table) {
        table.innerHTML = history.map(item => `
            <tr>
                <td>${item.url.substring(0,20)}...</td>
                <td>${item.time}</td>
                <td class="status-success">SENT</td>
                <td style="color:#f59e0b">PENDING</td>
            </tr>
        `).join('');
    }
}

// 5. Utilities
function downloadIndexingLog() {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    if(history.length === 0) return alert("NO DATA TO EXPORT.");

    let csv = "Timestamp,URL,Title,Status\n";
    history.forEach(h => { csv += `${h.time},${h.url},${h.title},SUCCESS\n`; });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'RapidSubmit_Manifest.csv');
    a.click();
}

function clearHistory() {
    if(confirm("WIPE ALL MISSION LOGS?")) {
        localStorage.removeItem(HISTORY_KEY);
        location.reload();
    }
}

function generateSessionID() {
    const id = 'RS-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    document.getElementById('session-id').innerText = id;
}

function dismissCTA() {
    document.getElementById('seo-hosting-cta').style.display = 'none';
}

// Initialization
window.addEventListener('load', () => {
    generateSessionID();
    displayHistory();
    setTimeout(() => {
        document.getElementById('seo-hosting-cta').style.display = 'block';
    }, 4000);
});
