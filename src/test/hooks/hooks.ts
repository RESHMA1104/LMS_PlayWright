/*/*
    Hooks to execute Before and After the Method and entire Test
*/

import { BugFinder } from "../../world/bug_finder";
import { Browser, chromium, firefox } from "@playwright/test";
import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { LoginPage } from "../pages/loginPage";
import { DashBoardPage } from "../pages/dashboardpage";
import { CourseManagementPage } from "../pages/coursemanagementpage";
import { AddCorseStructurePage } from "../pages/addcoursestructurepage";

import { ReportDownload } from "../pages/PrintReportPage"
import { AddCourse } from "../pages/addCoursePage";
import { EditPage } from "../pages/EditCoursePage";
import { CourseFilter } from "../pages/courseFilterPage";
import { AddSimilarCourse } from '../pages/AddSimilarCoursepage';
import { AddService } from '../pages/AddnewService';
import { ServieEdit } from "../pages/ServiceEditPage";
import { DynamicFieldManagement } from "../pages/dynamicfieldmanagementpage";

// Default Timeout
setDefaultTimeout(180 * 1000);

let browser: Browser;

// Browser launch the application 
BeforeAll(async () => {

    browser = await chromium.launch({
        headless: true
    })
})

// Reference to the Object and creating the resource to the CustomWorld
Before(async function (this: BugFinder) {

    this.browser = browser;
    this.browserContext = await this.browser.newContext();
    this.page = await this.browserContext.newPage();

    this.page.setDefaultTimeout(120000);
    this.page.setDefaultNavigationTimeout(120000);

    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashBoardPage(this.page);
    this.coursemanagementPage = new CourseManagementPage(this.page);

    this.addcoursestructurePage = new AddCorseStructurePage(this.page);
    this.ReportDownload = new ReportDownload(this.page)
    this.addCoursePage = new AddCourse(this.page);
    this.editPage = new EditPage(this.page);
    this.courseFilter = new CourseFilter(this.page);
    this.AddSimilarCourses = new AddSimilarCourse(this.page);
    this.courseFilter = new CourseFilter(this.page);
    this.AddService = new AddService(this.page);
    this.ServieEdit = new ServieEdit(this.page);
    this.dynamicfieldmanagementPage = new DynamicFieldManagement(this.page);
})

// If the test Failed ScreenShot capture 
After(async function (this: BugFinder, { pickle, result }) {
    if (result?.status == Status.FAILED && this.page) {
        const screenshot = await this.page.screenshot({
            path: `reports/screenshots/${pickle.name}.png`
        });
        await this.attach(screenshot, "image/png");
    }

    await this.page?.close();
    await this.browserContext?.close();
})


// Closing all the resource 
AfterAll(async () => {
    await browser?.close();
})
