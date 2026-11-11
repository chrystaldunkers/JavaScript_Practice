const { test, expect } = require('../fixtures/driverTest');
const profiles = require('../data/driverProfiles.json');

for (const { id, inputs } of profiles) {
  test.describe(id, () => {
    test.use({ driverOverrides: inputs });

    test('retains driver values and reaches Vehicle',
      async ({ driverPage, driver }) => {
        await driverPage.fill(driver);
        await expect(driverPage.age).toHaveValue(driver.age);
        await expect(driverPage.yearsLicensed)
          .toHaveValue(driver.yearsLicensed);

        await driverPage.continue();
        await expect(driverPage.vehicleStep).toBeVisible();
      });
  });
}
