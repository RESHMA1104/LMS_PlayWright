import { BugFinder } from "../../world/bug_finder";
import { Given, When, Then } from "@cucumber/cucumber";
import { logger } from "../../utils/logger";
import { ExcelReader } from "../../utils/excelReader";

Then('user navigates to the Course Management page', async function (this: BugFinder) {
    try {
        logger.info("Navigating to Course Management page");
        await this.editPage.CoursePage();
        logger.info("Successfully navigated to Course Management page");
    } catch (error) {
        logger.error(`Failed to navigate to Course Management page: ${error}`);
        throw error;
    }
});

Then('user searches for the course name', async function (this: BugFinder) {
    try {
        logger.info("Searching for the course");
        await this.editPage.SearchCourse();
        logger.info("Course searched successfully");
    } catch (error) {
        logger.error(`Failed to search for the course: ${error}`);
        throw error;
    }
});

Then('user opens the course actions menu', async function (this: BugFinder) {
    try {
        logger.info("Opening the course actions menu");
        await this.editPage.EditMenubtn();
        logger.info("Course actions menu opened successfully");
    } catch (error) {
        logger.error(`Failed to open the course actions menu: ${error}`);
        throw error;
    }
});

Then('user selects the edit option', async function (this: BugFinder) {
    try {
        logger.info("Selecting the Edit Course option");
        await this.editPage.EditCourse();
        logger.info("Edit Course page opened successfully");
    } catch (error) {
        logger.error(`Failed to select the Edit Course option: ${error}`);
        throw error;
    }
});

When('user updates the required course details', async function (this: BugFinder) {
    try {
        logger.info("Updating the required course details");
        await this.editPage.CourseClient();
        await this.editPage.ServiceType();
        await this.editPage.ServiceModel();
        logger.info("Course details updated successfully");
    } catch (error) {
        logger.error(`Failed to update the required course details: ${error}`);
        throw error;
    }
});

When('user clicks the Next button', async function (this: BugFinder) {
    try {
        logger.info("Clicking the Next button");
        await this.editPage.NextButton();
        logger.info("Navigated to the Course Hierarchy and Layout page");
    } catch (error) {
        logger.error(`Failed to click the Next button: ${error}`);
        throw error;
    }
});

When('user clicks the Preview and Update button', async function (this: BugFinder) {
    try {
        logger.info("Clicking the Preview and Update button");
        await this.editPage.PreviewandUpdate();
        logger.info("Course updated successfully");
    } catch (error) {
        logger.error(`Failed to click the Preview and Update button: ${error}`);
        throw error;
    }
});

Then('user should see the course updated successfully message', async function (this: BugFinder) {
    try {
        logger.info("Verifying the course updated successfully message");
        await this.editPage.SuccessMsg();
        logger.info("Success message verified");
    } catch (error) {
        logger.error(`Failed to verify the course updated successfully message: ${error}`);
        throw error;
    }
});

When('user changes the course category', async function (this: BugFinder) {
    try {
        logger.info("Changing the course category");
        await this.editPage.CourseCat();
        logger.info("Course category changed successfully");
    } catch (error) {
        logger.error(`Failed to change the course category: ${error}`);
        throw error;
    }
});

Then('user should see the error message', async function (this: BugFinder) {
    try {
        logger.info("Verifying the validation error message");
        await this.editPage.MsgValidation();
        logger.info("Validation message verified successfully");
    } catch (error) {
        logger.error(`Failed to verify the validation error message: ${error}`);
        throw error;
    }
});

Given('user has completed the Basic Configuration page', async function (this: BugFinder) {
    try {
        logger.info("Completing the Basic Configuration page");
        await this.editPage.CourseBasicPge();
        logger.info("Basic Configuration page completed");
    } catch (error) {
        logger.error(`Failed to complete the Basic Configuration page: ${error}`);
        throw error;
    }
});

When('user selects {string} in the I Do pedagogy', async function (this: BugFinder, ido) {
    try {
        logger.info(`Selecting "${ido}" in the I Do pedagogy`);
        await this.editPage.selectIDo(ido);
        logger.info(`"${ido}" selected successfully in the I Do pedagogy`);
    } catch (error) {
        logger.error(`Failed to select "${ido}" in the I Do pedagogy: ${error}`);
        throw error;
    }
});

When('user selects {string} in the We Do pedagogy', async function (this: BugFinder, wedo) {
    try {
        logger.info(`Selecting "${wedo}" in the We Do pedagogy`);
        await this.editPage.selectWeDo(wedo);
        logger.info(`"${wedo}" selected successfully in the We Do pedagogy`);
    } catch (error) {
        logger.error(`Failed to select "${wedo}" in the We Do pedagogy: ${error}`);
        throw error;
    }
});

When('user selects {string} in the You Do pedagogy', async function (this: BugFinder, youdo) {
    try {
        logger.info(`Selecting "${youdo}" in the You Do pedagogy`);
        await this.editPage.selectYouDo(youdo);
        logger.info(`"${youdo}" selected successfully in the You Do pedagogy`);
    } catch (error) {
        logger.error(`Failed to select "${youdo}" in the You Do pedagogy: ${error}`);
        throw error;
    }
});

When('user selects the required skill set', async function (this: BugFinder) {
    logger.info("Selecting the required skill set from Excel data");
    const addSkillData = ExcelReader.read("test-data\\CourseEdit.xlsx", "Sheet1");
    for (const row of addSkillData) {
        try {
            logger.info(`Selecting skill: ${row.skill}`);
            await this.editPage.SkillsetAdd(row.skill);
            logger.info(`Successfully selected skill: ${row.skill}`);
        } catch (error) {
            logger.error(`Failed to select skill "${row.skill}": ${error}`);
            throw error;
        }
    }
});

When('user selects the required resource types for I Do, We Do, and You Do', async function (this: BugFinder) {
    logger.info("Selecting the required types from Excel data");
    const requiredData = ExcelReader.read("test-data\\CourseEdit.xlsx", "Sheet2");
    for (const row of requiredData) {
        try {
            logger.info(`Selecting Required Data: ${row.required}`);
            await this.editPage.RequiredType(row.required);
            logger.info(`Successfully updated required: ${row.required}`);
        } catch (error) {
            logger.error(`Failed to select required type "${row.required}": ${error}`);
            throw error;
        }
    }
});