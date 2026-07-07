import { BugFinder } from "../../world/bug_finder";
import { When, Then} from "@cucumber/cucumber";

Then('user navigates to the Course Management page', async function (this:BugFinder) {
    await this.editPage.CoursePage();
});

Then('user searches for the course name', async function (this:BugFinder) {
    await this.editPage.SearchCourse();
});

Then('user opens the course actions menu', async function (this:BugFinder) {
    await this.editPage.EditMenubtn();
});

Then('user selects the edit option', async function (this:BugFinder) {
    await this.editPage.EditCourse();
});

When('user updates the required course details', async function (this:BugFinder) {
    await this.editPage.CourseClient();
    await this.editPage.ServiceModel();
});

When('user clicks the Next button', async function (this:BugFinder) {
    await this.editPage.NextButton();

});

When('user clicks the Preview and Update button', async function (this:BugFinder) {
    await this.editPage.PreviewandUpdate();
});

Then('user should see the course updated successfully message', async function (this:BugFinder) {
    await this.editPage.SuccessMsg();
});

When('user changes the course category', async function () {
  
});

Then('user should see the error message', async function () {
  
})