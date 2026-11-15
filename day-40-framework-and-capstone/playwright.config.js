const fs = require('node:fs');
const path = require('node:path');
const envFile = path.join(__dirname, '.env');
if (fs.existsSync(envFile)) process.loadEnvFile(envFile);
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: { timeout: 15000 },
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  failOnFlakyTests: true,
  forbidOnly: true,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: process.env.PLAYWRIGHT_JSON_OUTPUT_FILE || 'test-results/results.json' }],
    ['allure-playwright', { resultsDir: 'allure-results', detail: false }],
  ],
  use: {
    baseURL: 'https://insurance.roadtoqa.com',
    ...(process.env.PLAYWRIGHT_CHROMIUM_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHROMIUM_CHANNEL } : {}),
    viewport: { width: 1440, height: 900 },
    actionTimeout: 10000,
    navigationTimeout: 30000,
    screenshot: { mode: 'only-on-failure', fullPage: true },
    video: process.env.PLAYWRIGHT_DISABLE_VIDEO === '1' ? 'off' :
      { mode: 'retain-on-failure', size: { width: 1440, height: 900 } },
    trace: 'retain-on-failure'
  }
});
