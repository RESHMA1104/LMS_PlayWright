import { Then, When } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_finder";
import { config } from "../../utils/config";

When('The User Clicks on Course Management in DashboaedPage', async function (this: BugFinder) {
    await this.dashboardPage.clickCourseManagementDrawer();
});

When('The User Enters The Course Name In Search Bar', async function (this: BugFinder) {
    await this.coursemanagementPage.enterSearchValue(config.courseName)
});

When('The User Clicks on Add course Structure On Search Resulted Course', async function (this: BugFinder) {
    await this.coursemanagementPage.clickAddCouresStructure();
});

Then('The User should be redirected to Add Course Structure page', async function (this: BugFinder) {
    await this.coursemanagementPage.assertCourseManagementUrl(config.addCourseStructureUrl);
});