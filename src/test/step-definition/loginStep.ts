import { Given, When, Then } from "@cucumber/cucumber";
import loginData from "../../../test-data/loginData.json";
import { config } from "../../utils/config";
Given("User on the login page", async function () {
    await this.page.goto(config.baseUrl);
});

Given("User enter the valid email", async function () {
    await this.loginPage.enterEmail(loginData.email);
});

Given("User enter the valid password", async function () {
    await this.loginPage.enterPassword(loginData.password);
});

Given("User enter the email {string}", async function (email: string) {
     await this.loginPage.enterEmail(email);
});

Given("User enter the password {string}", async function (password: string) {
    await this.loginPage.enterPassword(password);
});

When("User clicks the Sign button", async function () {
    await this.loginPage.clickSignIn();
});

Then("User should navigate to the Dashboard page", async function () {
    await this.loginPage.verifyDashboard();
});

Then("User should see the appropriate error {string}",async function (message: string) {
        await this.loginPage.verifyErrorMessage(message);
    }
);