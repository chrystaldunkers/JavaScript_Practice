class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.getByLabel('Email', { exact: true });
    this.password = page.getByLabel('Password', { exact: true });
    this.signInButton = page.getByRole('button', {
      name: 'Sign in', exact: true
    });
  }

  async open() {
    await this.page.goto('/auth');
    // Meridian hydration workaround, not a generic readiness rule.
    await this.page.waitForLoadState('networkidle');
  }

  async signIn({ email, password }) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.signInButton.click();
  }
}

module.exports = { LoginPage };
