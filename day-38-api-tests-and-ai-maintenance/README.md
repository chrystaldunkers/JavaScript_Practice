# Day 38 — Structuring API Tests and AI Test Maintenance

Use Node.js with this project. From this folder, run:

```sh
npm ci
node inspect-api.js
npx playwright test
```

The lesson uses one real public Meridian GET request. It needs no login or browser installation.

1. Open Meridian and connect the familiar quote form to the API.
2. Read the published API reference and collection.
3. Inspect the live response summary.
4. Run the quote-list test and explain each assertion.
5. In a teaching copy, change only `Array.isArray(body.data)` to `Array.isArray(body.quotes)`.
6. Run the test and inspect its failure alongside the response summary.
7. Ask Copilot to propose the smallest repair, verify it, then restore `body.data`.
8. Rerun the same test with the remaining assertions intact.

The wrong `quotes` property is a deliberate classroom error. It does not represent a known historical Meridian API change. The collection establishes the GET route and parameters. The response summary records observed live behavior. Confirm intended behavior with the API owner when documentation and implementation differ.

Copilot is optional. Students can inspect and repair this one-line error manually. Use the free allowance where available. A paid subscription is optional.

Practice: set the limit to 3, update the matching expectation, and rerun. Explain why HTTP 200 alone does not prove the response contains the expected list.

API reference: https://insurance.roadtoqa.com/api-docs
Published collection: https://insurance.roadtoqa.com/meridian-auto-insurance.postman_collection.json
Playwright API testing: https://playwright.dev/docs/api-testing
