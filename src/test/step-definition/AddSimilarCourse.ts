import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import loginData from "../../../test-data/loginData.json";
import { BugFinder } from "../../world/bug_finder";

When('The user clicks on the Similar Courses', async function (this: BugFinder) {
    await this.AddSimilarCourses.clicksimilarcousre();
});

When('Select the Course {string} and select the {string} to be duplicated',
    async function (this: BugFinder, category: string, course: string) {
        await this.AddSimilarCourses.Selcatego(category);
        await this.AddSimilarCourses.SelCourse(course);
    });

When('Select the Available Hierarchy Levels and Select Module Rows to duplicate', async function (this: BugFinder) {
    await this.AddSimilarCourses.SelectALL();
});

When('Clicks on Duplicate btn the Course', async function (this: BugFinder) {
    await this.AddSimilarCourses.duplicate();
});

Then('The Course Structure is Added Successfully', async function (this: BugFinder) {
    // TODO: add an assertion here, e.g.:
    // await expect(this.page.locator('text=Course Structure Added Successfully')).toBeVisible();
});