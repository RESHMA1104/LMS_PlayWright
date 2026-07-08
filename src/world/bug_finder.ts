/*/*
    CustomWorld Creation to use cross the Project 
*/

import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../test/pages/loginPage';
import type { DashBoardPage } from '../test/pages/dashboardpage';
import type { CourseManagementPage } from '../test/pages/coursemanagementpage';
import { ReportDownload } from '../test/pages/PrintReportPage';

// CustomWorld extends World
export class BugFinder extends World {
    browser!: Browser;
    browserContext!: BrowserContext;
    page!: Page;
    loginPage!: LoginPage;
    dashboardPage!: DashBoardPage;
    coursemanagementPage!: CourseManagementPage;
     ReportDownload!: ReportDownload;
}


// export the world
setWorldConstructor(BugFinder);