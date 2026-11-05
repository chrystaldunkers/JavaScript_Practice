const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  workers: 1,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    // Uncomment to use installed Google Chrome (as in the lesson):
    // channel: 'chrome',
    viewport: { width: 1280, height: 720 },
    screenshot: { mode: 'only-on-failure', fullPage: true },
    video: {
      mode: 'retain-on-failure',
      size: { width: 1280, height: 720 }
    },
    trace: 'retain-on-failure'
  }
});
