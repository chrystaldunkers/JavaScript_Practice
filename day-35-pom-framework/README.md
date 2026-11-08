# Day 35 - Page Object Model Framework

Four page objects, two independent tests, a small fixture module and safe data.
Use Node.js 22+ and installed Google Chrome.

## Set up
1. Run npm ci in this folder.
2. Run npx playwright install ffmpeg once for failure-video support.
3. Copy .env.example to .env.
4. Add your approved Meridian email and password privately.
5. Sign in to Meridian, open My account, and copy an existing policy number
   owned by that same account into MERIDIAN_POLICY_NUMBER.

Do not create or purchase a policy just to satisfy this prerequisite.
Ask your instructor for an approved owned record if one is unavailable.
The quote-only test needs credentials but not a policy number.

## Run
- npm run test:policy - policy story by itself
- npm run test:quote - quote story by itself
- npm test - both, one worker, no retries
- npm run test:headed - watch the browser
- npm run report - open the current HTML report

Expected: one pass / one pass / two passes. Stop at Coverage without saving.

## Responsibilities
- pages/: locators and meaningful user operations
- tests/: sequence, inputs and business assertions
- fixtures/: per-test models around Playwright's page
- data/: safe Driver practice value
- config/environment.js: read/validate private values when requested
- playwright.config.js: base URL, limits and failure evidence

Each test signs in explicitly with its own fresh browser context.
They share an existing account, so browser isolation does not reset server data.
These examples do not save quotes, edit policies or make payments.
LoginPage retains the previously verified Meridian networkidle workaround.
It is app-specific, not a general readiness recommendation.

## Failure and repair exercise
First finish with both tests passing. In LoginPage only, temporarily change
the exact Email locator to Email address. Run npm run test:quote and inspect
that failure's screenshot, video and trace in the HTML report.
Preserve the complete report if needed before another run replaces it.
Restore Email, rerun the quote test, then npm test. Finish with two passes.
Do not remove assertions, add sleeps or change credentials to hide the cause.

Change the safe Driver name in data/quote-data.js and explain why the page
class does not change. Run the quote story again without saving.

Keep .env, reports, traces, videos and test-results private and out of Git.
No auth-state reuse, global mutable pages, BasePage, factories or CI is needed.

References:
https://playwright.dev/docs/pom
https://playwright.dev/docs/test-fixtures
https://playwright.dev/docs/test-use-options
