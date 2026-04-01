const puppeteer = require('puppeteer');

/**
 * RapidSubmit Index Verifier
 * Checks if a URL is currently indexed by Google
 */
async function checkIndexStatus(targetUrl) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Use the 'site:' footprint to see if the specific URL is indexed
    const searchUrl = `https://www.google.com/search?q=site:${encodeURIComponent(targetUrl)}`;
    
    try {
        await page.goto(searchUrl, { waitUntil: 'networkidle2' });
        
        // Look for the "did not match any documents" text
        const content = await page.content();
        const isIndexed = !content.includes("did not match any documents");

        return {
            url: targetUrl,
            indexed: isIndexed,
            timestamp: new Date().toISOString(),
            status: isIndexed ? "VERIFIED" : "PENDING_CRAWL"
        };

    } catch (error) {
        console.error("Verification Engine Error:", error);
        return { url: targetUrl, indexed: false, status: "ERROR" };
    } finally {
        await browser.close();
    }
}
