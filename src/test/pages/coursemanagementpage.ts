import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";


export class CourseManagementPage extends BasePage {
    readonly page: Page;
    readonly searchBarCM: Locator;
    readonly AddCourseStructureBtn: Locator;


    constructor(page: Page) {
        super(page);
        this.page = page;
        this.searchBarCM = page.locator('//input[@data-slot="input"]');
        this.AddCourseStructureBtn = page.locator('(//span[text()="Bug-Finder"]/following::td/child::span/child::div/child::button)[1]');

    }

    async enterSearchValue(value: string) {
        await this.fill(this.searchBarCM, value);
        await this.pressEnter(this.searchBarCM);
    }

    async clickAddCouresStructure() {
        await this.click(this.AddCourseStructureBtn);
    }

    async assertCourseManagementUrl(url: string) {
        const currentUrl = await this.getUrl(this.page);
        expect(currentUrl).toContain(url);
    }
}