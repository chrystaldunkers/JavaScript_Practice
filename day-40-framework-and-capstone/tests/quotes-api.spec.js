const { test, expect } = require('@playwright/test');

test('public quote list has the expected structure', async ({ request }) => {
  let response;
  await test.step('Request a small public quote list', async () => {
    response = await request.get('/api/public/quotes', {
      params: { limit: 2, offset: 0 }
    });
  });
  await test.step('Check status and response shape', async () => {
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    const body = await response.json();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeLessThanOrEqual(2);
    expect(Number.isInteger(body.count)).toBe(true);
    expect(body.count).toBeGreaterThanOrEqual(body.data.length);
  });
});
