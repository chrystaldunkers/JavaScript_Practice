const { expect } = require('@playwright/test');

class AccountPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', {
      name: 'My account', exact: true
    });
    this.identity = page.getByText(/Signed in as/);
    this.startQuoteLink = page.getByRole('link', {
      name: 'Start a new quote', exact: true
    });
  }

  policyLink(number) {
    return this.page.getByRole('link', { name: number, exact: true });
  }

  async openPolicy(number) {
    const link = this.policyLink(number);
    await expect(link,
      'Required owned policy is not visible. Check the account, record and list readiness.'
    ).toBeVisible();
    await link.click();
  }

  async startNewQuote() {
    await this.startQuoteLink.click();
  }
}

module.exports = { AccountPage };
