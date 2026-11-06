# Day 34 design reference - not executable

```javascript
// DAY 34 DESIGN REFERENCE - not an executable test.
// Implement the remaining three models and full test wrappers in Day 35.

// A: view a known owned policy
const login = new LoginPage(page);
const account = new AccountPage(page);
const policy = new PolicyPage(page);

await login.open();
await login.signIn(credentials);
await expect(account.heading).toBeVisible();
await expect(account.identity).toContainText(credentials.email);
await account.openPolicy(ownedPolicy.number);
await expect(policy.policyNumber).toHaveText(ownedPolicy.number);
await policy.backToAccount();
await expect(account.heading).toBeVisible();

```

## B: separate test, fresh page, independent sign-in

```javascript

const login = new LoginPage(page);
const account = new AccountPage(page);
const quote = new QuotePage(page);

await login.open();
await login.signIn(credentials);
await expect(account.identity).toContainText(credentials.email);
await account.startNewQuote();
await quote.waitUntilReady();
await quote.fillDriver({ name: driver.name, email: credentials.email });
await quote.continueToVehicle();
await expect(quote.vinInput).toBeVisible();
await quote.continueToCoverage();
await expect(quote.saveQuoteButton).toBeVisible();
// Stop before saving. No payment or purchase.
```
