const { expect } = require('@playwright/test');
const { selectCustomOption } = require('../helpers/selectCustomOption');

class DriverDetailsPage {
  constructor(page) {
    this.page = page;
    this.name = page.getByLabel('Driver name', { exact: true });
    this.email = page.getByLabel('Email', { exact: true });
    this.age = page.getByLabel('Driver age', { exact: true });
    this.yearsLicensed = page.getByLabel('Years licensed', { exact: true });
    this.licenseState = page.getByLabel('License state', { exact: true });
    this.creditTier = page.getByLabel('Credit tier', { exact: true });
    this.accidents = page.getByLabel('At-fault accidents (3 yrs)', { exact: true });
    this.violations = page.getByLabel('Moving violations (3 yrs)', { exact: true });
    this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
    this.vehicleStep = page.getByRole('textbox', { name: /^VIN/ });
    this.ratingTile = page.getByText('Rating factors live', { exact: true }).locator('..');
  }

  async open() {
    await this.page.goto('/');
    await expect(this.ratingTile.getByText(/^[1-9]\d*$/)).toBeVisible();
    await expect(this.name).toBeVisible();
  }

  async fill(driver) {
    await this.name.fill(driver.name);
    await this.email.fill(driver.email);
    await this.age.fill(driver.age);
    await this.yearsLicensed.fill(driver.yearsLicensed);
    await selectCustomOption(this.page, this.licenseState, driver.licenseState);
    await selectCustomOption(this.page, this.creditTier, driver.creditTier);
    await this.accidents.fill(driver.accidents);
    await this.violations.fill(driver.violations);
  }

  async continue() {
    await this.continueButton.click();
  }
}

module.exports = { DriverDetailsPage };
