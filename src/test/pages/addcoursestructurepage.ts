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
    async clickAddModuleSubmit() {
        await this.click(this.AddModuleSubmitBtn);
    }
    async assertModuleSuccessMsg() {
        await this.toContainText(this.moduleSuccessMsg, "Operation completed successfully!")
    }
}