const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: process.env.LESSON_EXERCISE === 'timing' ? './timing' : './tests',
  workers: 1,
  retries: 1,
  failOnFlakyTests: true,
  forbidOnly: !!process.env.CI,
  reporter: [['list'], ['html', { open: 'never' }], ['json']],
  use: {
    baseURL: 'https://insurance.roadtoqa.com',
    browserName: 'chromium',
    channel: process.env.PLAYWRIGHT_CHROMIUM_CHANNEL || undefined,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
});
