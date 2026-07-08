import { Given, When, Then } from '@cucumber/cucumber';
import { BugFinder } from '../../world/bug_finder';
import { ExcelReader } from '../../utils/excelReader';
import { logger } from '../../utils/logger';
import path from 'path';

When('the user clicks the Add Course button', async function (this: BugFinder) {
  try {
    logger.info('Clicking Add Course button');

    await this.addCoursePage.clickAddCourse();

    logger.info('Add Course button clicked successfully');
  } catch (error) {
    logger.error(`Failed to click Add Course button : ${error}`);
    throw error;
  }
});

When('the user clicks the Next button without entering course details', async function (this: BugFinder) {
  try {
    logger.info('Clicking Next button without entering course details');

    await this.addCoursePage.clickNext();

    logger.info('Next button clicked successfully');
  } catch (error) {
    logger.error(`Unable to click Next button : ${error}`);
    throw error;
  }
});

Then('a warning message should be displayed', async function (this: BugFinder) {
  try {
    logger.info('Validating warning messages');

    await this.addCoursePage.validateWarningMessages();

    logger.info('Warning messages validated successfully');
  } catch (error) {
    logger.error(`Warning validation failed : ${error}`);
    throw error;
  }
});

When('the user selects dropdown-values from the dropdown', async function (this: BugFinder) {
  try {
    logger.info('Loading basic configuration data from Excel');

    const filePath = path.resolve(process.cwd(), 'test-data/CourseData.xlsx');
    const data = ExcelReader.read(filePath, 'Sheet1') as any[];

    for (const row of data) {
      const index = Number(row.DropdownIndex);
      const value = String(row.Value).trim();

      if (isNaN(index) || !value) {
        throw new Error(`Invalid Excel Row : ${JSON.stringify(row)}`);
      }

      await this.addCoursePage.selectDropdown(index, value);

      logger.info(`Selected '${value}' from dropdown index '${index}'`);
    }

    logger.info('Basic configuration dropdown selection completed');
  } catch (error) {
    logger.error(`Dropdown selection failed : ${error}`);
    throw error;
  }
});

When('the user clicks the Next button', async function (this: BugFinder) {
  try {
    logger.info('Clicking Next button');

    await this.addCoursePage.clickNext();

    logger.info('Next button clicked successfully');
  } catch (error) {
    logger.error(`Failed to click Next button : ${error}`);
    throw error;
  }
});

Then('the user should navigate to the Course Hierarchy section', async function (this: BugFinder) {
  try {
    logger.info('Validating Course Hierarchy section');

    await this.addCoursePage.validateNextPage();

    logger.info('Course Hierarchy section displayed successfully');
  } catch (error) {
    logger.error(`Course Hierarchy validation failed : ${error}`);
    throw error;
  }
});

Given('the user has completed the course basic configuration', async function (this: BugFinder) {
  try {
    logger.info('Completing course basic configuration');

    const filePath = path.resolve(process.cwd(), 'test-data/CourseData.xlsx');
    const data = ExcelReader.read(filePath, 'Sheet1') as any[];

    for (const row of data) {
      const index = Number(row.DropdownIndex);
      const value = String(row.Value).trim();

      if (isNaN(index) || !value) {
        throw new Error(`Invalid Excel Row : ${JSON.stringify(row)}`);
      }

      await this.addCoursePage.selectDropdown(index, value);
    }

    await this.addCoursePage.clickNext();
    await this.addCoursePage.validateNextPage();

    logger.info('Course basic configuration completed successfully');
  } catch (error) {
    logger.error(`Course basic configuration failed : ${error}`);
    throw error;
  }
});

Given('the user is on the Course Hierarchy section', async function (this: BugFinder) {
  try {
    logger.info('Validating user is on Course Hierarchy section');

    await this.addCoursePage.validateNextPage();

    logger.info('User is on Course Hierarchy section');
  } catch (error) {
    logger.error(`Course Hierarchy section not visible : ${error}`);
    throw error;
  }
});

When('the user selects pedagogy values for I Do, We Do, and You Do', async function (this: BugFinder) {
  try {
    logger.info('Loading pedagogy data from Excel');

    const filePath = path.resolve(process.cwd(), 'test-data/CourseData.xlsx');
    const data = ExcelReader.read(filePath, 'Sheet2') as any[];

    for (const row of data) {
      const index = Number(row.DropdownIndex);
      const value = String(row.Value).trim();

      if (isNaN(index) || !value) {
        throw new Error(`Invalid Excel Row : ${JSON.stringify(row)}`);
      }

      await this.addCoursePage.selectMultiDropdownPedagogy(index, value);

      logger.info(`Selected pedagogy '${value}' from dropdown index '${index}'`);
    }

    logger.info('Pedagogy values selected successfully');
  } catch (error) {
    logger.error(`Pedagogy selection failed : ${error}`);
    throw error;
  }
});

Then('the selected pedagogy values should be displayed correctly', async function (this: BugFinder) {
  try {
    logger.info('Validating selected pedagogy values');

    const filePath = path.resolve(process.cwd(), 'test-data/CourseData.xlsx');
    const data = ExcelReader.read(filePath, 'Sheet2') as any[];

    for (const row of data) {
      const value = String(row.Value).trim();

      await this.addCoursePage.validatePedagogyValue(value);

      logger.info(`Validated pedagogy value '${value}'`);
    }

    logger.info('All pedagogy values validated successfully');
  } catch (error) {
    logger.error(`Pedagogy validation failed : ${error}`);
    throw error;
  }
});