# Day 33 · Screenshots and Videos in Playwright

Continue the Day 32 Meridian journey: **readiness → fill Driver → Continue → verify VIN on Vehicle**. This lesson adds useful evidence to that small test.

No login is needed. The supplied name and email are fictional practice values. The test stops at Vehicle and does not save a quote or purchase a policy.

## Set up

Use Node.js **22 or newer** and VS Code. Create a separate `day-33-screenshots-videos` folder with these files:

```text
day-33-screenshots-videos/
  package.json
  package-lock.json
  playwright.config.js
  .gitignore
  tests/
    evidence.spec.js
```

Open that folder in VS Code, choose **Terminal → New Terminal**, and run:

```sh
npm install
npx playwright install chromium
npm run test:headed
```

Expected: **1 passed**. Your normal run may be faster than the teaching demonstration. `npm test` runs without a visible browser. To use installed Chrome as in the recording, uncomment `channel: 'chrome'` in the configuration. Playwright also needs its FFmpeg runtime for video; the browser installation command installs it.

## Find the manual screenshot

The callback receives `testInfo` as its second argument. After the VIN visibility assertion succeeds:

1. `testInfo.outputPath('vehicle.png')` gives this test a safe output path.
2. `page.screenshot({ path: imagePath, fullPage: true })` saves the current page.
3. `testInfo.attach('Vehicle reached', ...)` attaches that same file to the report.

Open `vehicle.png` inside this test's generated folder under `test-results`. Full page captures the scrollable page, including content below the fold; it does not visit other steps for you. A screenshot is evidence, not a replacement for the assertion.

```sh
npm run report
```

Open the printed local address, select the passing test, and open **Vehicle reached**. The port on your computer may differ from the lesson. Press **Control+C** in the terminal to stop the report server before running another test there.

## Create one deliberate failure

Add `//` at the beginning of the Continue click, leaving the VIN assertion and screenshot block unchanged:

```js
// await page.getByRole('button', { name: 'Continue', exact: true }).click();
await expect(vin).toBeVisible();
```

Save, then run:

```sh
npm test
npm run report
```

Expected: **1 failed**. This failure is intentional: the page stays on Driver while the assertion expects VIN on Vehicle.

In the failed report:

- **Screenshot:** Driver remains selected, with the practice name and email entered.
- **Video:** Play the browser recording and follow the unfinished journey. This records the page, not the desktop or narration.
- **View Trace:** Select the failed visibility assertion. Read its locator and snapshot, then follow the action list. The fill actions are present; Continue is missing.
- **Vehicle reached:** This manual attachment is absent because the test stopped at the failed assertion before reaching its capture block.

The configuration keeps a full-page screenshot only on failure, and video and trace with `retain-on-failure`. Retries is zero, so this evidence belongs to the initial attempt. `on-first-retry` would not collect anything without a retry. Let the test finish; video is finalized when the browser context closes.

## Repair and compare

Stop the report server with **Control+C**. Remove the `//` from the Continue click, save, and run:

```sh
npm run test:headed
npm run report
```

Expected: **1 passed**. Vehicle reached returns. Automatic failure-only screenshots, videos and traces are not retained after this passing run. That is the configured policy, not a recording fault. Use video mode `on` deliberately if you need to keep a passing run as well.

Every run cleans `test-results` and replaces the current report. If evidence matters, copy the **complete** report and test-results folders into a separately named local archive before rerunning. Treat recordings and traces as potentially containing whatever data your test used; keep them out of the source repository. This starter's `.gitignore` excludes generated outputs.

## Your explanation

Describe the expected state, actual state, and missing action. Finish with a passing test; do not remove the assertion or add a hard wait to hide the missing click.

**A screenshot shows a moment. A video shows a sequence. A trace lets us inspect the test.**

## Official references

- [Screenshots](https://playwright.dev/docs/screenshots)
- [Videos](https://playwright.dev/docs/videos)
- [TestInfo.outputPath](https://playwright.dev/docs/api/class-testinfo#test-info-output-path)
- [TestInfo.attach](https://playwright.dev/docs/api/class-testinfo#test-info-attach)
- [Trace Viewer](https://playwright.dev/docs/trace-viewer)

Next: **Day 34 · Page Object Model (POM)**.
