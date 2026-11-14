const { test, expect } = require('../fixtures/driverTest');

test('Continue opens the Vehicle step', async ({ driverPage, driver }) => {
  await driverPage.fill(driver);
  await driverPage.continue();
  await expect(driverPage.vehicleStep).toBeVisible();
});
