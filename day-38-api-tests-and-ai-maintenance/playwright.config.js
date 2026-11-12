const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  workers: 1,
  retries: 0,
  use: {
    baseURL: 'https://insurance.roadtoqa.com',
    extraHTTPHeaders: { Accept: 'application/json' },
  },
});
