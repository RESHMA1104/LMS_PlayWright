import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AddSimilarCourse extends BasePage {

    private SimilarCoure: Locator;
    private Category: Locator;
    private SelectCourse: Locator;
    private AvailableHierarchyLevels: Locator;
    private SelectedLevels: Locator;
    private Select_model: Locator;
    private Duplicatebtn: Locator;

    constructor(page: Page) {
        super(page);

        this.SimilarCoure = page.locator('//span[text()="Similar Courses"]');
        this.Category = page.locator('//label[text()="Filter by Category:"]/following-sibling::button');
        this.SelectCourse = page.locator('//label[text()="Select Course:"]/following-sibling::button');
        this.AvailableHierarchyLevels = page.locator("//label[@for='select-all-hierarchy']");
        this.SelectedLevels = page.locator('//label[text()="Select Course:"]/following::input[1]');
        this.Select_model = page.locator("//label[text()='Select All']");
        this.Duplicatebtn = page.locator("//button[text()='Cancel']/following-sibling::button");
    }

    async clicksimilarcousre() {
        await this.click(this.SimilarCoure);
    }

    async selectRadixDropdown(dropdown: Locator, optionText: string): Promise<void> {
        await dropdown.click();

        const option = this.page.getByRole("option", {
            name: optionText,
            exact: true
        });

        await expect(option).toBeVisible({ timeout: 15000 });
        await option.click();
    }

    async Selcatego(category: string) {
        await this.selectRadixDropdown(this.Category, category);
    }

    async SelCourse(course: string) {
        await this.selectRadixDropdown(this.SelectCourse, course);
    }

    async SelectALL() {
        await this.click(this.AvailableHierarchyLevels);
    }

    async duplicate() {
        await this.click(this.Duplicatebtn);
    }
}