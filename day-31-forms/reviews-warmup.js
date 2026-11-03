const { test, expect } = require('@playwright/test');
 test('fills review draft', async ({page}) => {
await page.goto('https://insurance.roadtoqa.com/reviews');

const reviewName = page.getByLabel('Your name');
const comment = page.getByLabel('Comment');

await reviewName.fill('Avery Test');
await comment.fill('The quote form was easy to use.');
await expect(reviewName).toHaveValue('Avery Test');
await expect(comment).toHaveValue('The quote form was easy to use.');
});
