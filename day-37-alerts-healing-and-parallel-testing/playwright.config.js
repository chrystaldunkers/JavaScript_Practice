const { defineConfig } = require('@playwright/test');
const smoke = '**/quote-smoke.spec.js';

module.exports = defineConfig({
  testDir: './tests',
  workers: 1,
  fullyParallel: true,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'https://insurance.roadtoqa.com',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'locator', testMatch: '**/locator-repair.spec.js',
      use: { browserName: 'chromium', channel: 'chrome' } },
    { name: 'chrome', testMatch: smoke,
      use: { browserName: 'chromium', channel: 'chrome' } },
    { name: 'edge', testMatch: smoke,
      use: { browserName: 'chromium', channel: 'msedge' } },
    { name: 'firefox', testMatch: smoke,
      use: { browserName: 'firefox' } },
  ],
});
