import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import loginData from "../../../test-data/loginData.json";

export class EditPage extends BasePage{
    readonly page : Page;
    readonly courseMgt : Locator;
    readonly searchbx : Locator;
    readonly editmenu : Locator;
    readonly editcrse : Locator;
    readonly crsclient : Locator;
    readonly servicemdl : Locator;
    readonly nextBtn : Locator;
    readonly Preview : Locator;
    readonly previewUpdateBtn : Locator;
    readonly successMessage : Locator;
    readonly courseCategory : Locator;
    readonly validationMsg : Locator;

    constructor(page:Page){
        super(page);
        this.page = page;
        this.courseMgt = page.locator('//div[@title="Course Management"]');
        this.searchbx = page.locator('//input[@placeholder="Search courses, codes, clients, or categories..."]');
        this.editmenu = page.locator('//span[text()="Bug-Finder"]/ancestor::tr//button[contains(@aria-label,"actions") or contains(@class,"menu")]').first();
        this.editcrse = page.locator('//button[text()="Edit Course"]');
        this.crsclient = page.locator('//label[text()="Course Client"]//following::span[@data-slot="select-value"][1]');
        this.servicemdl = page.locator('//label[text()="Service Model"]//following::span[@data-slot="select-value"][1]');
        this.nextBtn = page.locator('//button[text()="Next"]');
        this.Preview = page.locator('//button[normalize-space(text())="Save Course Layout"]');
        this.previewUpdateBtn = page.locator('//button[text()="Preview and Update"]');
        this.successMessage = page.locator("[role='status']");
        this.courseCategory = page.locator('//label[text()="Course Category"]//following::span[@data-slot="select-value"][1]');
        this.validationMsg = page.locator('//p[contains(text(),"Please enter a course name")]');
    }

    async CoursePage(){
        await this.click(this.courseMgt);
        await expect(this.courseMgt).toBeVisible();
    }
    
    async SearchCourse() {
        await this.fill(this.searchbx, loginData.courseEdit.CourseName);
        await expect(this.searchbx).toHaveValue(loginData.courseEdit.CourseName);
    }

    async EditMenubtn(){
        await this.click(this.editmenu);
        await expect(this.editmenu).toBeVisible();
    }

    async EditCourse(){
        await this.click(this.editcrse);
        await expect(this.editcrse).toBeVisible();
    }

    async CourseClient(){
        await this.selectDropdown(this.crsclient, loginData.courseEdit["Course Client"]);
    }

    async ServiceModel(){
        await this.selectDropdown(this.servicemdl, loginData.courseEdit["Service Model"]);
    }

    async NextButton(){
        await this.click(this.nextBtn);
    }

    async PreviewandUpdate(){
        await this.click(this.Preview);
        await this.click(this.previewUpdateBtn);
    }

    async SuccessMsg(){
        await expect(this.successMessage).toContainText(loginData.courseEdit.Sucess);
    }

    async CourseCat(){
        await this.selectDropdown(this.courseCategory, loginData.courseValidation.CourseCategory);
    }

    async MsgValidation(){
        await expect(this.validationMsg).toContainText(loginData.courseValidation.ValidationMessage);
    }
}