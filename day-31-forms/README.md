# Day 31 · Working with Forms

Continue from Day 30 with one complete form test in [Meridian](https://insurance.roadtoqa.com/):
**Driver → Vehicle → Coverage → save a demo quote.** No login is needed.

Each successful run saves a demo quote. Stop at the confirmation; this lesson does not purchase a policy or submit a public review. Use fictional practice values.

## Set up

Use Node.js **22 or newer** and VS Code, as in Day 27. Keep Day 30's folder. Create a separate `day-31-forms` folder with these files:

```text
day-31-forms/
  package.json
  package-lock.json
  playwright.config.js
  .gitignore
  reviews-warmup.js
  tests/
    forms.spec.js
```

Open the folder in VS Code. Choose **Terminal → New Terminal** and run:

```sh
npm install
npx playwright install chromium
```

To use installed Google Chrome instead, uncomment `channel: 'chrome'` in the configuration. You can then skip the Chromium download.

## Run

From the folder containing `package.json`:

```sh
npm run test:headed
```

Expected result: **1 passed**. `npm test` runs without a visible browser. The recorded lesson slows the demonstration; your normal test may finish faster.

## Read the test

Open [tests/forms.spec.js](tests/forms.spec.js). Follow **locate → act → check**:

| Form control | Action | Check |
| --- | --- | --- |
| Driver name and Email | `fill()` | `toHaveValue()` |
| License state, a custom combobox | Open it, then click the California option | `toContainText('California')` |
| Vehicle step | Click Continue; keep the provided defaults | VIN textbox `toBeVisible()` |
| Safe driver checkbox | `check()` | `toBeChecked()` |
| Save my quote | `click()` | Saved confirmation `toBeVisible()` |

The opening readiness check finds the **Rating factors live** tile and waits for a positive count. Meridian initially displays zero while loading its rating data. The test waits for that visible condition before entering values; it does not use a fixed sleep. `locator('..')` finds the label's parent tile; `/^[1-9]\d*$/` matches a positive whole number.

License state is a button with `role="combobox"`, so use clicks. `selectOption()` is for a native HTML `<select>`. `/^CA/` matches an option name starting with CA. The saved-quote pattern allows the generated quote number to change.

[reviews-warmup.js](reviews-warmup.js) is an optional reference outside the test folder. It demonstrates filling a text input and a textarea without submitting a review. The default run executes only the main quote test. To run the warm-up too, copy it into `tests/reviews-warmup.spec.js`, then run `npm test`; you should see **2 passed**. Remove that optional copy to return to the one-test lesson setup.

## Debug the missing email action

1. Comment out only `await email.fill('avery@example.com');` by adding `//` at its start.
2. Keep the `toHaveValue('avery@example.com')` assertion.
3. Save and run:

```sh
npm run test:trace
npm run report
```

This run should fail at the email assertion **before saving a quote**. Use the report address printed in your own terminal; its port may differ from the recording. Open the failed test in the report and click its trace. Inspect the name fill and the failed email assertion: the email value is empty, and there is no email fill action.

Press **Control+C** in the terminal to stop the report server. Remove the `//` from the email fill line, save, then run `npm test` again. Expected result: **1 passed**.

## Practise

- Change the driver name and its expected value together.
- Try `await safeDriver.uncheck()` with `await expect(safeDriver).not.toBeChecked()`.
- Keep a clear assertion after each action. Restore the example when finished.

## Official references

- [Text input and form actions](https://playwright.dev/docs/input)
- [Locators](https://playwright.dev/docs/locators)
- [Assertions](https://playwright.dev/docs/test-assertions)
- [Trace Viewer](https://playwright.dev/docs/trace-viewer)

Next: **Day 32 · Waits and Timeouts**.
