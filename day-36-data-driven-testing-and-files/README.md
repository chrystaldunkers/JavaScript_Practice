# Day 36 · Data-driven testing and files with GitHub Copilot

Open this folder in VS Code and run these commands from its terminal.

```bash
npm ci
npx playwright install chromium
```

Use Node.js 22 or later. If you already have Google Chrome and need to use it
on your training machine, set `PLAYWRIGHT_CHROMIUM_CHANNEL=chrome` when you run a test.

## Part 1 · Data-driven testing in Meridian

```bash
npx playwright test one-driver.spec.js
npx playwright test driver-profiles.spec.js --list
npx playwright test driver-profiles.spec.js
npx playwright test driver-profiles.spec.js --grep typical-driver
```

Start with one fictional driver, then read `data/driverProfiles.json` and
match each of the three row IDs to a test title. The fixture combines each
row with safe defaults. The tests check the two fields on Driver and then
the Vehicle step. These examples stop before saving a quote.

## Part 2 · File upload and PDF download

```bash
npx playwright test file-upload.spec.js
npx playwright test policy-download.spec.js
```

- The upload uses [The Internet file lab](https://the-internet.herokuapp.com/upload)
  and the synthetic text fixture in `fixtures/`. The test checks the confirmation
  heading and the uploaded filename. Use synthetic files on the public lab.
- The download uses **Documents → ID card → Save as PDF** on your assigned
  Meridian training policy. Copy `.env.example` to `.env` and enter your
  assigned training email, password, and policy number before running it.
  The test waits for the download, saves it under `test-results/`, and
  checks the filename extension and PDF signature. Keep your environment
  file and downloaded documents private.

## Part 3 · Review a Copilot suggestion

You can learn this part by watching and complete the Playwright exercise
without Copilot. If you want to try it, follow the
[VS Code setup guide](https://code.visualstudio.com/docs/setup/copilot).
Eligible personal GitHub accounts can try Copilot Free within its monthly allowance.
A paid plan is optional.

1. In VS Code, open the Chat menu in the title bar and select **Open Chat**.
   Start a new chat, then choose **Ask** in the mode picker. The
   [VS Code Chat guide](https://code.visualstudio.com/docs/agents/run/chat-view)
   shows where to find the controls.
2. Copy [the lesson prompt](copilot-prompt.md) into Chat and select **Send**.
   It contains only fictional examples. Share only the course files needed
   for the exercise and keep credentials out of Chat.
3. Read the answer before editing anything. Check that the ID is unique,
   the two values are strings, and years licensed stays at ten. Compare
   the suggested age with the existing cases and review what still needs
   to be proved in Meridian. Copilot can return a different suggestion.
   The recording shows an initial age-26 suggestion, then an optional
   follow-up about age 25. See the review notes for the follow-up prompt.
4. Use [the review notes](review-notes.md) and [the one-row diff](proposed-change.diff)
   to add the course's `younger-same-experience` row to your practice copy.
   Keep the existing three rows, fixture, page object, and assertions.
5. List the tests, run the new case by name, and rerun the full spec.

```bash
npx playwright test driver-profiles.spec.js --list
npx playwright test driver-profiles.spec.js --grep younger-same-experience
npx playwright test driver-profiles.spec.js
```

After applying the diff, the full spec should list four cases. The lesson
checks what Meridian does for these inputs, including reaching Vehicle.
