import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    readonly page: Page;

    readonly txtEmail: Locator;
    readonly txtPassword: Locator;
    readonly btnSignIn: Locator;
    readonly lblErrorMessage: Locator;

    constructor(page: Page) {
        super();

        this.page = page;

        this.txtEmail = page.locator("//input[@type='email']");
        this.txtPassword = page.locator("//input[@type='password']");
        this.btnSignIn = page.locator("//button[@type='submit']");

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
            timeout: 15000,
        });
    }

    async verifyErrorMessage(message: string) {

        await expect(this.lblErrorMessage).toBeVisible({
            timeout: 20000,
        });

        await expect(this.lblErrorMessage).toContainText(message, {
            timeout: 20000,
        });
    }
}