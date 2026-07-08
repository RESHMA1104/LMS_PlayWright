import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CourseFilter extends BasePage {

    private txtSearch: Locator;
    private courseNames: Locator;
    private courseCodes: Locator;
    private courseManagement: Locator;
    private txtNoResult: Locator;
    private filterBtn: Locator;
    private courseDetails: Locator;

    constructor(page: Page) {
        super(page);

        this.txtSearch = page.locator("//input[@placeholder='Search courses, codes, clients, or categories...']");
        this.courseNames = page.locator("//table/tbody/tr/td[3]//button/span[1]");
        this.courseCodes = page.locator("//table/tbody/tr/td[3]//button/span[2]");
        this.courseManagement = page.locator("//div[@title='Course Management']");
        this.txtNoResult = page.locator("//p[contains(@class,'font-medium')]");
        this.filterBtn = page.locator("//button[normalize-space()='Filters']");
        this.courseDetails = page.locator("//table/tbody/tr/td[4]");
    }

    async clickCourse() {
        await this.click(this.courseManagement);
    }

    async enterSearchKeyword(keyword: string) {
        await this.clear(this.txtSearch);
        await this.fill(this.txtSearch, keyword);
    }

    async verifySearchResults(keyword: string) {

        await expect(this.courseNames.first()).toBeVisible({
            timeout: 30000
        });

        const courses = await this.courseNames.allInnerTexts();

        console.log(courses);

        expect(courses.length).toBeGreaterThan(0);

        for (const course of courses) {
            expect(course.toLowerCase()).toContain(keyword.toLowerCase());
        }
    }

    async verifyCourseCodes(keyword: string) {

        await expect(this.courseCodes.first()).toBeVisible({
            timeout: 30000
        });

        const codes = await this.courseCodes.allInnerTexts();

        console.log(codes);

        expect(codes.length).toBeGreaterThan(0);

        for (const code of codes) {
            expect(code.toLowerCase()).toContain(keyword.toLowerCase());
        }
    }

    async verifyNoSearchResults(expectedMessage: string) {

        await expect(this.txtNoResult).toBeVisible({
            timeout: 30000
        });

        await expect(this.txtNoResult).toHaveText(expectedMessage);
    }

    async clickfilter() {
        await this.click(this.filterBtn);
    }

    async selectStatus(status: string) {

        await this.page
            .locator("//label[text()='Status']/following::select[1]")
            .selectOption({ value: status });

        await this.page.waitForLoadState("networkidle");
    }

    async selectCategory(category: string) {

        await this.page
            .locator("//label[text()='Category']/following::select[1]")
            .selectOption({ value: category });

        await this.page.waitForLoadState("networkidle");
    }

    async selectLevel(level: string) {

        await this.page
            .locator("//label[text()='Level']/following::select[1]")
            .selectOption({ value: level });

        await this.page.waitForLoadState("networkidle");
    }

    async selectSortBy(sortBy: string) {

        await this.page
            .locator("//label[text()='Sort By']/following::select[1]")
            .selectOption({ value: sortBy });

        await this.page.waitForLoadState("networkidle");
    }

    async verifyFilterResults(category: string, level: string) {

        await expect(this.courseDetails.first()).toBeVisible({
            timeout: 30000
        });

        const details = await this.courseDetails.allInnerTexts();

        console.log(details);

        expect(details.length).toBeGreaterThan(0);

        for (const detail of details) {

            if (category.toLowerCase() !== "all") {
                expect(detail.toLowerCase()).toContain(category.toLowerCase());
            }

            if (level.toLowerCase() !== "all") {
                expect(detail.toLowerCase()).toContain(level.toLowerCase());
            }
        }
    }
}