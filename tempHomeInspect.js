const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  const headings = await page.locator('h1, h2, h3').allTextContents();
  console.log('headings', headings.slice(0, 10));
  const important = ['All Products', 'Special Offer', 'Full-Fledged practice website for Automation Engineers', 'Category'];
  for (const text of important) {
    console.log(text, await page.locator(`text=${text}`).count());
  }
  await browser.close();
})();
