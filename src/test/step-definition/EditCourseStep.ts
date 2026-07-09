import { BugFinder } from "../../world/bug_finder";
import { Given, When, Then } from "@cucumber/cucumber";
import { logger } from "../../utils/logger";
import { ExcelReader } from "../../utils/excelReader";

Then('user navigates to the Course Management page', async function (this: BugFinder) {
    logger.info("Navigating to Course Management page");
    await this.editPage.CoursePage();
    logger.info("Successfully navigated to Course Management page");
});

Then('user searches for the course name', async function (this: BugFinder) {
    logger.info("Searching for the course");
    await this.editPage.SearchCourse();
    logger.info("Course searched successfully");
});

Then('user opens the course actions menu', async function (this: BugFinder) {
    logger.info("Opening the course actions menu");
    await this.editPage.EditMenubtn();
    logger.info("Course actions menu opened successfully");
});

Then('user selects the edit option', async function (this: BugFinder) {
    logger.info("Selecting the Edit Course option");
    await this.editPage.EditCourse();
    logger.info("Edit Course page opened successfully");
});

When('user updates the required course details', async function (this: BugFinder) {
    logger.info("Updating the required course details");
    await this.editPage.CourseClient();
    await this.editPage.ServiceType();
    await this.editPage.ServiceModel();
    logger.info("Course details updated successfully");
});

When('user clicks the Next button', async function (this: BugFinder) {
    logger.info("Clicking the Next button");
    await this.editPage.NextButton();
    logger.info("Navigated to the Course Hierarchy and Layout page");
});

When('user clicks the Preview and Update button', async function (this: BugFinder) {
    logger.info("Clicking the Preview and Update button");
    await this.editPage.PreviewandUpdate();
    logger.info("Course updated successfully");
});

Then('user should see the course updated successfully message', async function (this: BugFinder) {
    logger.info("Verifying the course updated successfully message");
    await this.editPage.SuccessMsg();
    logger.info("Success message verified");
});

When('user changes the course category', async function (this: BugFinder) {
    logger.info("Changing the course category");
    await this.editPage.CourseCat();
    logger.info("Course category changed successfully");
});

Then('user should see the error message', async function (this: BugFinder) {
    logger.info("Verifying the validation error message");
    await this.editPage.MsgValidation();
    logger.info("Validation message verified successfully");
});

Given('user has completed the Basic Configuration page', async function (this: BugFinder) {
    logger.info("Completing the Basic Configuration page");
    await this.editPage.CourseBasicPge();
    logger.info("Basic Configuration page completed");
});

When('user selects {string} in the I Do pedagogy', async function (this: BugFinder, ido) {
    logger.info(`Selecting "${ido}" in the I Do pedagogy`);
    await this.editPage.selectIDo(ido);
    logger.info(`"${ido}" selected successfully in the I Do pedagogy`);
});

When('user selects {string} in the We Do pedagogy', async function (this: BugFinder, wedo) {
    logger.info(`Selecting "${wedo}" in the We Do pedagogy`);
    await this.editPage.selectWeDo(wedo);
    logger.info(`"${wedo}" selected successfully in the We Do pedagogy`);
});

When('user selects {string} in the You Do pedagogy', async function (this: BugFinder, youdo) {
    logger.info(`Selecting "${youdo}" in the You Do pedagogy`);
    await this.editPage.selectYouDo(youdo);
    logger.info(`"${youdo}" selected successfully in the You Do pedagogy`);
});

When('user selects the required skill set', async function (this: BugFinder) {
    logger.info("Selecting the required skill set from Excel data");
    const addSkillData = ExcelReader.read("test-data\\CourseEdit.xlsx", "Sheet1");
    for (const row of addSkillData) {
        logger.info(`Selecting skill: ${row.skill}`);
        await this.editPage.SkillsetAdd(row.skill);
        logger.info(`Successfully selected skill: ${row.skill}`);
    }   
});

When('user selects the required resource types for I Do, We Do, and You Do', async function (this: BugFinder) {
    logger.info("Selecting the required types from Excel data");
    const requiredData = ExcelReader.read("test-data\\CourseEdit.xlsx", "Sheet2");
    for (const row of requiredData) {
        logger.info(`Selecting Required Data: ${row.required}`);
        await this.editPage.RequiredType(row.required);
        logger.info(`Successfully updated required: ${row.required}`);
    }   
});