const { defineConfig, devices } = require('@playwright/test');

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
      // The instructor uses installed Chrome on the recording Mac.
      // Uncomment this line to use your own installed Google Chrome:
      channel: 'chrome',
    },
  }],
});
