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
  private clearFilter: Locator;

  // Pagination Locators
  private btnPrevious: Locator;
  private btnNext: Locator;
  private filterPanelIndicator:Locator;
  //private activePage: Locator;

  constructor(page: Page) {
    super(page);

    this.txtSearch = page.locator("//input[@placeholder='Search courses, codes, clients, or categories...']");
    this.courseNames = page.locator("//table/tbody/tr/td[3]//button/span[1]");
    this.courseCodes = page.locator("//table/tbody/tr/td[3]//button/span[2]");
    this.courseManagement = page.locator("//div[@title='Course Management']");
    this.txtNoResult = page.locator("//p[contains(@class,'font-medium')]");
    this.filterBtn = this.page.getByRole("button", { name: "Filters" });
    this.courseDetails = page.locator("//table/tbody/tr/td[4]");
    this.tableRows = page.locator("//table/tbody/tr");
    this.lblPagination = page.locator("//div[contains(text(),'Showing')]");
    this.clearFilter = page.getByRole("button", {name: "Clear All",exact: true});
    this.filterPanelIndicator = page.locator("//label[text()='Status']/following::select[1]");
    // Pagination
    this.btnPrevious = page.locator("//button[normalize-space()='Previous']");
    this.btnNext = page.locator("//button[normalize-space()='Next']");
    //this.activePage = page.locator("//button[normalize-space()='Next']/preceding::span[text()='1'][1]");
    //this.activePage = page.locator("//span[contains(@class,'font-semibold')]");
  }

  async clickCourse() {
    await this.click(this.courseManagement);
  }

  async enterSearchKeyword(keyword: string) {
    await this.clear(this.txtSearch);
    await this.fill(this.txtSearch, keyword);
  }

  async verifySearchResults(keyword: string) {
    await expect(this.courseNames.first()).toBeVisible({timeout: 30000,});
    const courses = await this.courseNames.allInnerTexts();
    console.log(courses);
    expect(courses.length).toBeGreaterThan(0);
    for (const course of courses) {
      expect(course.toLowerCase()).toContain(keyword.toLowerCase());
    }
  }

  async verifyCourseCodes(keyword: string) {
    await expect(this.courseCodes.first()).toBeVisible({timeout: 30000,});
    const codes = await this.courseCodes.allInnerTexts();
    console.log(codes);
    expect(codes.length).toBeGreaterThan(0);
    for (const code of codes) {
      expect(code.toLowerCase()).toContain(keyword.toLowerCase());
    }
  }

  async verifyNoSearchResults(expectedMessage: string) {
    await expect(this.txtNoResult).toBeVisible({timeout: 30000,});
    await expect(this.txtNoResult).toHaveText(expectedMessage);
  }


async clickfilter() {
  console.log("Ensuring Filter panel is open...");
  await expect(this.filterBtn).toBeVisible({ timeout: 30000 });
  await expect(this.filterBtn).toBeEnabled();

  const isOpen = await this.filterPanelIndicator.isVisible().catch(() => false);
  if (!isOpen) {
    await this.filterBtn.click();
  }

  // Retrying assertion — guarantees panel is truly ready regardless of the click path taken
  await expect(this.filterPanelIndicator).toBeVisible({ timeout: 30000 });
  await expect(this.clearFilter).toBeVisible({ timeout: 30000 });
}

async clickclearfilter() {
  await expect(this.clearFilter).toBeVisible({ timeout: 30000 });
  await this.clearFilter.click();

  // If the app doesn't auto-close the panel after Clear All, force-close it
  const closed = await this.filterPanelIndicator
    .waitFor({ state: "hidden", timeout: 3000 })
    .then(() => true)
    .catch(() => false);

  if (!closed) {
    await this.filterBtn.click();
    await expect(this.filterPanelIndicator).toBeHidden({ timeout: 10000 });
  }
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

  async verifyFilterResults(category: string, level: string) {
    await expect(this.courseDetails.first()).toBeVisible({timeout: 30000,});
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
    const endCount = Number(parts[3]);
    expect(tableCount).toBe(endCount);
  }

// ---------------- Pagination ----------------

async verifyPagination() {
  await expect(this.lblPagination).toBeVisible({timeout: 30000,});
}

async verifyRecordsPerPage(expectedCount: number) {
  const rows = await this.tableRows.count();
  expect(rows).toBeLessThanOrEqual(expectedCount);
}

async verifyPaginationCount() {
  const tableCount = await this.tableRows.count();
  const paginationText = await this.lblPagination.innerText();

  const match = paginationText.match(/(\d+)\s+to\s+(\d+)\s+of\s+(\d+)/i);
  if (!match) {
    throw new Error(`Could not parse pagination text: "${paginationText}"`);
  }

  const start = Number(match[1]);
  const end = Number(match[2]);
  const expectedRows = end - start + 1;

  expect(tableCount).toBe(expectedRows);
}
async verifyCurrentPageHighlighted(expectedPage: number) {
  const currentPage = this.page.locator(
    `//button[normalize-space(.)='${expectedPage}' and contains(@class,'bg-blue-600')]`
  );
  await expect(currentPage).toBeVisible({ timeout: 10000 });
}

async verifyPreviousNextButtons() {

  await expect(this.btnPrevious).toBeVisible();
  await expect(this.btnNext).toBeVisible();
  await expect(this.btnPrevious).toBeDisabled();
  await expect(this.btnNext).toBeEnabled();
}

async clickNextButton() {
  await expect(this.btnNext).toBeEnabled();
  await this.btnNext.click();
  await this.page.waitForLoadState("networkidle");
}

async clickPreviousButton() {
  await expect(this.btnPrevious).toBeEnabled();
  await this.btnPrevious.click();
  await this.page.waitForLoadState("networkidle");
}

async verifyStartingRecord(expectedStart: number) {

  const paginationText = await this.lblPagination.innerText();
  const parts = paginationText.split(" ");
  const actualStart = Number(parts[1]);
  expect(actualStart).toBe(expectedStart);
}
async verifyNextPageNavigation() {

    let expectedPage = 1;
    let expectedStart = 1;

    while (true) {

        await this.verifyCurrentPageHighlighted(expectedPage);
        await this.verifyStartingRecord(expectedStart);
        await this.verifyPaginationCount();

        console.log(`Page ${expectedPage}`);

        if (await this.btnNext.isDisabled()) {
            break;
        }

        await this.btnNext.click();

        expectedPage++;
        expectedStart += 8;

        await this.verifyCurrentPageHighlighted(expectedPage);
    }

    console.log("Pagination verified successfully.");
}
}