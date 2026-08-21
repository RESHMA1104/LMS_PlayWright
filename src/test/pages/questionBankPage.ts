import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";



export class QuestionBankPage extends BasePage {

    private createQuestionBtn: Locator;
    private programmingQuestinBtn: Locator;
    private categoryIF: Locator;
    private difficultyDropDown: Locator;
    private problemTitleIF: Locator;
    private problemDescription: Locator;
    private testCaseInput: Locator;
    private testCaseOutput: Locator;
    private createQuestionsubmitBtn: Locator;
    private questionCreateSuccessMsg: Locator;
    private browseCategoryButton: Locator;
    private selectCategory: Locator;
    private forntendStack: Locator;
    private sampleQuery: Locator;
    private expectedQuery: Locator;
    private databaseStack: Locator;
    private addTestCaseBtn: Locator;
    private clickTC: Locator;
    private hiddenCBox: Locator;
    private deleteBtnTC: Locator;
    private TCName: Locator;

    constructor(page: Page) {
        super(page);
        this.createQuestionBtn = page.locator('//button[text()=" Create Question"]');
        this.programmingQuestinBtn = page.locator('//button[text()=" Programming Question"]');
        this.categoryIF = page.locator('//input[@placeholder="e.g., Data Structures"]');
        this.difficultyDropDown = page.locator('//select');
        this.problemTitleIF = page.locator('//label[text()="Problem Title"]/following-sibling::input');
        this.problemDescription = page.locator('(//textarea)[1]');
        this.testCaseInput = page.locator('//textarea[@placeholder="stdin..."]').last();
        this.testCaseOutput = page.locator('//textarea[@placeholder="expected stdout..."]').last();
        this.createQuestionsubmitBtn = page.locator('//button[text()="✓ Create Question"]');
        this.questionCreateSuccessMsg = page.locator('//div[text()="Question created successfully"]');
        this.browseCategoryButton = page.locator('//button/child::span[text()="Browse"]');
        this.selectCategory = page.locator('//button/child::span[text()="Object Oriented Programming"]');
        this.forntendStack = page.locator('//button[text()="Frontend"]');
        this.databaseStack = page.locator('//button[text()="Database"]');
        this.sampleQuery = page.locator('//label[text()="Sample Query"]/following-sibling::textarea');
        this.expectedQuery = page.locator('//textarea[@placeholder="Describe the expected result. Use table format or plain text."]');
        this.addTestCaseBtn = page.locator('//button[text()=" Add Test Case"]');
        this.hiddenCBox = page.locator('//input[@type="checkbox"]').last();
        this.clickTC = page.locator('//span[text()="Test Case "]').last();
        this.deleteBtnTC = page.locator('//label[text()="Hidden"]/following-sibling::button').last();
        this.TCName = page.locator('//span[text()="Test Case "]').last();

    }

    async clickCreateQuestionBtn() {
        await this.click(this.createQuestionBtn);
    }
    async clickProgrammingQuestionBtn() {
        await this.click(this.programmingQuestinBtn);
    }
    async enterQuestionCategory(cname: string) {
        await this.fill(this.categoryIF, cname);
    }

    async selectDifficultyDD(index: string) {
        await this.selectDDOptionByValue(this.difficultyDropDown, index);
    }

    async enterProblemTitle(title: string) {
        await this.fill(this.problemTitleIF, title);
    }
    async enterProblemDescription(description: string) {
        await this.fill(this.problemDescription, description);
    }

    async inputTC(input: string) {
        await this.fill(this.testCaseInput, input);
    }
    async outputTC(output: string) {
        await this.fill(this.testCaseOutput, output);
    }

    async clickCreateQuestionSubmitBtn() {
        await this.click(this.createQuestionsubmitBtn);
    }

    async getSuccessMsgQuestionCreation() {
        return await this.getText(this.questionCreateSuccessMsg);
    }

    async clickBrowseBtn() {
        await this.page.waitForTimeout(10000);
        await this.click(this.browseCategoryButton);
        await this.page.waitForTimeout(4000)
    }
    async selectQuestionCategory() {
        await this.click(this.selectCategory);
    }
    async selectCategorySuccess() {
        await this.page.waitForTimeout(5000)
        return await this.categoryIF.getAttribute("value");
    }
    async clickFrontend() {
        await this.click(this.forntendStack);
    }
    async clickDatabase() {
        await this.click(this.databaseStack);
    }
    async enterQueries(squery: string, equery: string) {
        await this.fill(this.sampleQuery, squery);
        await this.fill(this.expectedQuery, equery);
    }

    async addNewTestCase(i: string, o: string) {
        await this.click(this.addTestCaseBtn);
        await this.click(this.hiddenCBox);
        await this.click(this.clickTC);
        await this.fill(this.testCaseInput, i);
        await this.fill(this.testCaseOutput, o);
    }

    async createTC() {
        await this.click(this.addTestCaseBtn);
    }

    async deleteTC() {
        await this.click(this.deleteBtnTC);
    }

    async getExistingTC() {
        await this.page.waitForTimeout(4000);
        return await this.getInnerText(this.TCName);
    }
}
