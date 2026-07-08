/*/*
    CustomWorld Creation to use cross the Project 
*/

import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../test/pages/loginPage';
import { DashBoardPage } from '../test/pages/dashboardpage';
import { CourseManagementPage } from '../test/pages/coursemanagementpage';
import { AddCorseStructurePage } from '../test/pages/addcoursestructurepage';

// CustomWorld extends World
export class BugFinder extends World {
    browser!: Browser;
    browserContext!: BrowserContext;
    page!: Page;
    loginPage!: LoginPage;
    dashboardPage!: DashBoardPage;
    coursemanagementPage!: CourseManagementPage;
    addcoursestructurePage!: AddCorseStructurePage;
}


// export the world
setWorldConstructor(BugFinder);