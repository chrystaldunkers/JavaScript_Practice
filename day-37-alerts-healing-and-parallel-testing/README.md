# Day 37 — Alerts, Iframes, Popups, Locator Repair and Parallel Testing

Use the folder that matches the current lesson day. Open this folder in VS Code and run commands from its terminal.

## Install dependencies

```sh
npm ci
npx playwright install chromium firefox
```

The Meridian projects use installed Google Chrome and Microsoft Edge, matching the recording. Install either browser if you want to select its project. On a supported host, `npx playwright install msedge` installs Edge. The Heroku examples use Playwright Chromium.

## Part 1 — Heroku alerts, iframe and popup

```sh
npx playwright test --config=playwright.heroku.config.js
```

Read [the five tests](tests/heroku/browser-contexts.spec.js). They accept an alert, dismiss a confirmation, type into a prompt, read the TinyMCE iframe and check a new window. Register the dialog or popup listener before clicking its trigger. The iframe exercise reads existing text because this demo's editor may be read-only.

## Parts 2 and 3 — Meridian locator repair, browsers and workers

Start with the working locator test:

```sh
npx playwright test --project=locator
```

In a disposable copy, change only the Continue locator in [locator-repair.spec.js](tests/meridian/locator-repair.spec.js) to `driverPage.page.locator('#continue-quote-old')`. Run the same command, then open the trace path printed in the failure:

```sh
npx playwright show-trace path/to/trace.zip
```

Find the failed click, compare its selector with the current Continue button, and restore `getByRole('button', { name: 'Continue', exact: true })`. Keep the Vehicle assertion and rerun the same test.

Playwright's Healer can propose a repair when configured in your editor. Give it the failing test and trace, review its diff and rerun. A repaired test must still check the original intended behavior. Follow the [official agent setup](https://playwright.dev/docs/test-agents) for the selected editor.

Run the same two independent smoke tests across the three browsers:

```sh
npx playwright test --project=chrome --project=edge --project=firefox --workers=1
```

Compare worker counts while keeping Chrome and the two cases fixed:

```sh
npx playwright test --project=chrome --workers=1
npx playwright test --project=chrome --workers=2
```

Each test starts with its own fictional driver and browser context. They stop at or before Vehicle. Compare the actual results and observed times, including the cost of starting workers.

For an older Mac that cannot run current browsers, VS Code Remote SSH can connect to a supported Ubuntu host. Run the project, browsers and agent there. Your editor stays on the laptop. Agent availability also depends on the selected editor/provider account.

## Practice

Explain why the role locator is appropriate, why the Vehicle assertion matters and why two workers can run these cases independently.

[Playwright agents](https://playwright.dev/docs/test-agents) · [Parallelism](https://playwright.dev/docs/test-parallel) · [Browser projects](https://playwright.dev/docs/browsers)
