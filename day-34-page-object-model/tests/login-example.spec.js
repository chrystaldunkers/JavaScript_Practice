const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('one LoginPage reaches the teaching account', async ({ page }) => {
  const credentials = {
    email: process.env.MERIDIAN_EMAIL,
    password: process.env.MERIDIAN_PASSWORD
  };
  if (!credentials.email || !credentials.password) {
    throw new Error('Add your approved course credentials to private .env');
  }
  const login = new LoginPage(page);

  await login.open();
  await login.signIn(credentials);
  await expect(page).toHaveURL('https://insurance.roadtoqa.com/account');
  await expect(page.getByRole('heading', {
    name: 'My account', exact: true
  })).toBeVisible();
  await expect(page.getByText(/Signed in as/))
    .toContainText(credentials.email);
});
