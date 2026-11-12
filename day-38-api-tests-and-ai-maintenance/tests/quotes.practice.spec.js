const { test, expect } = require('@playwright/test');

test('quotes endpoint returns a JSON list', async ({ request }) => {
  // Send a request to the real Meridian API.
  const response = await request.get('/api/public/quotes', {
    params: { limit: 2, offset: 0 },
  });

  // Check the status and response format before reading JSON.
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');
  const body = await response.json();

  // Log the structure, keeping individual quote records out of the log.
  console.log('GET /api/public/quotes ->', response.status());
  console.log({ keys: Object.keys(body), count: body.count });

  // Check the response body as well as the HTTP status.
  expect(Array.isArray(body.data)).toBe(true);
  expect(body.count).toBe(body.data.length);
  expect(body.limit).toBe(2);
  expect(body.offset).toBe(0);
});
