import { When, Then } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_finder";
import ServiceEditdata from '../../../test-data/ServiceEditdata.json';
import { logger } from "../../utils/logger";

const valid = ServiceEditdata.edit;

When("the user Search the particular Service to Edit", async function (this: BugFinder) {
    logger.info("Searching for the particular Service to edit");
    await this.ServieEdit.Searchdataindyamic(valid);
    logger.info("Successfully searched for the Service");
});

When("the user click on the edit Service", async function (this: BugFinder) {
    logger.info("Clicking on the Edit Service button");
    await this.ServieEdit.clickngediting();
    logger.info("Successfully clicked on the Edit Service button");
});

When("The user give the new Details such as servicename and description", async function (this: BugFinder) {
    logger.info("Entering new Service Name and Description");
    await this.ServieEdit.enteringDetails(valid);
    logger.info("Successfully entered the updated Service details");
});

Then("the user see the successfully edited popup meassage", async function (this: BugFinder) {
    logger.info("Verifying successfully edited popup message");
    await this.ServieEdit.VerifyupdatePopup();
    logger.info("Successfully verified the edited popup message");
});

Then('the user did not see the successfully edited popup meassage', async function (this: BugFinder) {
    logger.info("Verifying successfully edited popup message is not displayed");
    await this.ServieEdit.VerifyupdatepopupNotDisplayed()
    logger.info("Verified successfully edited popup message is not displayed");
});