const { test, expect } = require('@playwright/test');

test('opens customer ratings', async ({ page }) => {
  await page.goto('https://insurance.roadtoqa.com/');
  await expect(page).toHaveTitle(/Meridian/);
  

  const reviews = page.getByRole('link', { name: 'Reviews', exact: true });
  await reviews.click();
  await expect(page).toHaveURL('https://insurance.roadtoqa.com/reviews');

  const ratingsHeading = page.getByRole('heading', { name: 'Customer ratings', exact: true });
  await expect(ratingsHeading).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL('https://insurance.roadtoqa.com/');
  await page.goForward();
  await page.waitForURL('**/reviews');
  await expect(ratingsHeading).toBeVisible();

  const ratingButtons = page.getByRole('button', { name: /^[1-5] stars$/ });
  await expect(ratingButtons).toHaveCount(5);
  await expect(ratingButtons.first()).toBeInViewport();

  const submitRating = page.getByRole('button', { name: 'Submit rating', exact: true });
  await expect(submitRating).toBeEnabled();
  // We check the control without submitting a rating.
});
