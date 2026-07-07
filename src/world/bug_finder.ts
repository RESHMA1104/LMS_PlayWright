/*/*
    CustomWorld Creation to use cross the Project 
*/

import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page} from '@playwright/test';
import { LoginPage } from '../test/pages/loginPage';

// CustomWorld extends World
export class BugFinder extends World{
    browser!:Browser;
    browserContext!:BrowserContext;
    page!:Page;

    loginPage!:LoginPage;
}


// export the world
setWorldConstructor(BugFinder);