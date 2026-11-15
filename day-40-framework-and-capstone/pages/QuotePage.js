const { expect } = require('@playwright/test');

class QuotePage {
  constructor(page) {
    this.page = page;
    this.driverName = page.getByLabel('Driver name', { exact: true });
    this.email = page.getByRole('textbox', {
      name: 'Email', exact: true
    });
    this.continueButton = page.getByRole('button', {
      name: 'Continue', exact: true
    });
    this.vinInput = page.getByRole('textbox', { name: /^VIN/ });
    this.saveQuoteButton = page.getByRole('button', {
      name: 'Save my quote', exact: true
    });
    this.standardChoice = page.getByRole('button', {
      name: /^standard\b/i
    });
    this.ratingTile = page
      .getByText('Rating factors live', { exact: true })
      .locator('..');
  }

  async waitUntilReady() {
    await expect(
      this.ratingTile.getByText(/^[1-9]\d*$/)
    ).toBeVisible();
    await expect(this.driverName).toBeVisible();
    await expect(this.email).toBeVisible();
  }

  async fillDriver({ name, email }) {
    await this.driverName.fill(name);
    await this.email.fill(email);
  }

  async continueToVehicle() {
    await expect(this.driverName).toBeVisible();
    await this.continueButton.click();
  }

  async continueToCoverage() {
    await expect(this.vinInput).toBeVisible();
    await this.continueButton.click();
  }
}

module.exports = { QuotePage };
