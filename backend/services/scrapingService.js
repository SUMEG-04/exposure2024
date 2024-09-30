const puppeteer = require('puppeteer');

const getSolvedProblems = async (leetcodeUsername) => {
    let browser;
    try {
        leetcodeUsername = "sumeg_04";  // Ensure this is the correct username
        console.log(`Attempting to scrape data for user: ${leetcodeUsername}`);

        browser = await puppeteer.launch({
            headless: false,  // Keep this false for debugging
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        const leetcodeProfileUrl = `https://leetcode.com/${leetcodeUsername}/`;  // Remove '/u/' from URL
        console.log(`Navigating to: ${leetcodeProfileUrl}`);

        // Enable console log collection
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));

        // Navigate to the page and log any errors
        const response = await page.goto(leetcodeProfileUrl, { 
            waitUntil: 'networkidle2',
            timeout: 30000 // Increase timeout to 30 seconds
        });

        if (!response.ok()) {
            console.log(`HTTP response status: ${response.status()}`);
        }

        // Wait for some time to ensure the page loads
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Log the page title
        const title = await page.title();
        console.log('Page title:', title);

        // Check if the profile exists using a more general selector
        const profileExists = await page.evaluate(() => {
            // Look for any element that's likely to be on a profile page
            const profileIndicator = document.querySelector('.flex-col');
            console.log('Profile indicator found:', !!profileIndicator);
            return !!profileIndicator;
        });

        if (!profileExists) {
            console.log('Profile not found. Check if the username is correct and the profile is public.');
            throw new Error('LeetCode profile not found.');
        }

        console.log('Profile found. Attempting to scrape solved problems.');

        // Try to find any recognizable element on the page
        const pageContent = await page.evaluate(() => {
            return {
                body: document.body.innerText,
                headers: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.innerText)
            };
        });

        console.log('Page headers:', pageContent.headers);
        console.log('Page body excerpt:', pageContent.body.slice(0, 200) + '...');

        // Rest of the scraping logic...
        // (Omitted for brevity, but keep your existing scraping logic here)

        return []; // Return empty array for now, replace with actual scraped data
    } catch (err) {
        console.error('Error scraping LeetCode data:', err.message);
        throw new Error('Failed to scrape LeetCode profile data.');
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

// getSolvedProblems().catch(console.error);

module.exports = {
    getSolvedProblems
};