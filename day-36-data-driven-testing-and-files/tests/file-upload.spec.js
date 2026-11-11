const { basename, join } = require('node:path');
const { test, expect } = require('@playwright/test');

test('uploads a synthetic training file', async ({ page }) => {
  const sample = join(__dirname, '../fixtures/second-training-file.txt');
  await page.goto('https://the-internet.herokuapp.com/upload');
  await expect(page.getByRole('heading', { name: 'File Uploader' })).toBeVisible();

  const picker = page.locator('#file-upload');
  const submit = page.getByRole('button', { name: 'Upload', exact: true });
  await picker.setInputFiles(sample);

  await submit.click();
  await expect(page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible();
  await expect(page.locator('#uploaded-files')).toHaveText(basename(sample));
});
