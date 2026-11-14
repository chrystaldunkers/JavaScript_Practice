const { test: base, expect } = require('@playwright/test');

const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    // Controlled classroom network conditions, explicitly printed in each attempt.
    // The real response is slow on the initial attempt and normal on the retry.
    const delayMs = testInfo.retry === 0 ? 3000 : 0;
    console.log(`CLASSROOM NETWORK DELAY: attempt ${testInfo.retry + 1}, ${delayMs} ms`);
    await page.route('**/rest/v1/rate_factors*', async route => {
      const response = await route.fetch();
      expect(response.status()).toBe(200);
      await new Promise(resolve => setTimeout(resolve, delayMs));
      await route.fulfill({ response });
    });
    try {
      await use(page);
    } finally {
      // Let a delayed response finish before its browser context is closed.
      await page.unrouteAll({ behavior: 'wait' });
    }
  },
});

module.exports = { test, expect };
