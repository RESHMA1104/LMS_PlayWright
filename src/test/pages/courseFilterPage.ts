import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CourseFilter extends BasePage {
  private txtSearch: Locator;
  private courseNames: Locator;
  private coursemangement: Locator;
  private courseCodes:Locator;
  constructor(page: Page) {
    super(page);

    this.txtSearch = page.locator(
      "//input[@placeholder='Search courses, codes, clients, or categories...']",
    );
    this.courseNames = page.locator("//table/tbody/tr/td[3]//button/span[1]");4
    this.courseCodes = page.locator("//table/tbody/tr/td[3]//button/span[2]");
    this.coursemangement = page.locator("//div[@title='Course Management']");
  }

  async enterSearchKeyword(keyword: string) {
    await this.clear(this.txtSearch);
    await this.fill(this.txtSearch, keyword);
  }
  async clickCourse() {
    await this.click(this.coursemangement);
  }
  async verifySearchResults(keyword: string) {
    // Wait until the loading animation disappears
    await this.page.locator(".animate-pulse").first().waitFor({
      state: "hidden",
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
        timeout: 30000
    });

    const codes = await this.courseCodes.allInnerTexts();

    console.log(codes);

    expect(codes.length).toBeGreaterThan(0);

    for (const code of codes) {
        expect(code.toLowerCase()).toContain(keyword.toLowerCase());
    }
}
}
