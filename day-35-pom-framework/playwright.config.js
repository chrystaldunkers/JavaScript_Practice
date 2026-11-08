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
  retries: 0,
  forbidOnly: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://insurance.roadtoqa.com',
    channel: 'chrome',
    viewport: { width: 1440, height: 900 },
    actionTimeout: 10000,
    navigationTimeout: 30000,
    screenshot: { mode: 'only-on-failure', fullPage: true },
    video: { mode: 'retain-on-failure', size: { width: 1440, height: 900 } },
    trace: 'retain-on-failure'
  }
});
