import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    readonly txtEmail: Locator;
    readonly txtPassword: Locator;
    readonly btnSignIn: Locator;

    constructor(private page: Page) {
        super(page);

        this.txtEmail = page.locator("//input[@type='email']");
        this.txtPassword = page.locator("//input[@type='password']");
        this.btnSignIn = page.locator("//button[@type='submit']");
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

    async verifyDashboard() {
        await expect(this.page).toHaveURL(
            /admindashboard/,
            { timeout: 15000 }
        );
    }
}