const { test: base, expect } = require('@playwright/test');
const { DriverDetailsPage } = require('../pages/DriverDetailsPage');
const { createDriver } = require('../data/drivers');

const test = base.extend({
  driverOverrides: [{}, { option: true }],

  driver: async ({ driverOverrides }, use) => {
    const driver = createDriver(driverOverrides);
    await use(driver);
    // No external record was created, so there is nothing to delete here.
  },

  driverPage: async ({ page }, use) => {
    const driverPage = new DriverDetailsPage(page);
    await driverPage.open();
    await use(driverPage);
    // Playwright owns and cleans up the built-in page and its context.
  }
});

module.exports = { test, expect };
