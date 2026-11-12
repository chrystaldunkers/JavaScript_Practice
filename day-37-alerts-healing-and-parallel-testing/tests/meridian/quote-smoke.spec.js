const { test, expect } = require('../../fixtures/driverTest');

test('retains the fictional age and experience', async ({ driverPage, driver }) => {
  await driverPage.fill(driver);
  await expect(driverPage.age).toHaveValue(driver.age);
  await expect(driverPage.yearsLicensed).toHaveValue(driver.yearsLicensed);
});

test('advances the fictional quote from Driver to Vehicle', async ({ driverPage, driver }) => {
  await driverPage.fill(driver);
  await driverPage.continue();
  await expect(driverPage.vehicleStep).toBeVisible();
});
