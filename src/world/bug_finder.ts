/*/*
    CustomWorld Creation to use cross the Project 
*/

import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../test/pages/loginPage';
import type { DashBoardPage } from '../test/pages/dashboardpage';
import type { CourseManagementPage } from '../test/pages/coursemanagementpage';
import { ReportDownload } from '../test/pages/PrintReportPage';
import type { AddCourse } from '../test/pages/addCoursePage';
import { EditPage } from '../test/pages/EditCoursePage';
import { CourseFilter } from '../test/pages/courseFilterPage';
// CustomWorld extends World
export class BugFinder extends World {
    browser!: Browser;
    browserContext!: BrowserContext;
    page!: Page;
    loginPage!: LoginPage;
    dashboardPage!: DashBoardPage;
    coursemanagementPage!: CourseManagementPage;
     ReportDownload!: ReportDownload;
    addCoursePage!: AddCourse;
    editPage!: EditPage;
    courseFilter!:CourseFilter;
}


// export the world
setWorldConstructor(BugFinder);