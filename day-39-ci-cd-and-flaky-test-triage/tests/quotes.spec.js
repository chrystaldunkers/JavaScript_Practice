const { test, expect } = require('@playwright/test');

test('quotes API returns a JSON list', async ({ request }) => {
  const response = await request.get('/api/public/quotes', {
    params: { limit: 2, offset: 0 },
  });
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');
  const body = await response.json();
  expect(Array.isArray(body.data)).toBe(true);
  expect(body.count).toBe(body.data.length);
  console.log({ status: response.status(), keys: Object.keys(body), count: body.count });
});
