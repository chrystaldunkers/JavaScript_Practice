const { test, expect } = require('@playwright/test');

test('captures Vehicle evidence', async ({ page }, testInfo) => {
  await page.goto('https://insurance.roadtoqa.com/');

  const ratingTile = page
    .getByText('Rating factors live', { exact: true })
    .locator('..');
  await expect(ratingTile.getByText(/^[1-9]\d*$/)).toBeVisible();

  await page.getByLabel('Driver name').fill('Avery Test');
  await page.getByRole('textbox', { name: 'Email', exact: true })
    .fill('avery@example.com');

  const vin = page.getByRole('textbox', { name: /^VIN/ });
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(vin).toBeVisible();
  const imagePath = testInfo.outputPath('vehicle.png');
  await page.screenshot({ path: imagePath, fullPage: true });
  await testInfo.attach('Vehicle reached', {
    path: imagePath,
    contentType: 'image/png'
  });
});
