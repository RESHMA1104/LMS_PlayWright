/*/*
    CustomWorld Creation to use cross the Project 
*/

import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../test/pages/loginPage';
import type { DashBoardPage } from '../test/pages/dashboardpage';
import type { CourseManagementPage } from '../test/pages/coursemanagementpage';

// CustomWorld extends World
export class BugFinder extends World {
    browser!: Browser;
    browserContext!: BrowserContext;
    page!: Page;
    loginPage!: LoginPage;
    dashboardPage!: DashBoardPage;
    coursemanagementPage!: CourseManagementPage;
}


// export the world
setWorldConstructor(BugFinder);