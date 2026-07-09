import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";


export class AddCorseStructurePage extends BasePage {
    private addModuleBtn: Locator;
    private moduleTitle: Locator;
    private moduleDescription: Locator;
    private moduleSkillone: Locator;
    private moduleSelectAllSkill: Locator;
    private moduleSkillTwo: Locator;
    private AddModuleSubmitBtn: Locator;
    private moduleSuccessMsg: Locator;
    private moreDropDown: Locator;
    private hierarchyToogle: Locator;
    private addSubModuleBtn: Locator;
    private addNewTopicBtn: Locator;
    private topicTitle: Locator;
    private topicDescription: Locator;


    constructor(page: Page) {
        super(page);
        this.page = page;
        this.addModuleBtn = page.locator('//button[@title="Add module"]');
        this.moduleTitle = page.locator('//textarea[@placeholder="Enter title..."]');
        this.moduleDescription = page.locator('//textarea[@placeholder="Brief description ..."]');
        this.moduleSkillone = page.locator('(//input[@type="checkbox"])[2]');
        this.moduleSelectAllSkill = page.locator('(//input[@type="checkbox"])[4]');
        this.moduleSkillTwo = page.locator('(//input[@type="checkbox"])[8]');
        this.AddModuleSubmitBtn = page.locator('//button[@type="submit"]');
        this.moduleSuccessMsg = page.locator('//span[normalize-space()="Operation completed successfully!"]')
        this.moreDropDown = page.locator('//span[text()="More"]');
        this.hierarchyToogle = page.locator('(//div[@class="relative"])[2]');
        this.addSubModuleBtn = page.locator('(//button[@title="Add New Sub Module"])[3]');
        this.addNewTopicBtn = page.locator('(//button[@title="Add New Topic"])[3]');
        this.topicTitle = page.locator("//div[@role='dialog']//textarea[@placeholder='Enter title...']");
        this.topicDescription = page.locator("//textarea[@placeholder='Brief description ...']")


    }

    async clickAddModuleBtn() {
        await this.click(this.addModuleBtn);
    }

    async fillForm(title: string, description: string) {
        await this.fill(this.moduleTitle, title);
        await this.fill(this.moduleDescription, description);
        await this.checkTheBox(this.moduleSkillone);
        await this.checkTheBox(this.moduleSelectAllSkill);
        await this.checkTheBox(this.moduleSkillTwo);

    }
    async fillTopicForm(title: string, description: string) {
        await this.fill(this.topicTitle, title);
        await this.fill(this.topicDescription, description);
        await this.checkTheBox(this.moduleSkillone);
        await this.checkTheBox(this.moduleSelectAllSkill);
        await this.checkTheBox(this.moduleSkillTwo);
    }
    async clickAddModuleSubmit() {
        await Promise.all([
            expect(this.moduleSuccessMsg).toBeVisible({ timeout: 360000 }),
            this.click(this.AddModuleSubmitBtn)
        ]);
    }
    async assertModuleSuccessMsg() {

        await expect(this.moduleSuccessMsg).toBeHidden({ timeout: 360000 });
    }
    async clickMoreAndToogleHierarchBtn() {
        await this.domClick(this.moreDropDown);
        await this.domClick(this.hierarchyToogle);
        await this.page.mouse.move(500, 300);
        await this.page.mouse.click(500, 300);
    }

    async clickAddSubModuleButton() {
        await this.click(this.addModuleBtn);
    }

    async clickAddNewTopicBtn() {
        await this.click(this.addNewTopicBtn);
    }
}