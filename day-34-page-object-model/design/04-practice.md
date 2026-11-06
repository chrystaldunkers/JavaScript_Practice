# Day 34 practice

1. Draw four objects and the two branches.
2. Name one real locator and useful method per object.
3. Write both method-call stories and the transition assertions.
4. Assign locator, policy number, Driver name, construction and assertion.

# Maintenance thought experiment - do not change the live app

Email -> Email address; behavior unchanged.
Inspect LoginPage.email, not repeated locators in every test.
Business changes may also change method contracts and tests.

Debug: test -> signIn -> email locator -> real Email control.
Controlled failure, trace inspection, repair and rerun: Day 35.

# Day 35 build checklist

Four classes. Two independent tests. Small custom fixture.
Safe data. Private account values. Central configuration.
Run each story alone and together. Inspect a failure. Repair. Pass.

Later: saved sessions, multiple roles, inheritance, CI pipelines.

# Official evidence
https://playwright.dev/docs/pom
https://playwright.dev/docs/test-fixtures
https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/
