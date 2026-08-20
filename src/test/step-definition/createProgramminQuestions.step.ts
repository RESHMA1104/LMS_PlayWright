import { Then, When } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_finder";
import { logger } from "../../utils/logger";
import {
    readPGQuestionsData,
    createProgrammingQuestion
} from "../../utils/csvReader";
import { expect } from "@playwright/test";

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