# Give each part one job

pages/       locators + reusable user operations
tests/       scenario order + input choices + business assertions
fixtures/    construct helpers around Playwright's per-test page
data/        safe practice values, e.g. Driver name
config       base URL + browser + evidence policy
private .env credentials + account-owned policy number (never commit)

# Day 35 - proposed layout, not built in Day 34

day-35-pom-framework/
  pages/       LoginPage.js, AccountPage.js,
               PolicyPage.js, QuotePage.js
  tests/       account-policy.spec.js, quote-coverage.spec.js
  fixtures/    meridian.fixture.js
  data/        quote-data.js
  playwright.config.js
  .env.example / .gitignore

Custom fixtures supply helper instances; they do not create four tabs.
Keep both tests independent. Sign in explicitly in this first framework.
POM does not remove await, readiness, assertions, screenshots or traces.
