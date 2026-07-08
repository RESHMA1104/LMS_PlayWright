import { Given, When, Then } from "@cucumber/cucumber";
import loginData from "../../../test-data/loginData.json";
import { config } from "../../utils/config";
import { BugFinder } from "../../world/bug_finder";
Given("User on the login page", async function (this:BugFinder) {
    await this.page.goto(config.baseUrl);
});

Given("User enter the valid email", async function (this:BugFinder) {
    await this.loginPage.enterEmail(loginData.loginDetails.email);
});

Given("User enter the valid password", async function (this:BugFinder) {
    await this.loginPage.enterPassword(loginData.loginDetails.password);
});

Given("User enter the email {string}", async function (this:BugFinder,email: string) {
     await this.loginPage.enterEmail(email);
});

Given("User enter the password {string}", async function (this:BugFinder,password: string) {
    await this.loginPage.enterPassword(password);
});

When("User clicks the Sign button", async function (this:BugFinder) {
    await this.loginPage.clickSignIn();
});

Then("User should navigate to the Dashboard page", async function (this:BugFinder) {
    await this.loginPage.verifyDashboard();
});

Then("User should see the appropriate error {string}",async function (this:BugFinder,message: string) {
        await this.loginPage.verifyErrorMessage(message);
    }
);