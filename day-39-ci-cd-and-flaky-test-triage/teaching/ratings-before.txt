const { test, expect } = require('../fixtures/timingTest');

test('rating count is ready before we continue', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const ratingCount = page.getByText('Rating factors live', { exact: true })
    .locator('..').getByText(/^[1-9]\d*$/);

  // Deliberate classroom mistake: the response can take longer than this pause.
  await page.waitForTimeout(1000);
  expect(await ratingCount.isVisible()).toBe(true);
});
