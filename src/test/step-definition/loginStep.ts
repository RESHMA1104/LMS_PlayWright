import { Given, When, Then } from "@cucumber/cucumber";
import loginData from "../../../test-data/loginData.json";
import { config } from "../../utils/config";
import { BugFinder } from "../../world/bug_finder";
import {logger} from "../../utils/logger";

Given("User on the login page", async function (this: BugFinder) {
    logger.info("Navigating to Login page");
    await this.page.goto(config.baseUrl);
});

When("User enter the valid email", async function (this: BugFinder) {
    logger.info("Entering valid email");
    await this.loginPage.enterEmail(loginData.loginDetails.email);
});

When("User enter the valid password", async function (this: BugFinder) {
    logger.info("Entering valid password");
    await this.loginPage.enterPassword(loginData.loginDetails.password);
});

When("User enter the email {string}", async function (this: BugFinder, email: string) {
    logger.info(`Entering email: ${email}`);
    await this.loginPage.enterEmail(email);
});

When("User enter the password {string}", async function (this: BugFinder, password: string) {
    logger.info("Entering password");
    await this.loginPage.enterPassword(password);
});

When("User clicks the Sign button", async function (this: BugFinder) {
    logger.info("Clicking Sign In button");
    await this.loginPage.clickSignIn();
});

Then("User should navigate to the Dashboard page", async function (this: BugFinder) {
    logger.info("Verifying Dashboard page");
    await this.loginPage.verifyDashboard();
});

Then("User should see the appropriate error {string}", async function (this: BugFinder, message: string) {
    logger.info(`Verifying error message: ${message}`);
    await this.loginPage.verifyErrorMessage(message);
});

When("User click the profile button", async function (this: BugFinder) {
    logger.info("Clicking Profile button");
    await this.loginPage.clickProfile();
});

When("User click the sigout button", async function (this: BugFinder) {
    logger.info("Clicking Sign Out button");
    await this.loginPage.clickSignOut();
});

Then("user should navigate to login page", async function (this: BugFinder) {
    logger.info("Verifying Login page");
    await this.loginPage.verifyLoginPage();
});