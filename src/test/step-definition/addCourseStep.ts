import { BugFinder } from "../../world/bug_finder";
import { When, Then } from "@cucumber/cucumber";

When('the user clicks the Add Course button', async function (this: BugFinder) {
    await this.addCoursePage.clickAddCourse();
});

When('the user clicks the Next button without entering course details', async function (this: BugFinder) {
    await this.addCoursePage.clickNext();
});

Then('a warning message should be displayed', async function (this: BugFinder) {
    await this.addCoursePage.validateWarningMessages();
});
