import { Then, When } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_finder";
import { logger } from "../../utils/logger";

When('The User Clicks on Add Module button', async function (this: BugFinder) {
    logger.info("Clicking on Add Module button");
    await this.addcoursestructurePage.clickAddModuleBtn();
    logger.info("Clicked on Add Module button successfully");
});

When('Enter The Module Detail Title as {string} and description as {string} and Check the skills', async function (this: BugFinder, title: string, description: string) {
    logger.info(`Entering module details. Title: ${title}, Description: ${description}`);
    await this.addcoursestructurePage.fillForm(title, description);
    logger.info("Module details entered and skills selected successfully");
});

When('The User Clicks on Add Module', async function (this: BugFinder) {
    logger.info("Clicking on Add Module submit button");
    await this.addcoursestructurePage.clickAddModuleSubmit();
    logger.info("Clicked on Add Module submit button successfully");
});

Then('The user will be notified with the Success Message', async function (this: BugFinder) {
    logger.info("Verifying module success message");
    await this.addcoursestructurePage.assertModuleSuccessMsg();
    logger.info("Module success message verified successfully");
});