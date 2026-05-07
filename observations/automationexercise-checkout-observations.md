# AutomationExercise Checkout Exploratory Observations

## Test Context
- Application URL: https://automationexercise.com
- User story: SCRUM-101 AutomationExercise checkout workflow
- Exploratory focus: registration, product selection, cart review, checkout flow, payment, and account cleanup.

## Key Findings

### Signup / Login
- The homepage includes a `Signup / Login` link that navigates to `https://automationexercise.com/login`.
- The login page contains:
  - Login form with `Email Address` and `Password`
  - New User Signup form with `Name` and `Email Address`
- New user signup uses `data-qa` selectors:
  - `input[data-qa="signup-name"]`
  - `input[data-qa="signup-email"]`
- The signup action submits to `/signup` and loads the `ENTER ACCOUNT INFORMATION` page.
- The account creation form includes:
  - Title radio buttons: `input[name="title"][value="Mr"]`, `input[name="title"][value="Mrs"]`
  - `input[name="password"]`
  - `select[name="days"]`, `select[name="months"]`, `select[name="years"]`
  - `input[name="first_name"]`, `input[name="last_name"]`, `input[name="company"]`
  - `input[name="address1"]`, `select[name="country"]`, `input[name="state"]`
  - `input[name="city"]`, `input[name="zipcode"]`, `input[name="mobile_number"]`
  - Create Account button: `button[data-qa="create-account"]`

### Product Selection
- The product list at `https://automationexercise.com/products` shows a stable set of products.
- Product detail pages like `/product_details/1` include:
  - Product name `Blue Top`
  - `button:has-text("Add to cart")`
  - Quantity spin button with `input[type="number"]` or `spinbutton`
- Adding a product to cart opens a modal with options:
  - `View Cart`
  - `Continue Shopping`
- The `View Cart` navigation is available from the modal and via top menu link.

### Cart and Checkout
- The cart page is `https://automationexercise.com/view_cart`.
- If the cart is empty, the page shows `Cart is empty! Click here to buy products.`
- `Proceed To Checkout` is available when a product is in the cart.
- The checkout page `https://automationexercise.com/checkout` includes:
  - Address Details section
  - `Your delivery address` and `Your billing address`
  - Order review table with item rows and total amount
  - Order comment textarea `textarea[name="message"]`
  - `Place Order` link that navigates to `/payment`

### Payment Page
- The payment page `https://automationexercise.com/payment` includes fields with `data-qa`:
  - `input[name="name_on_card"]`
  - `input[name="card_number"]`
  - `input[name="cvc"]`
  - `input[name="expiry_month"]`
  - `input[name="expiry_year"]`
- The Pay button is `button:has-text("Pay and Confirm Order")`.

### Account Deletion
- `https://automationexercise.com/delete_account` returns:
  - `ACCOUNT DELETED!`
  - `Your account has been permanently deleted!`
  - `Continue` link to return to the homepage

## Observed UI Issues and Risks
- The site loads mixed-content font resources over HTTP, which are blocked in secure browsers.
- Ads and analytics requests are frequently blocked or fail during automation runs.
- `https://automationexercise.com/checkout` reported a CSS MIME type issue in the browser snapshot.
- Direct navigation to `/signup` can be inconsistent; the stable flow is to submit the signup form from `/login`.

## Automation Notes
- Use dynamic email creation for signup to avoid duplicate account collisions.
- Prefer `data-qa` selectors for payment and signup fields where available.
- Use the product detail page and modal flow to add items to cart.
- Validate navigation with `page.waitForURL('**/checkout')` and `page.waitForURL('**/payment')`.
- If the cart is empty, use direct product selection and modal `View Cart` rather than relying on top menu only.

## Screenshots and Evidence
- Captured screenshot of the `Payment` page and `Shopping Cart` empty state during exploratory testing.
- Observed checkout and delete-account page text in browser page snapshots.
