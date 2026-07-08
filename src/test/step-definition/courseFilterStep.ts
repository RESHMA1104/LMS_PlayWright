import { DataTable, When,Then} from "@cucumber/cucumber";
import { BugFinder } from './../../world/bug_finder';
import { ExcelReader } from "../../utils/excelReader";
Then('user navigate to course management page', async function (this:BugFinder) {
    await this.courseFilter.clickCourse();
});
When("User searches client with the following data", async function (this:BugFinder,dataTable: DataTable) {
    
    const data = dataTable.hashes();

    for (const row of data) {

        await this.courseFilter.enterSearchKeyword(row.keyword);
        
        await this.courseFilter.verifySearchResults(row.keyword);
    }
});
When("User searches codes with the following data", async function (this:BugFinder,dataTable: DataTable) {

    const data = dataTable.hashes();

    for (const row of data) {

        await this.courseFilter.enterSearchKeyword(row.keyword);
        await this.courseFilter.verifyCourseCodes(row.keyword);
    }
});
When("User searches invalid keyword with the following data",async function (this: BugFinder, dataTable: DataTable) {

    const data = dataTable.hashes();
    for (const row of data) {
      await this.courseFilter.enterSearchKeyword(row.keyword);
      await this.courseFilter.verifyNoSearchResults(row.result);

    }
});
When("User filters the courses using excel data", async function (this: BugFinder) {

    const filterData = ExcelReader.read("test-Data/CourseFilter.xlsx", "Filter");

    for (const row of filterData) {
        await this.courseFilter.clickfilter();
        await this.courseFilter.selectStatus(row.status);
        await this.courseFilter.selectCategory(row.category);
        await this.courseFilter.selectLevel(row.level);
        await this.courseFilter.selectSortBy(row.sortBy);
        await this.courseFilter.verifyFilterResults(row.category,row.level);
    }
});