const { test, expect } = require('../../fixtures/driverTest');

test('opens the Vehicle step through the Continue button', async ({ driverPage, driver }) => {
  await driverPage.fill(driver);
const continueButton = driverPage.page.getByRole('button', { name: 'Continue', exact: true });
  await continueButton.click({ timeout: 5000 });
  await expect(driverPage.vehicleStep).toBeVisible();
});
