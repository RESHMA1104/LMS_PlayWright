import { BugFinder } from "../../world/bug_finder";
import { Given, When, Then } from "@cucumber/cucumber";
import { logger } from "../../utils/logger";

Then('user navigates to the Dynamic Field Settings page', async function (this: BugFinder) {
    try {
        logger.info("Navigating to Dynamic Field Settings page");
        await this.dynamicFieldSettingsPage.DynamicFieldSettingsPageNav();
        logger.info("Successfully navigated to Dynamic Field Settings page");
    } catch (error) {
        logger.error(`Failed to navigate to Dynamic Field Settings page: ${error}`);
        throw error;
    }
});

Then('user selects the Service Model tab', async function (this: BugFinder) {
    try {
        logger.info("Selecting the Service Model tab");
        await this.dynamicFieldSettingsPage.SelectServiceModelTab();
        logger.info("Service Model tab selected successfully");
    } catch (error) {
        logger.error(`Failed to select the Service Model tab: ${error}`);
        throw error;
    }
});

When('user clicks the Add Service button', async function (this: BugFinder) {
    try {
        logger.info("Clicking the Add Service button");
        await this.dynamicFieldSettingsPage.ClickAddService();
        logger.info("Add Service button clicked successfully");
    } catch (error) {
        logger.error(`Failed to click the Add Service button: ${error}`);
        throw error;
    }
});

When('user enters the service name', async function (this: BugFinder) {
    try {
        logger.info("Entering the service name");
        await this.dynamicFieldSettingsPage.EnterServiceName();
        logger.info("Service name entered successfully");
    } catch (error) {
        logger.error(`Failed to enter the service name: ${error}`);
        throw error;
    }
});

When('user enters the description', async function (this: BugFinder) {
    try {
        logger.info("Entering the description");
        await this.dynamicFieldSettingsPage.EnterDescription();
        logger.info("Description entered successfully");
    } catch (error) {
        logger.error(`Failed to enter the description: ${error}`);
        throw error;
    }
});

When('user clicks the Create Service button', async function (this: BugFinder) {
    try {
        logger.info("Clicking the Create Service button");
        await this.dynamicFieldSettingsPage.ClickCreateService();
        logger.info("Create Service button clicked successfully");
    } catch (error) {
        logger.error(`Failed to click the Create Service button: ${error}`);
        throw error;
    }
});

Then('user should see the service created successfully message', async function (this: BugFinder) {
    try {
        logger.info("Verifying the service created successfully message");
        await this.dynamicFieldSettingsPage.SuccessMsg();
        logger.info("Success message verified");
    } catch (error) {
        logger.error(`Failed to verify the service created successfully message: ${error}`);
        throw error;
    }
});

Then('user should see the mandatory field validation message', async function (this: BugFinder) {
    try {
        logger.info("Verifying the mandatory field validation message");
        await this.dynamicFieldSettingsPage.MsgValidation();
        logger.info("Validation message verified successfully");
    } catch (error) {
        logger.error(`Failed to verify the mandatory field validation message: ${error}`);
        throw error;
    }
});