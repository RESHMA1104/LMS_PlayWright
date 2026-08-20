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

    constructor(page: Page) {
        super(page);
        this.createQuestionBtn = page.locator('//button[text()=" Create Question"]');
        this.programmingQuestinBtn = page.locator('//button[text()=" Programming Question"]');
        this.categoryIF = page.locator('//input[@placeholder="e.g., Data Structures"]');
        this.difficultyDropDown = page.locator('//select');
        this.problemTitleIF = page.locator('//input[@placeholder="Type your problem title here..."]');
        this.problemDescription = page.locator('//textarea[@placeholder="Describe the problem clearly. Include input/output format and examples."]');
        this.testCaseInput = page.locator('//textarea[@placeholder="stdin..."]');
        this.testCaseOutput = page.locator('//textarea[@placeholder="expected stdout..."]');
        this.createQuestionsubmitBtn = page.locator('//button[text()="✓ Create Question"]');
        this.questionCreateSuccessMsg = page.locator('//div[text()="Question created successfully"]');
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

}
