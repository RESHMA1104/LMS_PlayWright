/*/*
    Add Course Page defines all the locators with reusable methods
*/
import { BasePage } from "./BasePage";
import { Page, Locator } from '@playwright/test';


export class AddCourse extends BasePage{
    private addCourse: Locator




    constructor(page: Page){
        super(page);

        this.addCourse = page.locator("//button[text() = 'Add Course']")


    }
}
