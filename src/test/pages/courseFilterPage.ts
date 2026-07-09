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
  private tableRows: Locator;
  private lblPagination: Locator;
  private clearFilter:Locator;

  constructor(page: Page) {
    super(page);

    this.txtSearch = page.locator(
      "//input[@placeholder='Search courses, codes, clients, or categories...']",
    );
    this.courseNames = page.locator("//table/tbody/tr/td[3]//button/span[1]");
    this.courseCodes = page.locator("//table/tbody/tr/td[3]//button/span[2]");
    this.courseManagement = page.locator("//div[@title='Course Management']");
    this.txtNoResult = page.locator("//p[contains(@class,'font-medium')]");
    this.filterBtn = page.locator("//button[normalize-space()='Filters']");
    this.courseDetails = page.locator("//table/tbody/tr/td[4]");
    this.tableRows = page.locator("//table/tbody/tr");
    this.lblPagination = page.locator("//div[contains(text(),'Showing')]");
    this.clearFilter=page.locator("//button[normalize-space()='Clear All']");
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
      timeout: 30000,
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
      timeout: 30000,
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
      timeout: 30000,
    });

    await expect(this.txtNoResult).toHaveText(expectedMessage);
  }
async clickfilter() {

    await this.filterBtn.waitFor({
        state: "visible"
    });

    await this.filterBtn.scrollIntoViewIfNeeded();

    await expect(this.filterBtn).toBeEnabled();

    await this.filterBtn.click({
        trial: true
    });

    await this.filterBtn.click();

    await expect(this.clearFilter).toBeVisible({
        timeout: 10000
    });
}
async selectStatus(status: string) {
    const statusDD = this.page.locator("//label[text()='Status']/following::select[1]");
    await this.selectDDOptionByValue(statusDD, status);
}

async selectCategory(category: string) {
    const categoryDD = this.page.locator("//label[text()='Category']/following::select[1]");
    await this.selectDDOptionByValue(categoryDD, category);
}

async selectLevel(level: string) {
    const levelDD = this.page.locator("//label[text()='Level']/following::select[1]");
    await this.selectDDOptionByValue(levelDD, level);
}

async selectSortBy(sortBy: string) {
    const sortDD = this.page.locator("//label[text()='Sort By']/following::select[1]");
    await this.selectDDOptionByValue(sortDD, sortBy);
}

async clickclearfilter() {

    await this.clearFilter.waitFor({ state: "visible" });
    await this.clearFilter.click();

    await this.page.waitForTimeout(1000);
}
  

  async verifyFilterResults(category: string, level: string) {
    await expect(this.courseDetails.first()).toBeVisible({
      timeout: 30000,
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
    const tableCount = await this.tableRows.count();

    const paginationText = await this.lblPagination.innerText();

    const parts = paginationText.split(" ");

    const endCount = Number(parts[3]); // 8

    expect(tableCount).toBe(endCount);
  }

}
