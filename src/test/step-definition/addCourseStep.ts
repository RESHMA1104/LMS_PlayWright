import { Given, When, Then } from '@cucumber/cucumber';
import { BugFinder } from '../../world/bug_finder';
import { ExcelReader } from '../../utils/excelReader';
import { logger } from '../../utils/logger';
import path from 'path';
import { JsonReader } from '../../utils/jsonReader';

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

When(
  'the user clicks the Next button without entering course details',
  async function (this: BugFinder) {
    try {
      logger.info('Clicking Next button without entering course details');

      await this.addCoursePage.clickNext();

      logger.info('Next button clicked successfully');
    } catch (error) {
      logger.error(`Unable to click Next button : ${error}`);
      throw error;
    }
  }
);

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

When(
  'the user selects dropdown-values from the dropdown',
  async function (this: BugFinder) {
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
  }
);

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

Then(
  'the user should navigate to the Course Hierarchy section',
  async function (this: BugFinder) {
    try {
      logger.info('Validating Course Hierarchy section');

      await this.addCoursePage.validateNextPage();

      logger.info('Course Hierarchy section displayed successfully');
    } catch (error) {
      logger.error(`Course Hierarchy validation failed : ${error}`);
      throw error;
    }
  }
);

Given(
  'the user has completed the course basic configuration',
  async function (this: BugFinder) {
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
  }
);

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

When(
  'the user selects pedagogy values for I Do, We Do, and You Do',
  async function (this: BugFinder) {
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
  }
);

Then(
  'the selected pedagogy values should be displayed correctly',
  async function (this: BugFinder) {
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
  }
);

Then(
  'the user is leaves mandatory fields as empty and click the preview & create button',
  async function (this: BugFinder) {
    try {
      logger.info('Click the preview & Create button');

      await this.addCoursePage.click_preview_create();
      await this.addCoursePage.invalid_prview_create();
    } catch (error) {
      logger.error('The Error message is not shown');
      throw error;
    }
  }
);

Then(
  'the user uploads the invalid images it need to show an invalid image format',
  async function () {
    await this.addCoursePage.invalid_image();
  }
);

When(
  'the user add the pedagogy values for I Do,We Do and you Do',
  async function (this: BugFinder) {
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
  }
);

When(
  'the user selects Resource type values for I Do, We Do and You Do',
  async function (this: BugFinder) {
    const data = JsonReader.read('resourceTypes');

    for (const resource of data.resourceTypes) {
      await this.addCoursePage.resourceTypeAdd(resource.buttons, resource.resourceName);
    }
  }
);

Then('the select Resource Type value should be on state', async function (this: BugFinder) {
  await this.addCoursePage.validateResourceTypeOnState();
});

// ---- Newly added steps to complete the End-to-End scenario ----

When('the user adds the course level', async function (this: BugFinder) {
  try {
    logger.info('Loading course level data from Excel Sheet3');

    const filePath = path.resolve(process.cwd(), 'test-data/CourseData.xlsx');
    const data = ExcelReader.read(filePath, 'Sheet3') as any[];

    for (const row of data) {
      const index = Number(row.DropdownIndex);
      const value = String(row.Value).trim();

      if (isNaN(index) || !value) {
        throw new Error(`Invalid Excel Row : ${JSON.stringify(row)}`);
      }

      await this.addCoursePage.selectCourseLevel(index, value);

      logger.info(`Selected course level '${value}' from dropdown index '${index}'`);
    }

    logger.info('Course level selected successfully');
  } catch (error) {
    logger.error(`Course level selection failed : ${error}`);
    throw error;
  }
});

When('the user uploads the course image', async function (this: BugFinder) {
  try {
    logger.info('Uploading a valid course image');

    await this.addCoursePage.uploadCourseImage('batman.jpg');

    logger.info('Course image uploaded successfully');
  } catch (error) {
    logger.error(`Course image upload failed : ${error}`);
    throw error;
  }
});

When('the user enters the course description', async function (this: BugFinder) {
  try {
    logger.info('Entering course description');

    // TODO: replace with a real data source (Excel/JSON) if needed.
    await this.addCoursePage.enterCourseDescription(
      'This is an automated test course description.'
    );

    logger.info('Course description entered successfully');
  } catch (error) {
    logger.error(`Entering course description failed : ${error}`);
    throw error;
  }
});

When('the user chooses the course hierarchy', async function (this: BugFinder) {
  try {
    logger.info('Selecting course hierarchy (module, submodule, topic)');

    await this.addCoursePage.selectCourseHierarchy();

    logger.info('Course hierarchy selected successfully');
  } catch (error) {
    logger.error(`Course hierarchy selection failed : ${error}`);
    throw error;
  }
});

When('the user chooses the skill set', async function (this: BugFinder) {
  try {
    logger.info('Selecting skill set');

    const data = JsonReader.read('resourceTypes');

    await this.addCoursePage.selectSkillSet(data.skillSet.indices);

    logger.info('Skill set selected successfully');
  } catch (error) {
    logger.error(`Skill set selection failed : ${error}`);
    throw error;
  }
});

When('the user clicks preview & create', async function (this: BugFinder) {
  try {
    logger.info('Clicking Preview & Create button');

    await this.addCoursePage.click_preview_create();

    logger.info('Preview & Create button clicked successfully');
  } catch (error) {
    logger.error(`Failed to click Preview & Create button : ${error}`);
    throw error;
  }
});

Then('the course layout preview should be visible', async function (this: BugFinder) {
  try {
    logger.info('Validating course layout preview is visible');

    await this.addCoursePage.validateCourseLayoutPreview();

    logger.info('Course layout preview is visible');
  } catch (error) {
    logger.error(`Course layout preview validation failed : ${error}`);
    throw error;
  }
});

When('the user clicks the save course layout button', async function (this: BugFinder) {
  try {
    logger.info('Clicking Save Course Layout button');

    await this.addCoursePage.clickSaveCourseLayout();

    logger.info('Save Course Layout button clicked successfully');
  } catch (error) {
    logger.error(`Failed to click Save Course Layout button : ${error}`);
    throw error;
  }
});

When('the user clicks "Yes, Add now" to confirm', async function (this: BugFinder) {
  try {
    logger.info('Confirming course creation via "Yes, Add now"');

    await this.addCoursePage.confirmAddCourse();

    logger.info('Course creation confirmed successfully');
  } catch (error) {
    logger.error(`Failed to confirm course creation : ${error}`);
    throw error;
  }
});