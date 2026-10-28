// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  //Navigate:  Open the Playwright website.
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  // Locate: Find the link labeled "Get started".
  // Act: Click the link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  // Assert: Verify the Installation heading is visible.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
