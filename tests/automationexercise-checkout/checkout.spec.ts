import { test, expect } from '@playwright/test';
import { AutomationExercisePage } from '../../pages/automationexercisePage';

test.describe('AutomationExercise checkout workflow', () => {
  test('should register a new user, place an order, and delete the account', async ({ page }) => {
    const app = new AutomationExercisePage(page);
    const email = `testuser+${Date.now()}@example.com`;

    await app.registerNewUser('Test User', email);
    await app.completeAccountInformation({
      firstName: 'Test',
      lastName: 'User',
      company: 'Endava',
      address1: '123 Test Street',
      country: 'Canada',
      state: 'Ontario',
      city: 'Toronto',
      zipcode: '12345',
      mobileNumber: '1234567890',
    });
    await app.verifyAccountCreated();
    await app.continueAfterAccountCreated();

    await app.addFirstProductToCart();
    await app.verifyCartHasProduct('Blue Top');
    await app.proceedToCheckout();
    await app.verifyCheckoutDetails();
    await app.placeOrder('Please deliver between 9am and 5pm.');

    await app.fillPaymentDetails({
      nameOnCard: 'Test User',
      cardNumber: '4111111111111111',
      cvc: '123',
      expiryMonth: '12',
      expiryYear: '2030',
    });
    await app.confirmPayment();
    await app.verifyOrderConfirmation();

    const invoicePath = await app.downloadInvoice();
    expect(invoicePath).toBeTruthy();

    await app.deleteAccount();
  });

  test('should not proceed with new signup when email is missing', async ({ page }) => {
    const app = new AutomationExercisePage(page);
    await app.gotoLogin();
    await app.signupName.fill('Test User');
    await app.signupEmail.fill('');
    await page.click('button:has-text("Signup")');
    await expect(page).toHaveURL(/.*\/login/, { timeout: 10000 });
    await expect(app.signupEmail).toBeVisible();
  });
});
