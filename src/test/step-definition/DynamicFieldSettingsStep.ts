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

When('user selects the Service Model', async function (this: BugFinder) {
    try {
        logger.info("Selecting the Service Model");
        await this.dynamicFieldSettingsPage.SelectServiceModel();
        logger.info("Service Model selected successfully");
    } catch (error) {
        logger.error(`Failed to select the Service Model: ${error}`);
        throw error;
    }
});

When('user clicks the Add button', async function (this: BugFinder) {
    try {
        logger.info("Clicking the Add button");
        await this.dynamicFieldSettingsPage.ClickAdd();
        logger.info("Add button clicked successfully");
    } catch (error) {
        logger.error(`Failed to click the Add button: ${error}`);
        throw error;
    }
});

When('user enters the course name', async function (this: BugFinder) {
    try {
        logger.info("Entering the course name");
        await this.dynamicFieldSettingsPage.EnterCourseName();
        logger.info("Course name entered successfully");
    } catch (error) {
        logger.error(`Failed to enter the course name: ${error}`);
        throw error;
    }
});

When('user clicks the Save button', async function (this: BugFinder) {
    try {
        logger.info("Clicking the Save button");
        await this.dynamicFieldSettingsPage.ClickSave();
        logger.info("Save button clicked successfully");
    } catch (error) {
        logger.error(`Failed to click the Save button: ${error}`);
        throw error;
    }
});

Then('user should see the field added successfully message', async function (this: BugFinder) {
    try {
        logger.info("Verifying the field added successfully message");
        await this.dynamicFieldSettingsPage.SuccessMsg();
        logger.info("Success message verified");
    } catch (error) {
        logger.error(`Failed to verify the field added successfully message: ${error}`);
        throw error;
    }
});

Then('user should see the course name error message', async function (this: BugFinder) {
    try {
        logger.info("Verifying the course name validation error message");
        await this.dynamicFieldSettingsPage.MsgValidation();
        logger.info("Validation message verified successfully");
    } catch (error) {
        logger.error(`Failed to verify the course name validation error message: ${error}`);
        throw error;
    }
});