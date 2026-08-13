import { BugFinder } from "../../world/bug_finder";
import { When, Then } from "@cucumber/cucumber";
import { logger } from "../../utils/logger";

When('user searches for the course to delete', async function (this: BugFinder) {
    logger.info("Searching for the course to delete...");
    await this.deletePage.Searchcrse();
    logger.info("Course searched successfully.");
});

When('user opens the course menu to delete the course', async function (this: BugFinder) {
    logger.info("Opening course action menu...");
    await this.deletePage.CourseMenu();
    logger.info("Course action menu opened successfully.");
});

When('user selects the delete option', async function (this: BugFinder) {
    logger.info("Selecting the Delete option...");
    await this.deletePage.ConfirmDelete();
    logger.info("Delete option selected.");
});

When('user confirms the course deletion', async function (this: BugFinder) {
    logger.info("Confirming course deletion...");
    await this.deletePage.DeleteCourse();
    logger.info("Course deletion confirmed.");
});

Then('the course deleted course successfully.', async function (this: BugFinder) {
    try {
        logger.info("Verifying course deletion...");
        await this.deletePage.VerifyCourseDeleted();
        logger.info("Course deleted successfully.");
    } catch (error) {
        logger.error(`Course deletion verification failed: ${error}`);
        throw error;
    }
});