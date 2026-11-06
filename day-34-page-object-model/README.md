# Day 34 - Page Object Model design

This is a deliberately small class demonstration, not the Day 35 framework.
Implemented: LoginPage and one account-landing check.
Design references: four-object map, two future journeys, responsibilities, practice.
The files in design/ are not runnable end-to-end tests.

Install Node.js 22 or newer and Google Chrome, then run npm ci.
Copy .env.example to .env and enter your approved course account privately.
Run npm test. Open the HTML report with npx playwright show-report.
LoginPage.open uses the previously verified Meridian hydration workaround.
It is app-specific, not a general recommendation to wait for network idle.
Keep private .env and generated results out of Git.
Full AccountPage, PolicyPage, QuotePage, custom fixtures and two complete
journeys belong to Day 35. No quote is saved or purchased in this example.
