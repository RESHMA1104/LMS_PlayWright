import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private txtEmail: Locator;
  private txtPassword: Locator;
  private btnSignIn: Locator;
  private lblErrorMessage: Locator;
  private profile: Locator;
  private signout: Locator;
  constructor(page: Page) {
    super(page);

    this.txtEmail = page.locator("//input[@type='email']");
    this.txtPassword = page.locator("//input[@type='password']");
    this.btnSignIn = page.locator("//button[@type='submit']");
    this.profile = page.locator("(//button[@aria-haspopup='menu'])[2]");
    this.signout = this.page.getByRole("menuitem", {name: "Sign Out"});
    // Toast notification
    this.lblErrorMessage = page.locator("[role='status']");
  }

  async enterEmail(email: string) {
    await this.fill(this.txtEmail, email);
  }

  async enterPassword(password: string) {
    await this.fill(this.txtPassword, password);
  }

  async clickSignIn() {
    await this.click(this.btnSignIn);
  }

  async login(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
  }

  async verifyDashboard() {
    await expect(this.page).toHaveURL(/admindashboard/, {
      timeout: 20000,
    });
  }
  async clickProfile() {
    await this.click(this.profile);
  }

  async clickSignOut() {
    await this.click(this.signout);
  }

  async verifyLoginPage() {
    await expect(this.page).toHaveURL(/login/, {
      timeout: 20000,
    });

    await expect(this.btnSignIn).toBeVisible();
  }
  async verifyErrorMessage(message: string) {

    // Browser validation for empty mandatory fields
    if (message === "Please fill out this field.") {

        const emailValue = await this.txtEmail.inputValue();
        const passwordValue = await this.txtPassword.inputValue();

        if (emailValue === "") {
            const validationMessage = await this.getValidationMessage(this.txtEmail);
            expect(validationMessage).toBe(message);
        } else if (passwordValue === "") {
            const validationMessage = await this.getValidationMessage(this.txtPassword);
            expect(validationMessage).toBe(message);
        }
        return;
    }
    // Application toast validation
    await expect(this.lblErrorMessage).toBeVisible({
        timeout: 20000,
    });

    await expect(this.lblErrorMessage).toContainText(message, {
        timeout: 20000,
    });
}
}
