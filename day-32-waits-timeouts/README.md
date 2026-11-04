# Day 32 · Waits and Timeouts

Continue from Day 31 with a small [Meridian](https://insurance.roadtoqa.com/) journey:
**wait for rating data → fill Driver → click Continue → check Vehicle.**

No login is needed. Use the fictional practice values in the example. This test stops at Vehicle; it does not save a quote or purchase a policy.

## Set up

Use Node.js **22 or newer** and VS Code. Keep your Day 31 folder and create a separate `day-32-waits-timeouts` folder:

```text
day-32-waits-timeouts/
  package.json
  package-lock.json
  playwright.config.js
  .gitignore
  waiting-reference.js
  tests/
    waits.spec.js
```

Open that folder in VS Code. Choose **Terminal → New Terminal** and run:

```sh
npm install
npx playwright install chromium
```

To use installed Google Chrome, uncomment `channel: 'chrome'` in the configuration. You can then skip the Chromium download. The lesson demonstration uses Chrome.

## Run the passing example

From the folder containing `package.json`:

```sh
npm run test:headed
```

Expected result: **1 passed**. `npm test` runs without a visible browser. Your normal run may be faster than the teaching demonstration.

## Read the waits

Open [tests/waits.spec.js](tests/waits.spec.js).

- The first assertion waits for a positive number inside **Rating factors live** before filling the form. `locator('..')` finds the label's parent tile; the regular expression matches a positive whole number, not a fixed count.
- `fill()` and `click()` perform their relevant actionability checks automatically.
- `await expect(vin).toBeVisible()` retries until VIN appears or the assertion limit is reached.
- Driver and Vehicle share the same page address. The VIN field confirms that Vehicle opened.
- `isVisible()` is an immediate observation; it is not a replacement for this retrying assertion.

The starter sets the whole-test timeout to **60 seconds**. Playwright's default is **30 seconds**. Assertions still use their default **5-second** limit because this config does not override it. A timeout is an allowance, not a required pause; a check can finish sooner, and the overall test can end first.

[waiting-reference.js](waiting-reference.js) contains commented teaching examples only. It is outside the test folder and is not a second test.

## Diagnose the deliberate missing click

1. Add `//` at the start of the line that clicks the **Continue** button.
2. Leave the VIN visibility assertion in place. Save the file.
3. Run:

```sh
npm run test:trace
npm run report
```

The test should fail because it remains on Driver while expecting a field from Vehicle. Read the locator, failed line, and timeout in the error. Open the local report address printed in your terminal; its port may differ from the recording. Select the failed test, open **View Trace**, and select the failed visibility assertion. The snapshot should show Driver; the actions contain the fills but no Continue click.

Press **Control+C** in the terminal to stop the report server. Remove the `//` from the Continue line, save, and run:

```sh
npm run test:headed
```

Expected result: **1 passed**. Keep this passing version when you finish.

## Practise explaining the cause

What was the test waiting for? What did the page show? Which action was missing?

A longer pause cannot supply a missing click. For a genuinely slow, correct condition, a local assertion timeout may be justified by evidence. It is not the repair for this exercise. Avoid adding `waitForTimeout()` to make a failing test pass.

## Official references

- [Auto-waiting](https://playwright.dev/docs/actionability)
- [Assertions](https://playwright.dev/docs/test-assertions)
- [Timeouts](https://playwright.dev/docs/test-timeouts)
- [Trace Viewer](https://playwright.dev/docs/trace-viewer)

Next: **Day 33 · Screenshots and Videos in Playwright**.
