/*/*
    CustomWorld Creation to use cross the Project 
*/

import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page} from '@playwright/test';
import { AddCourse } from '../test/pages/addCoursePage';


// CustomWorld extends World
export class BugFinder extends World{
    browser!:Browser;
    browserContext!:BrowserContext;
    page!:Page;

    addCourse !: AddCourse
}


// export the world
setWorldConstructor(BugFinder);