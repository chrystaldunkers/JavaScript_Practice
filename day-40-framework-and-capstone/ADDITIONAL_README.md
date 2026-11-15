
# Day 40 - My Setup Instructions

## Setting Up the Project

This project uses Playwright to run automated tests on the Meridian training website.

First, install the project dependencies and Chromium browser.

```bash
npm ci
npx playwright install chromium
```

## Environment Variables

Create a `.env` file from the example file.

```bash
cp .env.example .env
```

Add the training account information to the `.env` file using these variable names and safe example values:

```text
MERIDIAN_EMAIL=training@example.com
MERIDIAN_PASSWORD=example-password
MERIDIAN_POLICY_NUMBER=EXAMPLE123
```

Replace the examples with your approved training account information.

**Best Practice:** If your password contains a `#` character, enclose the entire password in quotes in the `.env` file. Otherwise, the `#` may be treated as the start of a comment, causing part of your password to be ignored.

Example:

```text
MERIDIAN_PASSWORD="Example#Password123"
```

Never upload your actual `.env` file, passwords, or private account information to GitHub.

## Running the Tests

To run all three tests:

```bash
npm test
```

To run each test separately:

```bash
npm run test:policy
npm run test:quote
npm run test:api
```

## Viewing the Allure Report

After running the tests, generate and open the Allure report:

```bash
npm run report:generate
npm run report:open
```

The report shows which tests passed or failed and provides evidence to help investigate failures.

## GitHub Actions

GitHub Actions runs the automated tests in a separate environment.

The repository uses these GitHub Actions secrets:

```text
MERIDIAN_EMAIL
MERIDIAN_PASSWORD
MERIDIAN_POLICY_NUMBER
```

These secrets allow the workflow to access the approved training account without storing private credentials in the code.

To run the workflow:

1. Open the repository on GitHub.
2. Select Actions.
3. Choose Day 40 Meridian Capstone.
4. Select Run workflow.
5. Choose the master branch and run the workflow.

After the workflow finishes, check the results and download the Allure report artifact.

## Keeping the Project Safe

Do not upload the following to GitHub:

- `.env` files containing actual credentials
- `node_modules`
- Private account information
- Reports containing private training account data

Only commit the project code, safe example files, and documentation.
