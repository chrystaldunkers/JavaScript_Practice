const { test, expect } = require('@playwright/test');

async function handleDialog(page, buttonName, respond) {
  const [observed] = await Promise.all([
    page.waitForEvent('dialog').then(async dialog => {
      const details = { type: dialog.type(), message: dialog.message() };
      await respond(dialog);
      return details;
    }),
    page.getByRole('button', { name: buttonName, exact: true }).click(),
  ]);
  return observed;
}

test('accepts a JavaScript alert', async ({ page }) => {
  await page.goto('/javascript_alerts');
  const alert = await handleDialog(page, 'Click for JS Alert', dialog => dialog.accept());

  expect(alert).toEqual({ type: 'alert', message: 'I am a JS Alert' });
  await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
});

test('dismisses a JavaScript confirm', async ({ page }) => {
  await page.goto('/javascript_alerts');
  const confirm = await handleDialog(page, 'Click for JS Confirm', dialog => dialog.dismiss());

  expect(confirm).toEqual({ type: 'confirm', message: 'I am a JS Confirm' });
  await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
});

test('types into a JavaScript prompt', async ({ page }) => {
  await page.goto('/javascript_alerts');
  const prompt = await handleDialog(page, 'Click for JS Prompt', dialog => dialog.accept('Day 37 Practice'));
  expect(prompt).toEqual({ type: 'prompt', message: 'I am a JS prompt' });
  await expect(page.locator('#result')).toHaveText('You entered: Day 37 Practice');
});

test('reads the TinyMCE content inside its iframe', async ({ page }) => {
  await page.goto('/iframe');
  const editor = page.frameLocator('#mce_0_ifr');
  await expect(editor.getByText('Your content goes here.', { exact: true })).toBeVisible();
});

test('checks the popup independently of the opener', async ({ page }) => {
  await page.goto('/windows');
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'Click Here', exact: true }).click(),
  ]);
  await expect(popup.getByRole('heading', { name: 'New Window', exact: true })).toBeVisible();
  await popup.close();
  await expect(page.getByRole('heading', { name: 'Opening a new window' })).toBeVisible();
});
