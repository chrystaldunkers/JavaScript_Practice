const { test, expect } = require('@playwright/test');

test('fills the Driver name field', async ({ page }) => {
  await page.goto('https://insurance.roadtoqa.com/');

 const driverName = page.getByLabel('Driver name', { exact: true });
  await driverName.fill('Alex Learner');
  await expect(driverName).toHaveValue('Alex Learner');
});
