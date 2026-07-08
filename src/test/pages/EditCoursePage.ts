import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class EditPage extends BasePage{
    readonly page : Page;
    readonly courseMgt : Locator;
    readonly searchbx : Locator;
    readonly editmenu : Locator;
    readonly editcrse : Locator;
    readonly crsclient : Locator;
    readonly servicemdl : Locator;
    readonly nextBtn : Locator;
    readonly previewUpdateBtn : Locator;
    readonly successMessage : Locator;

    constructor(page:Page){
        super(page);
        this.page = page;
        this.courseMgt = page.locator('//div[@title="Course Management"]');
        this.searchbx = page.locator('//input[@placeholder="Search courses, codes, clients, or categories..."]');
        this.editmenu = page.locator('(//span[text()="Bug-Finder"]/following::td/child::span/child::div/child::div)');
        this.editcrse = page.locator('//button[text()="Edit Course"]');
        this.crsclient = page.locator('//label[text()="Course Client"]//following::span[@data-slot="select-value"][1]');
        this.servicemdl = page.locator('//label[text()="Service Model"]//following::span[@data-slot="select-value"][1]');
        this.nextBtn = page.locator('//button[text()="Next"]');
        this.previewUpdateBtn = page.locator('//button[text()="Preview and Update"]');
        this.successMessage = page.locator("[role='status']");
    }

    async clickCourseManagement() {
        await this.click(this.courseMgt);
    }

    async searchCourse(courseName: string) {
        await this.fill(this.searchbx, courseName);
        await this.pressEnter(this.searchbx);
    }

    async openCourseActionsMenu() {
        await this.click(this.editmenu);
    }

    async selectEditOption() {
        await this.click(this.editcrse);
    }

    private async selectDropdownOption(trigger: Locator, value: string) {
        await this.click(trigger);
        const option = this.page.locator(`//div[@role="option"][normalize-space(text())="${value}"]`);
        await this.click(option);
    }

    async selectCourseClient(value: string) {
        await this.selectDropdownOption(this.crsclient, value);
    }

    async selectServiceModel(value: string) {
        await this.selectDropdownOption(this.servicemdl, value);
    }

    async updateCourseDetails(courseClient: string, serviceModel: string) {
        await this.selectCourseClient(courseClient);
        await this.selectServiceModel(serviceModel);
    }

    async clickNext() {
        await this.click(this.nextBtn);
    }

    async clickPreviewAndUpdate() {
        await this.click(this.previewUpdateBtn);
    }

    async verifyCourseUpdatedMessage(message: string) {
        await expect(this.successMessage).toBeVisible({ timeout: 20000 });
        await expect(this.successMessage).toContainText(message, { timeout: 20000 });
    }
}