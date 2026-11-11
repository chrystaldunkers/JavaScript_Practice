const { test: base, expect } = require('@playwright/test');
const { existsSync, readFileSync } = require('node:fs');
const { parse } = require('dotenv');

const test = base.extend({
  trainingPolicy: async ({ page }, use) => {
    const local = existsSync('.env') ? parse(readFileSync('.env')) : {};
    const env = { ...local, ...process.env };
    const email = env.MERIDIAN_EMAIL;
    const password = env.MERIDIAN_PASSWORD;
    const policyNumber = env.MERIDIAN_POLICY_NUMBER;
    if (!email || !password || !policyNumber) {
      throw new Error('Configure the approved training account and its policy.');
    }

    await page.goto('/auth');
    await page.waitForLoadState('networkidle');
    await page.getByLabel('Email', { exact: true }).fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'My account' })).toBeVisible();
    const policyRow = page.getByRole('row').filter({
      has: page.getByRole('cell', { name: policyNumber, exact: true }),
    });
    await expect(policyRow).toHaveCount(1, { timeout: 12000 });
    await use(policyRow);
  },
});

module.exports = { test, expect };
