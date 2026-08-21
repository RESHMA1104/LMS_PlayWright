import { BugFinder } from "../../world/bug_finder";
import { Given, When, Then } from "@cucumber/cucumber";
import { logger } from "../../utils/logger";

Then('user selects the Client Modal tab', async function (this: BugFinder) {
    try {
        logger.info("Selecting the Client Modal tab");
        await this.clientmodelPage.SelectClientModalTab();
        logger.info("Client Modal tab selected successfully");
    } catch (error) {
        logger.error(`Failed to select the Client Modal tab: ${error}`);
        throw error;
    }
});

When('user clicks the New Client button', async function (this: BugFinder) {
    try {
        logger.info("Clicking the New Client button");
        await this.clientmodelPage.ClickNewClient();
        logger.info("New Client button clicked successfully");
    } catch (error) {
        logger.error(`Failed to click the New Client button: ${error}`);
        throw error;
    }
});

When('user enters the client name', async function (this: BugFinder) {
    try {
        logger.info("Entering the client name");
        await this.clientmodelPage.EnterClientName();
        logger.info("Client name entered successfully");
    } catch (error) {
        logger.error(`Failed to enter the client name: ${error}`);
        throw error;
    }
});

When('user enters the company name', async function (this: BugFinder) {
    try {
        logger.info("Entering the company name");
        await this.clientmodelPage.EnterCompanyName();
        logger.info("Company name entered successfully");
    } catch (error) {
        logger.error(`Failed to enter the company name: ${error}`);
        throw error;
    }
});

When('user enters the email address', async function (this: BugFinder) {
    try {
        logger.info("Entering the email address");
        await this.clientmodelPage.EnterEmailAddress();
        logger.info("Email address entered successfully");
    } catch (error) {
        logger.error(`Failed to enter the email address: ${error}`);
        throw error;
    }
});

When('user enters the phone number', async function (this: BugFinder) {
    try {
        logger.info("Entering the phone number");
        await this.clientmodelPage.EnterPhoneNumber();
        logger.info("Phone number entered successfully");
    } catch (error) {
        logger.error(`Failed to enter the phone number: ${error}`);
        throw error;
    }
});

When('user enters the client description', async function (this: BugFinder) {
    try {
        logger.info("Entering the client description");
        await this.clientmodelPage.EnterClientDescription();
        logger.info("Client description entered successfully");
    } catch (error) {
        logger.error(`Failed to enter the client description: ${error}`);
        throw error;
    }
});

When('user enters the company address', async function (this: BugFinder) {
    try {
        logger.info("Entering the company address");
        await this.clientmodelPage.EnterCompanyAddress();
        logger.info("Company address entered successfully");
    } catch (error) {
        logger.error(`Failed to enter the company address: ${error}`);
        throw error;
    }
});

When('user clicks the Add Client button', async function (this: BugFinder) {
    try {
        logger.info("Clicking the Add Client button");
        await this.clientmodelPage.ClickAddClient();
        logger.info("Add Client button clicked successfully");
    } catch (error) {
        logger.error(`Failed to click the Add Client button: ${error}`);
        throw error;
    }
});

Then('user should see the client added successfully message', async function (this: BugFinder) {
    try {
        logger.info("Verifying the client added successfully message");
        await this.clientmodelPage.ClientSuccessMsg();
        logger.info("Success message verified");
    } catch (error) {
        logger.error(`Failed to verify the client added successfully message: ${error}`);
        throw error;
    }
});

Then('user should see the client mandatory field validation message', async function (this: BugFinder) {
    try {
        logger.info("Verifying the client mandatory field validation message");
        await this.clientmodelPage.ClientMsgValidation();
        logger.info("Validation message verified successfully");
    } catch (error) {
        logger.error(`Failed to verify the client mandatory field validation message: ${error}`);
        throw error;
    }
});