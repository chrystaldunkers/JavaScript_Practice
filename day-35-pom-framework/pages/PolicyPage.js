const { expect } = require('@playwright/test');

class PolicyPage {
  constructor(page) {
    this.page = page;
    this.policyNumber = page.getByText(/^POL-[A-Z0-9]+$/);
    this.backToAccountLink = page.getByRole('link', {
      name: /Back to My account/
    });
  }

  async waitUntilReady() {
    await expect(this.backToAccountLink).toBeVisible();
  }

  async backToAccount() {
    await this.backToAccountLink.click();
  }
}

module.exports = { PolicyPage };
