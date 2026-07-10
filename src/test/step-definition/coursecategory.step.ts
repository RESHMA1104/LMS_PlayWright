import { Then, When } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_finder";
import { logger } from "../../utils/logger";
import dyanamicsearchdata from "../../../test-data/dyanamicsearchdata.json";

const searchValue = dyanamicsearchdata.searchCategory;
const successMsg = dyanamicsearchdata.courseCategorySuccessMsg;


let deletedCourseCategoryName: string;

When("The User Clicks on Course Category in Slider", async function (this: BugFinder) {
    logger.info("Clicking Course Category in the slider");

    await this.dynamicfieldmanagementPage.clickCourseCaetogrySlider();

    logger.info("Clicked Course Category in the slider successfully");
});

When("The User Clicks on Add Category Button in Course Management", async function (this: BugFinder) {
    logger.info("Clicking the Add Category button in Course Management");

    await this.dynamicfieldmanagementPage.clickAddCategoryBtn();

    logger.info("Clicked the Add Category button successfully");
});

When(
    "The User Add Category Details such as category name and course name and description",
    async function (this: BugFinder, dataTable) {
        const data = dataTable.rowsHash();

        logger.info(
            `Entering course category details — Category Name: ${data.categoryname}, Course Name: ${data.coursename}`
        );

        await this.dynamicfieldmanagementPage.fillCourseCategoryDetails(
            data.categoryname,
            data.coursename,
            data.coursedescription
        );

        logger.info("Course category details entered successfully");
    }
);

When("The User clicks on Create category Button", async function (this: BugFinder) {
    logger.info("Clicking the Create Category button");

    await this.dynamicfieldmanagementPage.clickAddCategorySubmitBtn();

    logger.info("Clicked the Create Category button successfully");
});

Then("The User Should See a Category Success Message with Course ID", async function (this: BugFinder) {
    logger.info(`Verifying the category success message: ${successMsg.Message}`);

    await this.dynamicfieldmanagementPage.assertSuccessCategory(successMsg.Message);

    logger.info("Category success message with Course ID verified successfully");
});

When("The User Enter the Search value in search Bar of Course Category", async function (this: BugFinder) {
    logger.info(`Entering "${searchValue.searchValue}" in the Course Category search bar`);

    await this.dynamicfieldmanagementPage.enterSearchValue(searchValue.searchValue);

    logger.info("Course Category search value entered successfully");
});

Then("The User Should be Show the Results based on Search value", async function (this: BugFinder) {
    logger.info(`Verifying search results for: ${searchValue.searchValue}`);

    await this.dynamicfieldmanagementPage.assertSearchResult(searchValue.searchValue);

    logger.info(`Search results verified successfully for: ${searchValue.searchValue}`);
});

When("The User Delete An Course Category From Search Resulted", async function (this: BugFinder) {
    logger.info("Deleting a course category from the search results");

    deletedCourseCategoryName = await this.dynamicfieldmanagementPage.clickDeleteBtn();

    logger.info(`Deleted Course Category Name: ${deletedCourseCategoryName}`);
});

Then("The Course Category Should Be Deleted", async function (this: BugFinder) {
    logger.info(`Verifying that the course category was deleted: ${deletedCourseCategoryName}`);
    await this.dynamicfieldmanagementPage.deleteCheck(
        deletedCourseCategoryName,
        searchValue.searchValue
    );

    logger.info(
        `Verified deleted course category is not displayed: ${deletedCourseCategoryName}`
    );
});
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

    await this.dynamicfieldmanagementPage.assertSearchResult(searchValue.searchValue);
});