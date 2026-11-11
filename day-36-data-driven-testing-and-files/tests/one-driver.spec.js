const { test, expect } = require('../fixtures/driverTest');

test.use({
  driverOverrides: { age: '35', yearsLicensed: '10' },
});

test('typical driver can reach Vehicle', async ({ driverPage, driver }) => {
  await driverPage.fill(driver);
  await expect(driverPage.age).toHaveValue('35');
  await expect(driverPage.yearsLicensed).toHaveValue('10');

  await driverPage.continue();
  await expect(driverPage.vehicleStep).toBeVisible();
});
