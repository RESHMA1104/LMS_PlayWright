/*/*
    Hooks to execute Before and After the Method and entire Test
*/

import { BugFinder } from "../../world/bug_finder";
import { Browser, chromium } from "@playwright/test";
import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from "@cucumber/cucumber";

// Default Timeout
setDefaultTimeout(60* 1000);

let browser:Browser;

// Browser launch the application 
BeforeAll(async()=>{
    browser=await chromium.launch({
        headless:true
    })
})

// Reference to the Object and creating the resource to the CustomWorld
Before(async function (this:BugFinder) {
    this.browser = browser;
    this.browserContext = await this.browser.newContext();
    this.page = await this.browserContext.newPage();
})

// If the test Failed ScreenShot capture 
After(async function (this:BugFinder, {pickle,result}){
    if(result?.status == Status.FAILED && this.page){
        const screenshot = await this.page.screenshot({
            path: `reports/screenshots/${pickle.name}.png`
        });
        await this.attach(screenshot, "image/png");
    }

    await this.page?.close();
    await this.browserContext?.close();
})


// Closing all the resource 
AfterAll(async()=>{
    await browser?.close();
})