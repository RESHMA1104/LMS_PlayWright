import { DataTable, When,Then} from "@cucumber/cucumber";
import { BugFinder } from './../../world/bug_finder';

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