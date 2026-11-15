const fs = require('node:fs');
// These are generated outputs within this project, not source files.
for (const directory of ['allure-results', 'allure-report', 'playwright-report', 'test-results']) {
  fs.rmSync(directory, { recursive: true, force: true });
}
