const { test, expect } = require('../fixtures/timingTest');

test('rating count is ready before we continue', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const ratingCount = page.getByText('Rating factors live', { exact: true })
    .locator('..').getByText(/^[1-9]\d*$/);

  // Wait for the state we actually need.
  await expect(ratingCount).toBeVisible();
});
