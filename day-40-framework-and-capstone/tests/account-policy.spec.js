const { test, expect } = require('../fixtures/meridian.fixture');
const { getCredentials, getOwnedPolicy } = require('../config/environment');

test('view an owned policy and return', async ({ page, login, account, policy }) => {
  const credentials = getCredentials();
  const ownedPolicy = getOwnedPolicy();
  await test.step('Sign in to a fresh browser context', async () => {
    await login.open();
    await login.signIn(credentials);
    await expect(account.heading).toBeVisible();
    await expect(account.identity).toContainText(credentials.email);
  });
  await test.step('Open and verify the owned policy', async () => {
    await account.openPolicy(ownedPolicy.number);
    await expect(page).toHaveURL(/\/policy\/POL-[A-Z0-9]+$/);
    await policy.waitUntilReady();
    await expect(policy.policyNumber).toHaveText(ownedPolicy.number);
  });
  await test.step('Return to My account', async () => {
    await policy.backToAccount();
    await expect(page).toHaveURL(/\/account$/);
    await expect(account.heading).toBeVisible();
  });
});
