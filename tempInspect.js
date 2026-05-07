const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/account_created', { waitUntil: 'domcontentloaded' });
  const locator = page.locator('a:has-text("Continue")');
  const count = await locator.count();
  console.log('count', count);
  for (let i = 0; i < count; i++) {
    const link = locator.nth(i);
    console.log(i, await link.innerText(), await link.getAttribute('href'));
  }
  await browser.close();
})();
