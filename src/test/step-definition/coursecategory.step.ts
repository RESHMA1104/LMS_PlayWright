import { Then, When } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_finder";
import { logger } from "../../utils/logger";

import dyanamicsearchdata from '../../../test-data/dyanamicsearchdata.json'


const searchValue = dyanamicsearchdata.searchCategory;
const successMsg = dyanamicsearchdata.courseCategorySuccessMsg;


let deletedCourseCategoryName: string;

When('The User Clicks on Course Category in Slider', async function (this: BugFinder) {
    await this.dynamicfieldmanagementPage.clickCourseCaetogrySlider();
});

When('The User Clicks on Add Category Button in Course Management', async function (this: BugFinder) {
    await this.dynamicfieldmanagementPage.clickAddCategoryBtn();
});

When('The User Add Category Details such as category name and course name and description', async function (this: BugFinder, dataTable) {
    const data = dataTable.rowsHash();

    await this.dynamicfieldmanagementPage.fillCourseCategoryDetails(
        data.categoryname,
        data.coursename,
        data.coursedescription
    );
});

When('The User clicks on Create category Button', async function (this: BugFinder) {
    await this.dynamicfieldmanagementPage.clickAddCategorySubmitBtn();
});

Then('The User Should See a Category Success Message with Course ID', async function (this: BugFinder) {
    await this.dynamicfieldmanagementPage.assertSuccessCategory(successMsg.Message);
});

When('The User Enter the Search value in search Bar of Course Category', async function (this: BugFinder) {
    await this.dynamicfieldmanagementPage.enterSearchValue(searchValue.searchValue);
});

Then('The User Should be Show the Results based on Search value', async function (this: BugFinder) {
    await this.dynamicfieldmanagementPage.assertSearchResult(searchValue.searchValue);
});

When('The User Delete An Course Category From Search Resulted', async function (this: BugFinder) {
    deletedCourseCategoryName = await this.dynamicfieldmanagementPage.clickDeleteBtn();

    logger.info(`Deleted Course Category Name: ${deletedCourseCategoryName}`);
});

Then('The Course Category Should Be Deleted', async function (this: BugFinder) {

    await this.dynamicfieldmanagementPage.deleteCheck(deletedCourseCategoryName, searchValue.searchValue);
    logger.info(`Verified deleted course category is not displayed: ${deletedCourseCategoryName}`);
  
When('The User Clicks on Course Category in Slider', async function (this: BugFinder) {
    await this.dynamicfieldmanagementPage.clickCourseCaetogrySlider();
});
When('The User Clicks on Add Category Button in Course Management', async function (this: BugFinder) {
    await this.dynamicfieldmanagementPage.clickAddCategoryBtn();
});
When('The User Add Category Details such as category name and course name and description', async function (this: BugFinder, dataTable) {
    const data = dataTable.rowsHash();
    await this.dynamicfieldmanagementPage.fillCourseCategoryDetails(data.categoryname, data.coursename, data.coursedescription);
});
When('The User clicks on Create category Button', async function (this: BugFinder) {
    await this.dynamicfieldmanagementPage.clickAddCategorySubmitBtn();
});
Then('The User Should See a Category Success Message with Course ID', async function (this: BugFinder) {
    await this.dynamicfieldmanagementPage.assertSuccessCategory(successMsg.Message);
});
When('The User Enter the Search value in search Bar of Course Category', async function (this: BugFinder) {
    await this.dynamicfieldmanagementPage.enterSearchValue(searchValue.searchValue);
});
Then('The User Should be Show the Results based on Search value', async function (this: BugFinder) {

    await this.dynamicfieldmanagementPage.assertSearchResult(searchValue.searchValue)
});