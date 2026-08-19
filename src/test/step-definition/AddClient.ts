import { When, Then } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_finder";
import { logger } from '../../utils/logger';

When("the user click on the clientModel", async function (this: BugFinder) {
    logger.info("User clicks on Client Model");
    await this.Addclient.clickClientIcon();
});

When("he click on the add client", async function (this: BugFinder) {
    logger.info("User clicks on Add Client button");
    await this.Addclient.clickAddClient();
});

Then(
    "the user Enter {string} {string} {string} {string} {string} {string}",
    async function (this: BugFinder,clientname: string,companyname: string,email: string,phone: string,description: string,companyAddress: string
    ) {
        logger.info("User enters client details");
        await this.Addclient.enterClientDetails( clientname,companyname,email,phone,description,companyAddress);
        logger.info("User clicks on Save button");
        await this.Addclient.clickSave();
    }
);

Then("the new client added successfully", async function (this: BugFinder) {
    logger.info("Verifying client added successfully");
    await this.Addclient.verifyClientAddedSuccessfully();
});