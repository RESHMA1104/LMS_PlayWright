import { DataTable, When, Then } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_finder";
import { ExcelReader } from "../../utils/excelReader";
import { logger } from "../../utils/logger";

Then("user navigate to course management page", async function (this: BugFinder) {

    logger.info("Navigating to Course Management page");
    

    await this.courseFilter.clickCourse();

    logger.info("Successfully navigated to Course Management page");
});

When("User searches client with the following data", async function (this: BugFinder, dataTable: DataTable) {

    const data = dataTable.hashes();

    logger.info("Starting client search");

    for (const row of data) {

        logger.info(`Searching client: ${row.keyword}`);

        await this.courseFilter.enterSearchKeyword(row.keyword);
        await this.courseFilter.verifySearchResults(row.keyword);

        logger.info(`Search verification passed for: ${row.keyword}`);
    }
});

When("User searches codes with the following data", async function (this: BugFinder, dataTable: DataTable) {

    const data = dataTable.hashes();

    logger.info("Starting course code search");

    for (const row of data) {

        logger.info(`Searching course code: ${row.keyword}`);

        await this.courseFilter.enterSearchKeyword(row.keyword);
        await this.courseFilter.verifyCourseCodes(row.keyword);

        logger.info(`Course code verification passed for: ${row.keyword}`);
    }
});

When("User searches invalid keyword with the following data", async function (this: BugFinder, dataTable: DataTable) {

    const data = dataTable.hashes();

    logger.info("Starting invalid search verification");

    for (const row of data) {

        logger.info(`Searching invalid keyword: ${row.keyword}`);

        await this.courseFilter.enterSearchKeyword(row.keyword);
        await this.courseFilter.verifyNoSearchResults(row.result);

        logger.info(`Verified no results for: ${row.keyword}`);
    }
});
When("User filters the courses using excel data", async function (this: BugFinder) {

    logger.info("Reading filter data from Excel");

    const filterData = ExcelReader.read("test-Data/CourseFilter.xlsx", "Filter");

    for (const row of filterData) {

    logger.info(
        `Applying Filter -> Status: ${row.status}, Category: ${row.category}, Level: ${row.level}, SortBy: ${row.sortBy}`
    );

    await this.courseFilter.clickfilter();

    await this.courseFilter.selectStatus(row.status);
    await this.courseFilter.selectCategory(row.category);
    await this.courseFilter.selectLevel(row.level);
    await this.courseFilter.selectSortBy(row.sortBy);

    await this.courseFilter.verifyFilterResults(row.category, row.level);

    logger.info("Filter verification completed successfully");

    await this.courseFilter.clickfilter();
    await this.courseFilter.clickclearfilter();
}

    logger.info("All filter scenarios executed successfully");
});