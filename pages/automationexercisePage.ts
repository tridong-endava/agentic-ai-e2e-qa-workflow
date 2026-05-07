import { expect, Locator, Page } from '@playwright/test';

export type AccountInformation = {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

export type PaymentInformation = {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
};

export class AutomationExercisePage {
  readonly page: Page;
  readonly baseUrl = 'https://automationexercise.com';
  readonly signupName: Locator;
  readonly signupEmail: Locator;
  readonly createAccountButton: Locator;
  readonly addToCartButton: Locator;
  readonly viewCartButton: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly placeOrderLink: Locator;
  readonly orderCommentTextarea: Locator;
  readonly nameOnCard: Locator;
  readonly cardNumber: Locator;
  readonly cvcInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;
  readonly payAndConfirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupName = page.locator('input[data-qa="signup-name"]');
    this.signupEmail = page.locator('input[data-qa="signup-email"]');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
    this.addToCartButton = page.locator('button:has-text("Add to cart")');
    this.viewCartButton = page.locator('a:has-text("View Cart"), button:has-text("View Cart")');
    this.proceedToCheckoutButton = page.locator('a:has-text("Proceed To Checkout"), button:has-text("Proceed To Checkout")');
    this.placeOrderLink = page.locator('a:has-text("Place Order"), button:has-text("Place Order")');
    this.orderCommentTextarea = page.locator('textarea[name="message"]');
    this.nameOnCard = page.locator('input[data-qa="name-on-card"]');
    this.cardNumber = page.locator('input[data-qa="card-number"]');
    this.cvcInput = page.locator('input[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('input[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('input[data-qa="expiry-year"]');
    this.payAndConfirmButton = page.locator('button:has-text("Pay and Confirm Order")');
  }

  async gotoLogin() {
    await this.page.goto(`${this.baseUrl}/login`, { waitUntil: 'domcontentloaded' });
    await expect(this.signupName).toBeVisible();
  }

  async registerNewUser(name: string, email: string) {
    await this.gotoLogin();
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.page.evaluate(() => {
      const form = document.querySelector('form[action="/signup"]') as HTMLFormElement | null;
      if (!form) throw new Error('Signup form not found');
      form.submit();
    });
    await this.page.waitForURL('**/signup', { timeout: 20000 });
  }

  async completeAccountInformation(account: AccountInformation) {
    await expect(this.page.locator('form[action="/signup"]')).toBeVisible({ timeout: 15000 });
    await this.page.check('input[name="title"][value="Mr"]');
    await this.page.fill('input[name="password"]', 'Password123');
    await this.page.selectOption('select[name="days"]', '1');
    await this.page.selectOption('select[name="months"]', 'January');
    await this.page.selectOption('select[name="years"]', '1990');
    await this.page.check('input[name="newsletter"]');
    await this.page.check('input[name="optin"]');
    await this.page.fill('input[name="first_name"]', account.firstName);
    await this.page.fill('input[name="last_name"]', account.lastName);
    await this.page.fill('input[name="company"]', account.company);
    await this.page.fill('input[name="address1"]', account.address1);
    await this.page.selectOption('select[name="country"]', account.country);
    await this.page.fill('input[name="state"]', account.state);
    await this.page.fill('input[name="city"]', account.city);
    await this.page.fill('input[name="zipcode"]', account.zipcode);
    await this.page.fill('input[name="mobile_number"]', account.mobileNumber);
    await expect(this.createAccountButton).toBeVisible({ timeout: 15000 });
    await this.createAccountButton.click();
    await expect(this.page).toHaveURL(/.*account_created/,{timeout:20000});
  }

  async verifyAccountCreated() {
    await expect(this.page.locator('text=Account Created!')).toBeVisible({ timeout: 20000 });
  }

  async continueAfterAccountCreated() {
    const continueLink = this.page.locator('a:has-text("Continue")').first();
    await expect(continueLink).toBeVisible({ timeout: 15000 });
    await continueLink.click();
    await this.page.waitForURL('**/', { timeout: 20000 });
    await expect(this.page.locator('h2:has-text("Full-Fledged")').first()).toBeVisible({ timeout: 15000 });
  }

  async addFirstProductToCart() {
    await this.page.goto(`${this.baseUrl}/product_details/1`, { waitUntil: 'domcontentloaded' });
    await expect(this.addToCartButton).toBeVisible({ timeout: 15000 });
    await this.addToCartButton.click();
    await expect(this.viewCartButton).toBeVisible({ timeout: 10000 });
    await this.viewCartButton.click();
    await this.page.waitForURL('**/view_cart', { timeout: 15000 });
  }

  async verifyCartHasProduct(productName: string) {
    await expect(this.page.locator(`text=${productName}`)).toBeVisible({ timeout: 10000 });
    await expect(this.proceedToCheckoutButton).toBeVisible({ timeout: 10000 });
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
    await this.page.waitForURL('**/checkout', { timeout: 15000 });
  }

  async verifyCheckoutDetails() {
    await expect(this.page.locator('text=Address Details')).toBeVisible({ timeout: 15000 });
    await expect(this.page.locator('text=Your delivery address')).toBeVisible();
    await expect(this.page.locator('text=Your billing address')).toBeVisible();
    await expect(this.page.locator('text=Review Your Order')).toBeVisible();
  }

  async placeOrder(comment: string) {
    await this.orderCommentTextarea.fill(comment);
    await expect(this.placeOrderLink).toBeVisible({ timeout: 10000 });
    await this.placeOrderLink.click();
    await this.page.waitForURL('**/payment', { timeout: 15000 });
  }

  async fillPaymentDetails(payment: PaymentInformation) {
    await expect(this.nameOnCard).toBeVisible({ timeout: 15000 });
    await this.nameOnCard.fill(payment.nameOnCard);
    await this.cardNumber.fill(payment.cardNumber);
    await this.cvcInput.fill(payment.cvc);
    await this.expiryMonthInput.fill(payment.expiryMonth);
    await this.expiryYearInput.fill(payment.expiryYear);
  }

  async confirmPayment() {
    await expect(this.payAndConfirmButton).toBeVisible({ timeout: 15000 });
    await this.payAndConfirmButton.click();
  }

  async verifyOrderConfirmation() {
    await expect(this.page).toHaveURL(/.*payment_done.*/, { timeout: 20000 });
    await expect(this.page.locator('text=ORDER PLACED!')).toBeVisible({ timeout: 20000 });
    await expect(this.page.locator('text=Congratulations! Your order has been confirmed!')).toBeVisible({ timeout: 20000 });
  }

  async downloadInvoice() {
    const downloadLink = this.page.locator('a:has-text("Download Invoice")').first();
    await expect(downloadLink).toBeVisible({ timeout: 15000 });
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      downloadLink.click(),
    ]);
    const path = await download.path();
    return path;
  }

  async continueAfterOrderPlaced() {
    const continueLink = this.page.locator('a:has-text("Continue")').first();
    await expect(continueLink).toBeVisible({ timeout: 15000 });
    await Promise.all([
      this.page.waitForNavigation({ url: '**/', timeout: 20000 }),
      continueLink.click(),
    ]);
  }

  async deleteAccount() {
    await this.page.goto(`${this.baseUrl}/delete_account`, { waitUntil: 'domcontentloaded' });
    await expect(this.page.locator('text=Account Deleted!')).toBeVisible({ timeout: 15000 });
  }
}
