import { When, Then } from '@cucumber/cucumber';
import { BugFinder } from '../../world/bug_finder';
import { ExcelReader } from '../../utils/excelReader';
import path from 'path';

When('the user clicks the Add Course button', async function (this: BugFinder) {
  await this.addCoursePage.clickAddCourse();
});

When('the user clicks the Next button without entering course details', async function (this: BugFinder) {
  await this.addCoursePage.clickNext();
});

Then('a warning message should be displayed', async function (this: BugFinder) {
  await this.addCoursePage.validateWarningMessages();
});

When('the user selects dropdown-values from the dropdown', async function (this: BugFinder) {
  const filePath = path.resolve(process.cwd(), 'test-data/CourseData.xlsx');

  const data = ExcelReader.read(filePath, 'Sheet1') as any[];

  console.log(data);

  for (const row of data) {
  const index = Number(row.DropdownIndex);
  const value = String(row.Value).trim();

  if (isNaN(index) || !value) {
    throw new Error(`Invalid Excel row: ${JSON.stringify(row)}`);
  }

  await this.addCoursePage.selectDropdown(index, value);
  }
});


When('the user clicks the Next button', async function (this: BugFinder) {
  await this.addCoursePage.clickNext();
});

Then('the user should navigate to the Course Hierarchy section', async function (this: BugFinder) {
  await this.addCoursePage.validateNextPage();
});