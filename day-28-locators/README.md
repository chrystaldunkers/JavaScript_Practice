# Day 28 · Locators and Selectors

Find the intended element, act on it, and check the result on the live
[Meridian practice app](https://insurance.roadtoqa.com/).

## Get ready

Use the Node.js and VS Code setup from Day 27. Create a new folder named
`day-28-locators` and open it in VS Code. Copy these files, keeping their names:

- [package.json](package.json)
- [playwright.config.js](playwright.config.js)
- [tests/locators.spec.js](tests/locators.spec.js) — put this inside a `tests` folder
- [tests/driver-name.spec.js](tests/driver-name.spec.js) — put this in the same `tests` folder

You can also download the repository as a ZIP and open **this day's folder** in
VS Code. Open **Terminal → New Terminal**, then run one line at a time:

```sh
npm install
npx playwright install chromium
npm test
```

Expected: **2 passed**, when the live app is available. Run these commands from
the folder containing this day's `package.json`. Use Playwright to run the tests;
do not run a `.spec.js` file with `node`.

### Installed Google Chrome option used in the lesson

The recording Mac uses installed Google Chrome. If you have Chrome installed,
remove the `//` before `channel: 'chrome',` in `playwright.config.js`, then save.
You still need `npm install`, but you can skip `npx playwright install chromium`
with this option. Check the [official system requirements](https://playwright.dev/docs/intro#system-requirements)
for your own computer; installed Chrome does not make other unsupported browser
builds work on an older operating system.

## Read the complete example

Open [tests/locators.spec.js](tests/locators.spec.js). It is one test using all five
methods from the lesson, plus a label example:

| Method | Real Meridian target | What we check or do |
| --- | --- | --- |
| `getByRole('link', ...)` | Get a quote navigation link | Click it, then check the destination URL |
| `getByText(...)` | Transparent rating engine badge | Check it is visible |
| `getByPlaceholder(...)` | Quote-number box, with hint `QT-XXXXXXXX` | Fill fictional data, then check its value |
| CSS `#driver_name` | Driver name input | Check one match, fill Alex Learner, then check its value |
| XPath `//input[@id="driver_name"]` | The same Driver name input | Fill Jordan Learner, then check the replacement value |
| Bonus `getByLabel('Driver name', ...)` | The input associated with the label | Check the same final value |

The quote hint contains **eight X characters**. The app's current email input has
no placeholder; do not invent one. These examples use the current public quote
form and do not require an account. They do not click **Find**, submit a quote,
or purchase a policy. Use fictional practice data.

`toBeEnabled()` checks that an element is not disabled. It does not prove that a
button's next step works. A unique match also needs to be the intended element.

## Inspect, then test a selector

1. Open Meridian in Chrome. Right-click inside **Driver name** and choose **Inspect**.
2. Read the actual input tag. Its `id` is `driver_name`.
3. Find the nearby label. Its `for="driver_name"` connects it to that input.
4. Click inside **Elements**, then press **Command+F** on Mac or **Control+F** on Windows.
5. Search `#driver_name`. Check the highlighted input and the match count.
6. Replace the search with `//input[@id="driver_name"]`. Confirm it selects the same input.

Elements search accepts CSS and XPath. Playwright calls such as `getByLabel(...)`
belong in your test, not in that search box.

## Recreate the real failure, then fix it

Use the separate [tests/driver-name.spec.js](tests/driver-name.spec.js), so the
complete five-method example stays easy to read.

1. Replace this one line:

```js
const driverName = page.getByLabel('Driver name', { exact: true });
```

with:

```js
const driverName = page.getByRole('textbox');
```

2. Save, then run only that test:

```sh
npx playwright test tests/driver-name.spec.js --project=chromium
```

3. Read the **strict mode violation** and the matching elements. On the recorded
   page, the broad textbox locator matched the quote number, Driver name, and
   Email. Counts can change if the live app changes. `fill()` needs one target.
4. Restore the precise `getByLabel` line, save, and rerun the same command.
   Expected: **1 passed**.
5. Run `npm test` again. Both examples should pass.

Do not use `.first()` to hide this ambiguity. Explain which field you intended
and refine the locator using that information. Keep `await` on browser actions
and web assertions; removing it can let the test move on before an action
finishes, but the resulting error is not guaranteed to be the same every time.

## Watch the browser and read a report

```sh
npm run test:headed
npm run test:ui
npm run report
```

Headed mode opens a visible browser so you can observe it. It does not fix a bad
locator. The instructor slowed browser actions for the recorded demonstration;
your run may finish much faster. Reports reflect the latest run. Press **Ctrl+C**
to stop a report or UI server.

## Your practice

- Change the fictional names and their expected values in the complete example.
  Update the final label assertion to match the final XPath fill.
- Explain the difference between a link and a button before choosing a role.
- Recreate and fix the broad textbox mistake in the separate test.
- Find Driver name using both CSS and XPath in Elements, and explain each selector.

Your win: run a passing test using all five methods, and explain why its locators
find the intended elements.

[Official locator guide](https://playwright.dev/docs/locators) ·
[Assertions](https://playwright.dev/docs/test-assertions) ·
[Chrome Elements guide](https://developer.chrome.com/docs/devtools/dom)

[Previous: Day 27](../day-27-introducing-playwright/) · [All lessons](../README.md)
