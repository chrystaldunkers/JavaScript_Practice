const { readFile } = require('node:fs/promises');
const { test, expect } = require('../fixtures/training-account');

test('downloads the policy ID card as a PDF', async ({ page, trainingPolicy }, testInfo) => {
  await trainingPolicy.getByRole('button', { name: 'Documents', exact: true }).click();
  const documents = page.getByRole('dialog', { name: /^Policy documents/ });
  await documents.getByRole('tab', { name: 'ID card', exact: true }).click();
  const save = documents.getByRole('button', { name: 'Save as PDF', exact: true });

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    save.click(),
  ]);

  expect(await download.failure()).toBeNull();
  expect(download.suggestedFilename()).toMatch(/\.pdf$/i);

  const output = testInfo.outputPath('policy-id-card.pdf');
  await download.saveAs(output);
  const pdf = await readFile(output);
  expect(pdf.subarray(0, 5).toString('ascii')).toBe('%PDF-');
});
