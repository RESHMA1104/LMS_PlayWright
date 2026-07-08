import { When, Then } from '@cucumber/cucumber';
import { BugFinder } from '../../world/bug_finder';
import { ExcelReader } from '../../utils/excelReader';
import { logger } from '../../utils/logger';

import path from 'path';


When('the user clicks the Add Course button', async function (this: BugFinder) {

    try {
        logger.info('Clicking Add Course button');
        await this.addCoursePage.clickAddCourse();
        logger.info('Add Course button clicked successfully');

    }

    catch (error) {
        logger.error(`Failed to click Add Course button : ${error}`);

        throw error;

    }
});

When('the user clicks the Next button without entering course details', async function (this: BugFinder) {

    try {

        logger.info('Clicking Next button without entering course details');

        await this.addCoursePage.clickNext();

        logger.info('Next button clicked successfully');
    }

    catch (error) {

        logger.error(`Unable to click Next button : ${error}`);
        throw error;

    }

});


Then('a warning message should be displayed', async function (this: BugFinder) {

    try {

        logger.info('Validating mandatory field warning messages');

        await this.addCoursePage.validateWarningMessages();

        logger.info('Warning messages validated successfully');

    }

    catch (error) {
        logger.error(`Warning validation failed : ${error}`);
        throw error;
    }

});


When('the user selects dropdown-values from the dropdown', async function (this: BugFinder) {
    try {
        logger.info('Loading dropdown data from Excel');

        const filePath = path.resolve(process.cwd(), 'test-data/CourseData.xlsx');

        const data = ExcelReader.read(filePath, 'Sheet1') as any[];

        logger.info(`Loaded ${data.length} records from Excel`);


        for (const row of data) {
            const index = Number(row.DropdownIndex);

            const value = String(row.Value).trim();

            logger.info(`Dropdown Index : ${index}`);
            logger.info(`Dropdown Value : ${value}`);


            if (isNaN(index) || !value) {
                logger.error(`Invalid Excel Row : ${JSON.stringify(row)}`);

                throw new Error(`Invalid Excel Row : ${JSON.stringify(row)}`);
            }

            await this.addCoursePage.selectDropdown(index, value);
            logger.info(`Selected '${value}' from dropdown '${index}'`);

        }

        logger.info('Dropdown selection completed successfully');
    }
    catch (error) {
        logger.error(`Dropdown selection failed : ${error}`);
        throw error;
    }

});


When('the user clicks the Next button', async function (this: BugFinder) {
    try {
        logger.info('Clicking Next button');

        await this.addCoursePage.clickNext();

        logger.info('Next button clicked successfully');

    }

    catch (error) {
        logger.error(`Failed to click Next button : ${error}`);

        throw error;

    }

});


Then('the user should navigate to the Course Hierarchy section', async function (this: BugFinder) {

    try {

        logger.info('Validating Course Hierarchy section');

        await this.addCoursePage.validateNextPage();

        logger.info('Successfully navigated to Course Hierarchy section');

    }

    catch (error) {
        logger.error(`Course Hierarchy validation failed : ${error}`);

        throw error;

    }
});