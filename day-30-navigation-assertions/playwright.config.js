const { defineConfig } = require('@playwright/test');

// Use the prepared settings from Day 27; focus on the test for this lesson.
module.exports = defineConfig({
  testDir: './tests',
  timeout: 120000,
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
