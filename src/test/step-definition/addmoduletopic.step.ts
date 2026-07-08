import { Then, When } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_finder";

When('The User Clicks on Add Module button', async function (this: BugFinder) {
    await this.addcoursestructurePage.clickAddModuleBtn();
});
When('Enter The Module Detail Title as {string} and description as {string} and Check the skills', async function (this: BugFinder, string, string2) {
    await this.addcoursestructurePage.fillForm(string, string2);
});
When('The User Clicks on Add Module', async function (this: BugFinder) {
    await this.addcoursestructurePage.clickAddModuleSubmit();
});
Then('The user will be notified with the Success Message', async function (this: BugFinder) {
    await this.addcoursestructurePage.assertModuleSuccessMsg();
});