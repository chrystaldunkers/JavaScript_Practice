const { test, expect } = require('@playwright/test');
test('saves a demo quote', async ({ page }) => {
  await page.goto('https://insurance.roadtoqa.com/');
  // Wait for Meridian's live rating data before filling the form.
  const ratingTile = page.getByText('Rating factors live', { exact: true }).locator('..');
  await expect(ratingTile.getByText(/^[1-9]\d*$/)).toBeVisible();
  const driverName = page.getByLabel('Driver name');
  const email = page.getByRole('textbox', { name: 'Email', exact: true });
  await driverName.fill('Avery Test');
  await email.fill('avery@example.com');
  await expect(driverName).toHaveValue('Avery Test');
  await expect(email).toHaveValue('avery@example.com');
  const state = page.getByRole('combobox', {
    name: 'License state', exact: true
  });
  await state.click();
  await page.getByRole('option', {
    name: /^CA/
  }).click();
  await expect(state).toContainText('California');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  const vin = page.getByRole('textbox', { name: /^VIN/ });
  await expect(vin).toBeVisible();
  // Keep the prefilled vehicle values for this first test.
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  const safeDriver = page.getByRole(
    'checkbox', { name: /^Safe driver/ }
  );
  await safeDriver.check();
  await expect(safeDriver).toBeChecked();
  await page.getByRole('button', { name: 'Save my quote', exact: true }).click();
  const savedQuote = page.getByText(/Quote QT-.*saved to the database/);
  await expect(savedQuote).toBeVisible();
});
