import { Then, When } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_finder";
import { config } from "../../utils/config";
import { logger } from "../../utils/logger";

When('The User Clicks on Course Management in DashboaedPage', async function (this: BugFinder) {
    logger.info("Clicking on Course Management in Dashboard page");
    await this.dashboardPage.clickCourseManagementDrawer();
    logger.info("Clicked on Course Management successfully");
});

When('The User Enters The Course Name In Search Bar', async function (this: BugFinder) {
    logger.info(`Entering course name in search bar: ${config.courseName}`);
    await this.coursemanagementPage.enterSearchValue(config.courseName);
    logger.info("Course name entered in search bar successfully");
});

When('The User Clicks on Add course Structure On Search Resulted Course', async function (this: BugFinder) {
    logger.info("Clicking on Add Course Structure button from search result");
    await this.coursemanagementPage.clickAddCouresStructure();
    logger.info("Clicked on Add Course Structure button successfully");
});

Then('The User should be redirected to Add Course Structure page', async function (this: BugFinder) {
    logger.info(`Verifying Add Course Structure page URL contains: ${config.addCourseStructureUrl}`);
    await this.coursemanagementPage.assertCourseManagementUrl(config.addCourseStructureUrl);
    logger.info("Redirected to Add Course Structure page successfully");
});