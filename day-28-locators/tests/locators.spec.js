const { test, expect } = require('@playwright/test');

test('uses five locator methods on Meridian', async ({ page }) => {
  await page.goto('https://insurance.roadtoqa.com/reviews');

  // 1. Role: this navigation item is a link, not a button.
  // Finds the link named "Get a quote" using its role and exact name.
  const getAQuote = page.getByRole('link', { name: 'Get a quote', exact: true });
  await expect(getAQuote).toHaveCount(1);
  await getAQuote.click();
  await expect(page).toHaveURL('https://insurance.roadtoqa.com/');

  // 2. Text: check words that a visitor can see.
  // Finds the element containing the exact text "Transparent rating engine".
  const ratingBadge = page.getByText('Transparent rating engine', { exact: true });
  await expect(ratingBadge).toBeVisible();

  // 3. Placeholder: use the exact hint in the quote-number field.
  // Finds the input field using its exact placeholder text "QT-XXXXXXXX".
  const quoteNumber = page.getByPlaceholder('QT-XXXXXXXX', { exact: true });
  await quoteNumber.fill('QT-DEMO1234');
  await expect(quoteNumber).toHaveValue('QT-DEMO1234');

  // 4. CSS: # means an ID. Inspect the page before choosing it.
  // Uses a CSS selector to find the Driver name field by its ID.
  const driverByCss = page.locator('#driver_name');
  await expect(driverByCss).toHaveCount(1);
  await driverByCss.fill('Chrys Test');
  await expect(driverByCss).toHaveValue('Chrys Test');

  // 5. XPath: find an input by its id attribute.
  // Uses XPath to find the input element with the ID "driver_name".
  const driverByXPath = page.locator('//input[@id="driver_name"]');
  await expect(driverByXPath).toHaveCount(1);
  await driverByXPath.fill('Chrys QA');
  await expect(driverByXPath).toHaveValue('Chrys QA');

  // Bonus: the label is associated with the same input.
  const driverByLabel = page.getByLabel('Driver name', { exact: true });
  await expect(driverByLabel).toHaveValue('Chrys QA');

  const continueButton = page.getByRole('button', { name: 'Continue', exact: true });
  await expect(continueButton).toBeVisible();
  await expect(continueButton).toBeEnabled();
  // Enabled means not disabled. It does not prove the next step works.
  // We do not click Find, submit a quote, sign in, or buy a policy.
});
