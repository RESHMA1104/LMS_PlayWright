import { expect } from '@playwright/test';
/*/*
    Add Course Page defines all the locators with reusable methods
*/
import { BasePage } from "./BasePage";
import { Page, Locator } from '@playwright/test';


export class AddCourse extends BasePage{

    private courseManagement : Locator
    private addCourse: Locator

    private nextbtn : Locator

    private clientError: Locator;
    private typeError : Locator;
    private modelError: Locator;
    private categoryError: Locator;
    private nameError: Locator;



    constructor(page: Page){
        super(page);
        this.courseManagement = page.locator("//div[@title ='Course Management']")
        this.addCourse = page.locator("//button[text() = 'Add Course']")
        

        this.nextbtn = page.locator("//div[@class = 'flex gap-1.5']//button[text() = 'Next']")

        this.clientError = page.locator("//div//span[text() = 'Please select a client']");

        this.typeError = page.locator("//div//span[text() = 'Please select a service type']")

        this.modelError = page.locator("//div//span[text() = 'Please select a service model']")
        this.categoryError = page.locator("//div//span[text() = 'Please select a course category']");

        this.nameError = page.locator("//div//span[text() = 'Please enter a course name']")


    }

    async commonMethod(){
       await this.courseManagement.click()
       await this.addCourse.click();
    }

    async clickAddCourse() {
        await this.addCourse.click();
    }



    async clickNext() {
        await this.nextbtn.click();
    }

    async validateWarningMessages(){
        await expect(this.clientError).toBeVisible();
        await expect(this.typeError).toBeVisible();
        await expect(this.modelError).toBeVisible();
        await expect(this.categoryError).toBeVisible();
        await expect(this.nameError).toBeVisible();
    }



        //     const fileInput = page.locator('input[type="file"]');

        // await fileInput.setInputFiles('tests/files/sample.pdf');

        // await expect(
        //   page.getByText(/jpeg|jpg|png|webp|accepted/i)
        // ).toBeVisible();
}
