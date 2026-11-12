const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/heroku',
  workers: 1,
  retries: 0,
  use: {
    baseURL: 'https://the-internet.herokuapp.com',
    browserName: 'chromium',
    trace: 'retain-on-failure',
  },
});
