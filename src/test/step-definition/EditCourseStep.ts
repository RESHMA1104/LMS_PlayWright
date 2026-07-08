import { BugFinder } from "../../world/bug_finder";
import { Given, When, Then} from "@cucumber/cucumber";

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

When('user changes the course category', async function (this:BugFinder) {
    await this.editPage.CourseCat();
});

Then('user should see the error message', async function (this:BugFinder) {
    await this.editPage.MsgValidation();
});

Given('user has completed the Basic Configuration page', async function (this:BugFinder) {
    await this.editPage.CourseBasicPge();
});

When('user selects {string} in the I Do pedagogy', async function (this:BugFinder, ido) {
    await this.editPage.selectIDo(ido);
});

When('user selects {string} in the We Do pedagogy', async function (this:BugFinder,wedo) {
    await this.editPage.selectWeDo(wedo);
});

When('user selects {string} in the You Do pedagogy', async function (this:BugFinder,youdo) {
    await this.editPage.selectYouDo(youdo);
});
