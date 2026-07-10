

/*/*
    CustomWorld Creation to use cross the Project 
*/

import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../test/pages/loginPage';
import { DashBoardPage } from '../test/pages/dashboardpage';
import { CourseManagementPage } from '../test/pages/coursemanagementpage';
import { AddCorseStructurePage } from '../test/pages/addcoursestructurepage';
import type { AddCourse } from '../test/pages/addCoursePage';
import { EditPage } from '../test/pages/EditCoursePage';
import { CourseFilter } from '../test/pages/courseFilterPage';
import { ServieEdit } from '../test/pages/ServiceEditPage';
import { DeletePage } from '../test/pages/DeleteCoursePage';
import { deleteService } from '../test/pages/deteteServicepage';

import type { DynamicFieldManagement } from '../test/pages/dynamicfieldmanagementpage';
import type { AddService } from '../test/pages/AddnewService';



// CustomWorld extends World
export class BugFinder extends World {
    browser!: Browser;
    browserContext!: BrowserContext;
    page!: Page;
    loginPage!: LoginPage;
    dashboardPage!: DashBoardPage;
    coursemanagementPage!: CourseManagementPage;
    addcoursestructurePage!: AddCorseStructurePage;
    addCoursePage!: AddCourse;
    editPage!: EditPage;
    courseFilter!: CourseFilter;
    //AddSimilarCourses!: AddSimilarCourse;
    AddService!: AddService;
    ServieEdit!: ServieEdit
    deletePage!: DeletePage
    dynamicfieldmanagementPage!: DynamicFieldManagement;
    deleteService!: deleteService;


}


// export the world
setWorldConstructor(BugFinder);
