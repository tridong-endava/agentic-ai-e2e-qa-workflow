# AutomationExercise Checkout Test Plan

## Overview
Target application: https://automationexercise.com
User story: `SCRUM-101` - complete checkout flow including registration, product selection, cart review, checkout, payment, invoice download, and account deletion.

## Scope
- Registration and login flows
- Product browsing and cart addition
- Cart review and checkout navigation
- Address verification and order review
- Payment form submission and order confirmation
- Invoice download and continue flow
- Account deletion cleanup
- Negative validations for registration and payment

## Assumptions
- A unique email address will be generated dynamically during registration.
- The site is accessible and reaction to browser automation is stable.
- Test account data can be deleted after the checkout flow.
- Product details, pricing, and cart behavior remain consistent for the selected product.

## Acceptance Criteria Coverage
- AC1: User Registration
- AC2: Product Selection
- AC3: Cart Review
- AC4: Proceed to Checkout
- AC5: Address and Order Review
- AC6: Place Order
- AC7: Payment Entry
- AC8: Download Invoice
- AC9: Continue After Order
- AC10: Delete Account
- AC11: Error Handling

## Test Scenarios

### Scenario 1: Register new customer and verify account creation
- Priority: High
- Steps:
  1. Navigate to https://automationexercise.com/login
  2. Enter a unique name and dynamically generated email
  3. Click `Signup`
  4. Complete the account creation form with test data
  5. Submit and verify `Account Created!`
  6. Verify `Logged in as` is visible and the username appears
- Expected result:
  - Account is created successfully
  - User is logged in and redirected to the relevant page

### Scenario 2: Add product to cart and verify cart details
- Priority: High
- Steps:
  1. Navigate to `Products`
  2. Select a product and click `Add to cart`
  3. Click `View Cart`
  4. Verify cart item name, price, quantity, and total are displayed
  5. Verify `Proceed To Checkout` button is visible
- Expected result:
  - Selected product appears in cart with correct details
  - Cart total matches product price and quantity

### Scenario 3: Review cart and proceed to checkout
- Priority: High
- Steps:
  1. On the cart page, click `Proceed To Checkout`
  2. Verify checkout page loads successfully
  3. Verify delivery address details are present
  4. Verify billing address details are present
  5. Verify order review includes product line items and total amount
- Expected result:
  - Checkout page displays delivery and billing addresses
  - Order summary includes the correct product and total amount

### Scenario 4: Place order and navigate to payment page
- Priority: High
- Steps:
  1. On checkout page, enter an order comment
  2. Click `Place Order`
  3. Verify redirection to the payment page
- Expected result:
  - Payment page loads with payment fields visible

### Scenario 5: Enter valid payment details and confirm order
- Priority: High
- Steps:
  1. Enter valid card details from test data
  2. Click `Pay and Confirm Order`
  3. Verify order success message is displayed
- Expected result:
  - Order is placed successfully
  - Confirmation text such as `Your order has been placed successfully!` is visible

### Scenario 6: Download invoice and continue to home page
- Priority: Medium
- Steps:
  1. Click `Download Invoice`
  2. Verify the invoice file download is initiated or available
  3. Click `Continue`
  4. Verify redirection back to the home page
- Expected result:
  - Invoice download is available
  - User returns to home after clicking `Continue`

### Scenario 7: Delete account after checkout
- Priority: Medium
- Steps:
  1. Navigate to `Delete Account`
  2. Confirm account deletion
  3. Verify `Account Deleted!` message is displayed
- Expected result:
  - Account is deleted and confirmation is shown

### Scenario 8: Registration form validation negative case
- Priority: Medium
- Steps:
  1. Navigate to signup page
  2. Submit signup with missing name or invalid email
  3. Verify validation or error feedback appears
- Expected result:
  - Registration does not proceed
  - Appropriate error messages are shown

### Scenario 9: Payment form validation negative case
- Priority: Medium
- Steps:
  1. Navigate to the payment page after placing order
  2. Enter invalid or incomplete card details
  3. Attempt to submit payment
  4. Verify errors or validation feedback appear
- Expected result:
  - Payment confirmation does not succeed
  - Validation messages are displayed

## Test Data
- Name: Test User
- First Name: Test
- Last Name: User
- Company: Endava
- Address: 123 Test Street
- Country: Canada
- State: Ontario
- City: Toronto
- Zipcode: 12345
- Mobile Number: 1234567890
- Card Name: Test User
- Card Number: 4111111111111111
- CVC: 123
- Expiration Month: 12
- Expiration Year: 2030
- Password: Password123
- Email: generated dynamically during test execution

## Risk and Notes
- The site uses ads and external scripts that may affect automation stability.
- Direct browser automation may require handling overlays or popups.
- Cart persistence could depend on cookies and session state.
- Invoice download may require Playwright download handling.
- Account deletion should be performed last to keep the environment clean.
