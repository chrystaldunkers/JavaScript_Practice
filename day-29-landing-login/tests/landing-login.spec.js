const { test, expect } = require('@playwright/test');

test('landing page shows heading and Sign in link', async ({ page }) => {
  await page.goto('https://insurance.roadtoqa.com/');

  const signIn = page.getByRole('link', { name: 'Sign in', exact: true });
  const landingHeading = page.getByRole('heading', {
    name: 'Auto insurance, priced in the open', exact: true,
  });
  await expect(landingHeading).toBeVisible();
  await expect(signIn).toBeVisible();
  await expect(signIn).toHaveAttribute('href', '/auth');
});

test('student signs in and reaches My account', async ({ page }) => {
  const email = process.env.MERIDIAN_EMAIL;
  const password = process.env.MERIDIAN_PASSWORD;
  if (!email || !password) {
    throw new Error('Add your course login to the private .env file.');
  }

  await page.goto('https://insurance.roadtoqa.com/');
  await page.getByRole('link', { name: 'Sign in', exact: true }).click();
  await page.waitForURL('https://insurance.roadtoqa.com/auth');
  // This practice app needs its initial input handlers to finish loading.
  await page.waitForLoadState('networkidle');

  const emailField = page.getByLabel('Email', { exact: true });
  const passwordField = page.getByLabel('Password', { exact: true });
  await emailField.fill(email);
  await passwordField.fill(password);

  const signInButton = page.getByRole('button', { name: 'Sign in', exact: true });
  await signInButton.click();

  await expect(page).toHaveURL('https://insurance.roadtoqa.com/account');
  const accountHeading = page.getByRole('heading', { name: 'My account', exact: true });
  await expect(accountHeading).toBeVisible();
  const signedInIdentity = page.getByText(/Signed in as/);
  await expect(signedInIdentity).toContainText(email);
});
