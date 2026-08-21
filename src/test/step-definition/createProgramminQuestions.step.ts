import { QuestionBankPage } from "./../pages/questionBankPage";
import { Then, When } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_finder";
import { logger } from "../../utils/logger";
import {
    readPGQuestionsData,
    createProgrammingQuestion
} from "../../utils/csvReader";
import { expect } from "@playwright/test";
import dbQuestions from "../../../test-data/dbQuestion.json";

const pgData: createProgrammingQuestion[] = readPGQuestionsData();

When('the user click on the QuestionBank Link', async function (this: BugFinder) {

    logger.info("Clicking on Question Bank link");

    await this.dashboardPage.clickQuestionBankDrawer();

    logger.info("Successfully clicked on Question Bank link");
});


When('The User Clicks on Create Question Button', async function (this: BugFinder) {

    logger.info("Clicking on Create Question button");

    await this.questionBankPage.clickCreateQuestionBtn();

    logger.info("Successfully clicked on Create Question button");
});


When('The user Clicks on Programming Question', async function (this: BugFinder) {

    logger.info("Clicking on Programming Question button");

    await this.questionBankPage.clickProgrammingQuestionBtn();

    logger.info("Successfully selected Programming Question");
});


When('The User Enters the Category name Question Bank page', async function (this: BugFinder) {

    for (const qd of pgData) {

        logger.info(`Entering Question Category: ${qd.categoryName}`);

        await this.questionBankPage.enterQuestionCategory(qd.categoryName);

        logger.info(`Successfully entered category: ${qd.categoryName}`);
    }
});


When('The user Choose The Diffuculty level', async function (this: BugFinder) {

    for (const qd of pgData) {

        logger.info(`Selecting Difficulty Level: ${qd.difficultyLevel}`);

        await this.questionBankPage.selectDifficultyDD(qd.difficultyLevel);

        logger.info(`Successfully selected difficulty level: ${qd.difficultyLevel}`);
    }
});


When('Enter the Problem Title Description', async function (this: BugFinder) {

    for (const qd of pgData) {

        logger.info(`Entering Problem Title: ${qd.title}`);

        await this.questionBankPage.enterProblemTitle(qd.title);

        logger.info("Problem title entered successfully");

        logger.info("Entering Problem Description");

        await this.questionBankPage.enterProblemDescription(qd.description);

        logger.info("Problem description entered successfully");
    }
});


When('The user add input and output in testcase field', async function (this: BugFinder) {

    for (const qd of pgData) {

        logger.info(`Entering Test Case Input: ${qd.input}`);

        await this.questionBankPage.inputTC(qd.input);

        logger.info("Test case input entered successfully");

        logger.info(`Entering Test Case Output: ${qd.output}`);

        await this.questionBankPage.outputTC(qd.output);

        logger.info("Test case output entered successfully");
    }
});


When('The User Clicks on Submit created Question Button', async function (this: BugFinder) {

    logger.info("Clicking on Create Question Submit button");

    await this.questionBankPage.clickCreateQuestionSubmitBtn();

    logger.info("Create Question button clicked successfully");
});


Then('The User Should see an Creation Success Message', async function (this: BugFinder) {

    logger.info("Verifying Question Creation Success Message");

    const successMsg =
        await this.questionBankPage.getSuccessMsgQuestionCreation();

    logger.info(`Actual Success Message: "${successMsg}"`);

    for (const qd of pgData) {

        logger.info(`Expected Success Message: "${qd.successMessage}"`);

        expect(successMsg).toContain(qd.successMessage);

        logger.info(
            `Question creation success message verified: "${qd.successMessage}"`
        );
    }
});


When('The User Clicks on Browse Button in Category InputBox', async function (this: BugFinder) {

    logger.info("Clicking on Browse button in Category input field");

    await this.questionBankPage.clickBrowseBtn();

    logger.info("Successfully opened Category popup");
});


When('The User Selects an Category in Category pop-up', async function (this: BugFinder) {

    logger.info("Selecting Object Oriented Programming category");

    await this.questionBankPage.selectQuestionCategory();

    logger.info("Successfully selected Object Oriented Programming category");
});


When('The User See the Selected Category in Category Input field', async function (this: BugFinder) {

    logger.info("Verifying selected category in Category input field");

    const category =
        await this.questionBankPage.selectCategorySuccess();

    logger.info(`Actual selected category: "${category}"`);

    expect(category).toContain("Object Oriented Programming");

    logger.info(
        "Successfully verified Object Oriented Programming category in input field"
    );
});


When('The user Selects the stack frontend', async function (this: BugFinder) {

    logger.info("Selecting Frontend stack");

    await this.questionBankPage.clickFrontend();

    logger.info("Successfully selected Frontend stack");
});


When('The user Selects the stack database', async function (this: BugFinder) {

    logger.info("Selecting Database stack");

    await this.questionBankPage.clickDatabase();

    logger.info("Successfully selected Database stack");
});


When('The User Enters the sample Query and Expected Result', async function (this: BugFinder) {

    logger.info("Entering sample query and expected result");

    logger.info(`Sample Query: ${dbQuestions.query.sampleQuery}`);
    logger.info(`Expected Query Result: ${dbQuestions.query.expectedQuery}`);

    await this.questionBankPage.enterQueries(
        dbQuestions.query.sampleQuery,
        dbQuestions.query.expectedQuery
    );

    logger.info("Successfully entered sample query and expected result");
});


When('The User add another testcase', async function (
    this: BugFinder,
    dataTable
) {

    logger.info("Adding another test case");

    const data = dataTable.hashes();

    for (const row of data) {

        logger.info(`Test Case Input: ${row.input}`);
        logger.info(`Test Case Output: ${row.output}`);

        await this.questionBankPage.addNewTestCase(
            row.input,
            row.output
        );

        logger.info("Successfully added test case");
    }
});


When('The User creates an another testCases', async function (this: BugFinder) {

    logger.info("Creating another test case");

    await this.questionBankPage.createTC();

    logger.info("Successfully created another test case");
});


When('The User clicks on Delete Button on created testcase', async function (this: BugFinder) {

    logger.info("Clicking Delete button on created test case");

    await this.questionBankPage.deleteTC();

    logger.info("Successfully deleted test case");
});


Then('The Test Case Should be Deleted', async function (this: BugFinder) {

    logger.info("Verifying test case deletion");

    const actual =
        await this.questionBankPage.getExistingTC();

    logger.info(`Remaining test case count/text: "${actual}"`);

    expect(actual).toContain("1");

    logger.info("Successfully verified that the test case was deleted");
});