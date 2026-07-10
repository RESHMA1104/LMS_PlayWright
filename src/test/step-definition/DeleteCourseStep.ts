import { BugFinder } from "../../world/bug_finder";
import { Given, When, Then } from "@cucumber/cucumber";
import { logger } from "../../utils/logger";

When('user searches for the course to delete', async function (this:BugFinder) {
    await this.deletePage.Searchcrse();
});

When('user opens the course menu to delete the course', async function (this:BugFinder) {
    await this.deletePage.CourseMenu();
});

When('user selects the delete option', async function (this:BugFinder) {
    await this.deletePage.ConfirmDelete();
});

When('user confirms the course deletion', async function (this:BugFinder) {
    await this.deletePage.DeleteCourse();
});

Then('the course deleted course successfully.', async function (this:BugFinder) {
    await this.deletePage.VerifyCourseDeleted();
});