const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// 1. SECURITY: Only allow your GitHub Pages URL to talk to this backend
app.use(cors({
    origin: 'https://rapidsubmit.github.io' 
}));
app.use(express.json());

// 2. THE BROADCAST ROUTE
app.post('/api/v1/broadcast', async (req, res) => {
    const { url } = req.body;
    
    if (!url) return res.status(400).json({ error: "URL REQUIRED" });

    try {
        // Handshake with IndexNow (Bing/Yandex/Seznam)
        // Note: You can generate a key at Bing Webmaster Tools
        const response = await axios.post('https://www.bing.com/indexnow', {
            host: "rapidsubmit.net",
            key: "7f70b77948935236b8c8d8e8", // Replace with your real key
            keyLocation: "https://rapidsubmit.net/7f70b77948935236b8c8d8e8.txt",
            urlList: [url]
        });

        console.log(`[SYSTEM]: BROADCAST SUCCESS FOR ${url}`);
        res.status(200).json({ success: true, status: "202_ACCEPTED" });

    } catch (error) {
        console.error("[SYSTEM]: GATEWAY ERROR", error.message);
        res.status(500).json({ success: false, error: "UPLINK_FAILURE" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`NODE_CORE_ONLINE: PORT ${PORT}`));
