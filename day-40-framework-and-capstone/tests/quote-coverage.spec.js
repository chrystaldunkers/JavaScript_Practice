const { test, expect } = require('../fixtures/meridian.fixture');
const { getCredentials } = require('../config/environment');
const { driver } = require('../data/quote-data');

test('reach Coverage without saving', async ({ login, account, quote }) => {
  const credentials = getCredentials();
  await test.step('Sign in to the training account', async () => {
    await login.open();
    await login.signIn(credentials);
    await expect(account.heading).toBeVisible();
    await expect(account.identity).toContainText(credentials.email);
  });
  await test.step('Start a quote with fictional driver data', async () => {
    await account.startNewQuote();
    await quote.waitUntilReady();
    await quote.fillDriver({ name: driver.name, email: credentials.email });
    await expect(quote.driverName).toHaveValue(driver.name);
    await expect(quote.email).toHaveValue(credentials.email);
  });
  await test.step('Continue to Vehicle and Coverage', async () => {
    await quote.continueToVehicle();
    await expect(quote.vinInput).toBeVisible();
    await quote.continueToCoverage();
    await expect(quote.saveQuoteButton).toBeVisible();
    await expect(quote.standardChoice).toBeVisible();
  });
});
