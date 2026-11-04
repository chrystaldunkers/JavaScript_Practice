// REFERENCE ONLY - this file is not a runnable test.

// Avoid fixed sleeps in the test:
// await page.waitForTimeout(5000);

// An immediate observation does not retry:
// const visibleNow = await vin.isVisible();

// For a genuinely slow, correct condition only:
// await expect(vin).toBeVisible({ timeout: 10_000 });
