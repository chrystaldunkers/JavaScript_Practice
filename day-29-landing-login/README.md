# Day 29 · Landing Page and Login Tests with Meridian

Two beginner examples for the [Meridian practice app](https://insurance.roadtoqa.com/):

1. Check the landing heading and the **Sign in** link.
2. Sign in with your approved student account and check **My account**.

The customer page is **My account**, at `/account`. Its navigation link says
**My policy & payments**. These examples use those actual labels.

## Get ready

Use Node.js **22 or newer** and VS Code, as in Day 27.
Create your own `day-29-landing-login` practice folder and copy these files:

```text
day-29-landing-login/
  package.json
  playwright.config.js
  .env.example
  .gitignore
  tests/
    landing-login.spec.js
```

Open the practice folder in VS Code. Open **Terminal → New Terminal** and run:

```sh
npm install
npx playwright install chromium
```

If your computer uses installed Google Chrome, uncomment `channel: 'chrome'`
in `playwright.config.js`. You can then use Chrome without the Chromium download.

## Add your course login privately

In VS Code, copy `.env.example` into a new file called `.env` in this day's folder.
Keep the student email provided by your instructor and replace the password placeholder
with your approved course password. Keep the double quotes around both values,
including passwords that contain `#`. Save the file. If you have a different approved
student email, replace that too.

The supplied `.gitignore` excludes `.env`. Keep the real password in that local file;
do not put it in the test, a screenshot, or a public GitHub upload. Ask the instructor
for the course login if you do not have it. The example password is a placeholder.

The prepared configuration reads `.env`; the lesson test uses `process.env` to access it.
You do not need to write your own configuration for this exercise.

## Run the examples

From the folder containing this day's `package.json`, run:

```sh
npm test
```

To watch a real browser:

```sh
npm run test:headed
```

Expected result when both checks succeed: **2 passed**. Each test starts with a
fresh browser context; neither relies on a previous saved login.

To open the report:

```sh
npm run report
```

## Read the test in order

Open [tests/landing-login.spec.js](tests/landing-login.spec.js).

Connect each locator to the DOM clue we inspected in the lesson:

| Element | Clue on the real page | Locator choice |
| --- | --- | --- |
| Landing heading | An `h1` with the full heading text | `getByRole('heading', ...)` |
| Landing **Sign in** | An `a` tag with `href="/auth"` and the name **Sign in** | `getByRole('link', ...)` |
| **Email** input | The label's `for="email"` matches the input's `id="email"` | `getByLabel('Email', ...)` |
| **Password** input | The label's `for="password"` matches `id="password"` | `getByLabel('Password', ...)` |
| Form **Sign in** | A `button` with `type="submit"` and the name **Sign in** | `getByRole('button', ...)` |

Names such as `emailField` describe targets. `fill()` and `click()` perform actions;
`expect(...)` checks the result. Read the two tests as these steps:


- `page.goto(...)` opens the landing page.
- `getByRole('heading', ...)` finds the actual landing heading.
- `toHaveAttribute('href', '/auth')` checks the sign-in link's destination.
- `getByRole('link', ...)` opens the sign-in form.
- `getByLabel(...)` finds the **Email** and **Password** fields.
- The **Sign in** button submits the form.
- `toHaveURL(...)`, the **My account** heading, and the signed-in email check
  verify the successful result.

The final login checks answer three questions: did we reach `/account`, is the
**My account** heading visible, and does the signed-in identity contain our email?
A completed click alone does not answer those questions.

Playwright's web assertions wait for their expected conditions. No fixed sleep is needed.
This practice app briefly shows the form before attaching its input handlers, so the
login example also waits for the `/auth` navigation and the initial network activity
to finish before filling it. This is an accommodation for this app, not a general rule
to add `networkidle` to every test; application readiness signals are preferable.
The test stops after verifying the account page; it does not buy, edit, or pay for a policy.
It does not depend on changing quote counts, policy records, or account balances.

## If something fails

- **Add your course login…**: check that you saved `.env` beside `package.json`,
  used the exact variable names, and replaced the password placeholder.
- **Login rejected or `/account` not reached**: verify the approved account can sign in
  manually, then check the first useful error in the report.
- **Browser missing**: run `npx playwright install chromium`, or enable the installed
  Chrome option described above.
- **Wrong folder**: the terminal must be in this day's folder, not its parent or `tests`.

[Back to the lesson list](../README.md)
