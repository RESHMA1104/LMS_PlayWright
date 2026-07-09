import { expect, type Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DynamicFieldManagement extends BasePage {
    private courseCategory: Locator;
    private addCatogoryBtn: Locator;
    private categoryName: Locator;
    private courseName: Locator;
    private categoryDescription: Locator;
    private createCategoryBtn: Locator;
    private courseCategorySuccessMsg: Locator;
    private searchBarCategory: Locator;
    private searchResultsCategory: Locator;

    constructor(page: Page) {
        super(page);
        this.courseCategory = page.locator('//button[text()="Course Category"]');
        this.addCatogoryBtn = page.locator('//button[text()="Add Category"]');
        this.categoryName = page.locator('//input[@placeholder="Enter category name"]');
        this.courseName = page.locator('//input[@placeholder="Type course name and press Enter..."]');
        this.categoryDescription = page.locator('//textarea[@placeholder="Enter category description"]');
        this.createCategoryBtn = page.locator('//button[text()="Create Category"]');
        this.courseCategorySuccessMsg = page.locator('//h2[text()="Category Created Successfully"]');
        this.searchBarCategory = page.locator('//input[@placeholder="Search by name, description, code or courses..."]');
        this.searchResultsCategory = page.locator('(//td[@data-slot="table-cell"])[1]/child::span/child::div/child::div/child::div');

    }

    async clickCourseCaetogrySlider() {
        await this.click(this.courseCategory);
    }

    async clickAddCategoryBtn() {
        await this.click(this.addCatogoryBtn);
    }

    async fillCourseCategoryDetails(categoryname: string, coursename: string, coursedescription: string) {
        await this.fill(this.categoryName, categoryname + Date.now());
        await this.fill(this.courseName, coursename);
        await this.fill(this.categoryDescription, coursedescription);
    }

    async clickAddCategorySubmitBtn() {
        await this.click(this.createCategoryBtn);
    }

    async assertSuccessCategory(successMsg: string) {
        await this.toContainText(this.courseCategorySuccessMsg, successMsg);
    }
    async enterSearchValue(value: string) {
        await this.fill(this.searchBarCategory, value);
        await this.pressEnter(this.searchBarCategory);
    }
    async assertSearchResult(value: string) {
        await this.toContainText(this.searchResultsCategory, value)
    }

}