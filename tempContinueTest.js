const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/account_created', { waitUntil: 'domcontentloaded' });
  const continueLink = page.locator('a:has-text("Continue")').first();
  console.log('visible', await continueLink.isVisible());
  const [navigation] = await Promise.all([
    page.waitForNavigation({ url: '**/', timeout: 20000 }),
    continueLink.click(),
  ]);
  console.log('navigated to', page.url());
  await browser.close();
})();
