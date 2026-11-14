# Day 39 — CI/CD and Flaky Test Triage

The smoke suite reuses the Meridian Driver-to-Vehicle flow and quote-list API request. It uses fictional driver details and public reads.

## Run the smoke tests

```sh
npm ci
npx playwright install chromium
npx playwright test
```

On this recording Mac, `PLAYWRIGHT_CHROMIUM_CHANNEL=chrome` selects installed Chrome. The Ubuntu workflow uses Playwright Chromium.

## Follow the GitHub Actions run

The workflow lives in the repository root at `.github/workflows/day39-meridian.yml`.

Open Actions, choose **Day 39 Meridian checks**, click **Run workflow** and choose **smoke**. Read the checkout, Node setup, dependency installation, browser installation, test and evidence-upload steps. The same smoke workflow runs for matching pushes and pull requests to main.

Download the report artifact from the run, extract it, then open its HTML report:

```sh
npx playwright show-report path/to/playwright-report
```

Open a retained trace using the actual path in the report:

```sh
npx playwright show-trace path/to/trace.zip
```

## Controlled timing exercise

Choose **timing** in the manual workflow, or run locally:

```sh
LESSON_EXERCISE=timing npx playwright test
```

The fixture delays Meridian's real rating-data response by 3 seconds on the initial attempt and uses normal delivery on a retry. Both delays are printed in the log. This is an intentionally staged classroom comparison of connection speeds. The application response body is preserved.

The committed timing test uses the repaired visibility assertion. To reproduce the initial failure, copy the contents of `teaching/ratings-before.txt` into `timing/ratings.spec.js` in your practice copy.

The initial teaching version pauses for 1 second and checks visibility immediately. Its first attempt fails and the normal-speed retry passes. Playwright labels that result flaky. `failOnFlakyTests: true` makes the job require attention despite that retry passing.

Repair the timing test by replacing the fixed pause and immediate check with:

```js
await expect(ratingCount).toBeVisible();
```

Rerun the same exercise, then repeat it locally:

```sh
LESSON_EXERCISE=timing npx playwright test --repeat-each=3
```

## Triage and review

Read the failed step, expected and actual result, trace and relevant response. Consider a test mistake, timing or isolation issue, an application defect or an environment/setup problem. Keep uncertain diagnoses labelled as uncertain. For an optional Copilot review, use [the sanitized lesson prompt](teaching/triage-prompt.txt) and propose one small repair. Review the diff and rerun the same assertion locally and in Actions.

CI runs automated checks on code changes. Passing checks can feed delivery or deployment workflows. This lesson demonstrates the testing stage using this student repository.

References: https://playwright.dev/docs/ci-intro and https://playwright.dev/docs/test-retries
