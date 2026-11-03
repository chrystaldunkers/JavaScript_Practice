const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  workers: 1,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    viewport: { width: 1650, height: 830 },
    trace: 'retain-on-failure',
    // Uncomment to use your installed Google Chrome:
    // channel: 'chrome',
  },
});
