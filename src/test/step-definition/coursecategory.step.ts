import { Then, When } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_finder";
import { logger } from "../../utils/logger";
import dyanamicsearchdata from "../../../test-data/dyanamicsearchdata.json";
import { EditReader, readEditData } from "../../utils/csvReader";

const searchValue = dyanamicsearchdata.searchCategory;
const successMsg = dyanamicsearchdata.courseCategorySuccessMsg;
const editData: EditReader[] = readEditData();

let deletedCourseCategoryName: string;

When(
    "The User Clicks on Course Category in Slider",
    async function (this: BugFinder) {
        logger.info("Clicking Course Category in the slider");

        await this.dynamicfieldmanagementPage.clickCourseCaetogrySlider();

        logger.info("Clicked Course Category in the slider successfully");
    }
);

When(
    "The User Clicks on Add Category Button in Course Management",
    async function (this: BugFinder) {
        logger.info(
            "Clicking the Add Category button in Course Management"
        );

        await this.dynamicfieldmanagementPage.clickAddCategoryBtn();

        logger.info("Clicked the Add Category button successfully");
    }
);

When(
    "The User Add Category Details such as category name and course name and description",
    async function (this: BugFinder, dataTable) {
        const categoryData = dataTable.rowsHash();

        logger.info(
            `Entering Course Category details - Category Name: ${categoryData.categoryname}, Course Name: ${categoryData.coursename}`
        );

        await this.dynamicfieldmanagementPage.fillCourseCategoryDetails(
            categoryData.categoryname,
            categoryData.coursename,
            categoryData.coursedescription
        );

        logger.info("Course Category details entered successfully");
    }
);

When(
    "The User clicks on Create category Button",
    async function (this: BugFinder) {
        logger.info("Clicking the Create Category button");

        await this.dynamicfieldmanagementPage.clickAddCategorySubmitBtn();

        logger.info("Clicked the Create Category button successfully");
    }
);

Then(
    "The User Should See a Category Success Message with Course ID",
    async function (this: BugFinder) {
        logger.info(
            `Verifying the Category success message: ${successMsg.Message}`
        );

        await this.dynamicfieldmanagementPage.assertSuccessCategory(
            successMsg.Message
        );

        logger.info(
            "Category success message with Course ID verified successfully"
        );
    }
);

When(
    "The User Enter the Search value in search Bar of Course Category",
    async function (this: BugFinder) {
        logger.info(
            `Entering "${searchValue.searchValue}" in the Course Category search bar`
        );

        await this.dynamicfieldmanagementPage.enterSearchValue(
            searchValue.searchValue
        );

        logger.info("Course Category search value entered successfully");
    }
);

Then(
    "The User Should be Show the Results based on Search value",
    async function (this: BugFinder) {
        logger.info(
            `Verifying search results for: ${searchValue.searchValue}`
        );

        await this.dynamicfieldmanagementPage.assertSearchResult(
            searchValue.searchValue
        );

        logger.info(
            `Search results verified successfully for: ${searchValue.searchValue}`
        );
    }
);

When(
    "The User Delete An Course Category From Search Resulted",
    async function (this: BugFinder) {
        logger.info("Deleting a Course Category from the search results");

        deletedCourseCategoryName =
            await this.dynamicfieldmanagementPage.clickDeleteBtn();

        logger.info(
            `Deleted Course Category Name: ${deletedCourseCategoryName}`
        );
    }
);

Then(
    "The Course Category Should Be Deleted",
    async function (this: BugFinder) {
        logger.info(
            `Verifying the Course Category was deleted: ${deletedCourseCategoryName}`
        );

        await this.dynamicfieldmanagementPage.deleteCheck(
            deletedCourseCategoryName,
            searchValue.searchValue
        );

        logger.info(
            `Verified deleted Course Category is not displayed: ${deletedCourseCategoryName}`
        );
    }
);

When(
    "the user clicks on Edit Option in Three Dot Menu",
    async function (this: BugFinder) {
        logger.info("Clicking the Edit option from the Three Dot menu");

        await this.dynamicfieldmanagementPage.clickThreedotEdit();

        logger.info("Clicked the Edit option successfully");
    }
);

When(
    "the User Enter The Category and Course name",
    async function (this: BugFinder) {
        for (const edit of editData) {
            logger.info(
                `Editing Category Name: ${edit.categoryname}, Course Name: ${edit.coursename}`
            );

            await this.dynamicfieldmanagementPage.editDetails(
                edit.categoryname,
                edit.coursename,
                edit.description
            );
        }

        logger.info("Course Category details edited successfully");
    }
);

When(
    "Clicks on update Category",
    async function (this: BugFinder) {
        logger.info("Clicking the Update Category button");

        await this.dynamicfieldmanagementPage.clickUpdateCourse();

        logger.info("Clicked the Update Category button successfully");
    }
);

Then(
    "The user should notified with success Message",
    async function (this: BugFinder) {
        for (const edit of editData) {
            logger.info(
                `Verifying edit success message: ${edit.successmessage}`
            );

            await this.dynamicfieldmanagementPage.editSuccessMsg(
                edit.successmessage
            );
        }

        logger.info("Edit success message verified successfully");
    }
);