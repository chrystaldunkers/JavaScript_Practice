const { defineConfig, devices } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

// Read your private login file if it exists. Requires Node.js 22 or newer.
const envFile = path.join(__dirname, '.env');
if (fs.existsSync(envFile)) process.loadEnvFile(envFile);

module.exports = defineConfig({
  testDir: './tests',
  workers: 1,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { trace: 'retain-on-failure' },
  projects: [{
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
      // Uncomment to use your installed Google Chrome:
      channel: 'chrome',
    },
  }],
});
