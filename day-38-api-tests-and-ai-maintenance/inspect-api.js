const { request } = require('@playwright/test');
const fs = require('node:fs');

async function inspect() {
  const client = await request.newContext({
    baseURL: 'https://insurance.roadtoqa.com',
  });
  try {
    const response = await client.get('/api/public/quotes', {
      params: { limit: 2, offset: 0 },
    });
    const body = await response.json();
    const summary = {
      method: 'GET', path: '/api/public/quotes?limit=2&offset=0',
      status: response.status(), contentType: response.headers()['content-type'],
      keys: Object.keys(body), dataIsArray: Array.isArray(body.data),
      count: body.count, limit: body.limit, offset: body.offset,
    };
    fs.writeFileSync('evidence/response-summary.json', JSON.stringify(summary, null, 2));
    console.log(summary);
    if (summary.status !== 200 || !summary.dataIsArray) {
      throw new Error('Verify the API response before continuing.');
    }
  } finally {
    await client.dispose();
  }
}

inspect().catch(error => { console.error(error.message); process.exitCode = 1; });
