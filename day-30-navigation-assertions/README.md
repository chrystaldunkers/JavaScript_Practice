# Day 30 · Navigation and Assertions

One beginner test for the [Meridian practice app](https://insurance.roadtoqa.com/):
**Home → Reviews → Back → Forward → check the rating controls.**
No login is needed. This test does not submit a rating or change review records.

## Get ready

Use Node.js **22 or newer** and VS Code, as in Day 27.
Create your own `day-30-navigation-assertions` practice folder. Keep these files together:

```text
day-30-navigation-assertions/
  package.json
  playwright.config.js
  .gitignore
  tests/
    navigation-assertions.spec.js
```

Open that folder in VS Code. Choose **Terminal → New Terminal**, then run:

```sh
npm install
npx playwright install chromium
```

If you use installed Google Chrome, uncomment `channel: 'chrome'` in the configuration.
You can then use Chrome without downloading Chromium.

## Run the passing test

From the folder containing `package.json`:

```sh
npm test
```

Expected result: **1 passed**.

To watch the browser:

```sh
npm run test:headed
```

The lesson recording slows the browser actions for teaching. Your normal run can be faster.

To open the HTML report after a run:

```sh
npm run report
```

Press **Control+C** in that terminal when you are finished with the report server.
You can also leave it running and open a second terminal to run another test, as in the lesson.

## Read the test as a journey

Open [tests/navigation-assertions.spec.js](tests/navigation-assertions.spec.js).

| Code | What it checks or does |
| --- | --- |
| `page.goto(...)` | Open Home |
| `toHaveTitle(/Meridian/)` | Check that the browser title contains `Meridian` |
| Reviews link + `click()` | Visit the actual Reviews page |
| `toHaveURL(...)` | Check the full destination address |
| `toBeVisible()` | Check that **Customer ratings** is displayed |
| `goBack()` / `goForward()` | Move through this tab's history |
| `waitForURL('**/reviews')` | Wait for an address ending in `/reviews` |
| `toHaveCount(5)` | Check the five matching rating buttons |
| `first()` + `toBeInViewport()` | Check the first rating button intersects the viewport |
| `toBeEnabled()` | Check **Submit rating** is not disabled |

The title pattern is broad: Home and Reviews both mention Meridian. The Reviews URL and
heading give more specific evidence about the destination.

The five buttons have accessible names `1 stars` through `5 stars`. The locator pattern
`/^[1-5] stars$/` matches those complete names. It does not count decorative stars or
changing customer-review records. The brackets match a digit from 1 through 5; `^` and `$`
anchor the beginning and end.

`first()` is intentional here because the locator describes a group. Use a clear locator
instead of adding `first()` merely to hide an unexpected duplicate.

**Visible**, **in the viewport**, and **enabled** describe different conditions. An element can
be displayed below the visible browser area. An enabled button does not prove that a form
submission would succeed. This example never clicks **Submit rating**.

Playwright's web assertions retry until their condition is met or their timeout expires.
Use `await`. A waiting assertion is often enough after navigation; this lesson also includes
`waitForURL` to teach navigation coordination. Do not add fixed sleeps or duplicate waits everywhere.

## Practice: create, understand, and fix one failure

1. Run the unchanged test and confirm **1 passed**.
2. Change only `toHaveCount(5)` to `toHaveCount(6)`. Save the file.
3. Run:

   ```sh
   npm run test:trace
   ```

4. Expect **1 failed**. Read the actual error: the rating-button locator, **Expected: 6**,
   **Received: 5**, and the line containing `toHaveCount(6)`.
5. Run `npm run report`. Open the failed test, then **View Trace**.
6. Select the failed `toHaveCount` action. Read its details and look at the recorded page snapshot.
   Select nearby navigation actions to see how the test reached Reviews.
7. Return to VS Code, restore `toHaveCount(5)`, save, and run `npm test` again.
8. Confirm **1 passed**.

A trace records a past run. Its snapshots help explain the failure; they are not a live session.
Keep the intentional error in your practice copy only. The shared example stays in its passing form.

## If something fails unexpectedly

- **Browser missing:** install Chromium or enable the Chrome option above.
- **Command not found / package missing:** check the terminal is in this day's folder and run `npm install`.
- **Wrong URL or missing heading:** open the app manually, check the real labels and destination, then read the report.
- **Count differs:** confirm you are targeting the five rating buttons, and check whether you left the practice value at 6.

[Official assertion guide](https://playwright.dev/docs/test-assertions) ·
[Official trace guide](https://playwright.dev/docs/trace-viewer) ·
[Back to the lesson list](../README.md)
