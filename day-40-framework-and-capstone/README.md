# Day 40 — Framework architecture, Allure and Pillar 2 capstone

Builds on the four page objects and two independent Day 35 tests, the Day 38 public API check and the Day 39 GitHub Actions workflow.

## Setup and run
Use Node.js 22.18+ (the recording uses 22.23.2).

```sh
npm ci
npx playwright install chromium
cp .env.example .env
# Add your approved training credentials and existing owned policy privately.
npm test
npm run report:generate
npm run report:open
```

On the older recording Mac only, PLAYWRIGHT_CHROMIUM_CHANNEL=chrome selects installed Chrome. PLAYWRIGHT_DISABLE_VIDEO=1 disables only test failure-video capture when the current encoder cannot install; screenshots and traces remain enabled. The Ubuntu workflow uses Playwright Chromium. No extra Java installation is required for the selected Allure 3 npm package.

npm run test:policy, npm run test:quote and npm run test:api run each scenario independently. Every test command cleans generated results first. Copy any report you want to preserve before another test run.

## Follow one scenario
- tests/: scenario, input selection and business assertions
- fixtures/: new page objects around each test's isolated Playwright page
- pages/: locators and meaningful reusable user actions
- data/: safe fictional inputs
- config/environment.js: validate private environment values
- playwright.config.js: base URL, browser, timeouts, retry policy and reporters
- allure-results/: raw generated result files
- allure-report/: generated browser report

Each UI test signs in independently. Browser isolation does not reset server-side account data. We only read an owned policy and stop the quote at Coverage without saving.

## Reporting exercise
In a practice copy, change only the API status expectation from 200 to 201. It is a deliberate classroom error, not an application defect. Run npm test, then npm run report:generate even though the test command failed. Open the report, inspect the failed assertion and steps. The API case has no browser screenshot or trace. Browser failures have their own screenshot/video/trace. Restore 200, rerun and generate a fresh report.

For a browser-evidence example, temporarily change the QuotePage standardChoice locator from /^standard\b/i to /^premium teaching example$/i. Run npm run test:quote, inspect the failed Coverage assertion, screenshot and retained trace, then restore the original locator and rerun. Preserve the failed report before another run cleans it.

## GitHub Actions
The root workflow is .github/workflows/day40-meridian.yml. Configure MERIDIAN_EMAIL, MERIDIAN_PASSWORD and MERIDIAN_POLICY_NUMBER as repository Actions secrets for the approved fictional training account. Use the account's existing owned policy. These values must not be committed.

Open Actions → Day 40 Meridian capstone → Run workflow. The workflow installs locked dependencies and Chromium, runs the tests, generates Allure and uploads report/evidence even after a test failure. A report does not override a failing test exit code. Secrets are only supplied to trusted pushes or manual runs; this lesson does not run authenticated tests for untrusted pull requests.

Download/extract the artifact. From the installed project run npx allure open /path/to/extracted/allure-report. Opening index.html directly is not the supported viewing flow. Keep reports within the training audience: screenshots and traces may include training account data. This lesson does not publicly host them on GitHub Pages.

[Capstone assignment](CAPSTONE.md)

References: https://allurereport.org/docs/playwright/ and https://allurereport.org/docs/v3/install/ and https://playwright.dev/docs/test-fixtures
