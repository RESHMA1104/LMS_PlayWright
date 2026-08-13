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
    private updateCategoryBtn: Locator;
    private threeDotIcon: Locator;
    private deleteCategoryBtn: Locator;
    private deletingCoursename: Locator;
    private allCourseName: Locator;
    private module: Locator;
    private cofirmDelete: Locator;
    private editCategoryBtn: Locator;

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
        this.updateCategoryBtn = page.locator('//button[text()="Update Category"]');
        this.threeDotIcon = page.locator('(//button[@data-slot="dropdown-menu-trigger"])[4]');
        this.deleteCategoryBtn = page.locator('(//div[@role="menuitem"])[2]');
        this.editCategoryBtn = page.locator('(//div[@role="menuitem"])[1]');
        this.deletingCoursename = page.locator('//strong');
        this.allCourseName = page.locator('//td[@data-slot="table-cell"]/child::span/child::div/child::div/child::div');
        this.module = page.locator('//button[text()="Cancel"]');
        this.cofirmDelete = page.locator('//button[text()="Delete"]');

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



    async clickDeleteBtn() {
        await this.domClick(this.module);
        await this.threeDotIcon.click({ force: true });
        await this.domClick(this.deleteCategoryBtn);

        const deletedName = await this.getText(this.deletingCoursename);
        console.log("Deleted Course Category Name:", deletedName?.trim());
        await this.domClick(this.cofirmDelete);
        return deletedName?.trim() || "";
    }


    async deleteCheck(expectedName: string, value: string) {
        await this.page.reload();
        await this.page.waitForLoadState('networkidle');
        await this.courseCategory.waitFor({ state: 'visible', timeout: 120000 });
        await this.click(this.courseCategory);
        await this.page.waitForTimeout(3000);
        await this.fill(this.searchBarCategory, value);
        await this.pressEnter(this.searchBarCategory);
        await this.page.waitForTimeout(2000);
        await this.allCourseName.first().waitFor({ state: 'visible', timeout: 120000 });
        const courseNames = await this.allCourseName.allTextContents();

        for (const actualName of courseNames) {
            console.log("Available Course Name:", actualName.trim());
            expect(actualName.trim()).not.toBe(expectedName.trim());
        }
    }

    async clickThreedotEdit() {
        await this.click(this.threeDotIcon);
        await this.click(this.editCategoryBtn);

    }
    async editDetails(categoryname: string, coursename: string, description: string) {
        await this.clear(this.categoryName);
        await this.fill(this.categoryName, categoryname + Date.now().toString());
        await this.clear(this.courseName);
        await this.fill(this.courseName, coursename);
        await this.clear(this.categoryDescription);
        await this.fill(this.categoryDescription, description);
    }

    async clickUpdateCourse() {
        await this.click(this.updateCategoryBtn);
    }

    async editSuccessMsg(expected: string) {
        await this.toContainText(this.courseCategorySuccessMsg, expected);
    }

}