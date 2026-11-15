const { test: base, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { AccountPage } = require('../pages/AccountPage');
const { PolicyPage } = require('../pages/PolicyPage');
const { QuotePage } = require('../pages/QuotePage');

const test = base.extend({
  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  account: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  policy: async ({ page }, use) => {
    await use(new PolicyPage(page));
  },
  quote: async ({ page }, use) => {
    await use(new QuotePage(page));
  }
});

module.exports = { test, expect };
