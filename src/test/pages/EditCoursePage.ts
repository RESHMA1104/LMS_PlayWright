import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import loginData from "../../../test-data/loginData.json";

export class EditPage extends BasePage{
    private courseMgt : Locator;
    private searchbx : Locator;
    private editmenu : Locator;
    private editcrse : Locator;
    private crsclient : Locator;
    private servicemdl : Locator;
    private nextBtn : Locator;
    private Preview : Locator;
    private previewUpdateBtn : Locator;
    private successMessage : Locator;
    private courseCategory : Locator;
    private validationMsg : Locator;
    private ido : Locator;
    private wedo : Locator;
    private youdo : Locator;
    private basiccrsepage : Locator;

    constructor(page:Page){
        super(page);
        this.page = page;
        this.courseMgt = page.locator('[title="Course Management"]');
        this.searchbx = page.locator('//input[@placeholder="Search courses, codes, clients, or categories..."]');
        this.editmenu = page.locator('(//span[text()="Bug-Finder"]/following::td/child::span/child::div/child::div)');
        this.editcrse = page.locator('//button[text()="Edit Course"]');
        this.crsclient = page.locator('//label[text()="Course Client"]//following::span[@data-slot="select-value"][1]');
        this.servicemdl = page.locator('//label[text()="Service Model"]//following::span[@data-slot="select-value"][1]');
        this.nextBtn = page.locator('//div[@class="flex justify-between items-center w-full font-sans"]//button[normalize-space()="Next"]');
        this.previewUpdateBtn = page.locator('//button[text()="Preview & Update"]');
        this.Preview = page.locator('//button[text()=" Save Course Layout"]');
        this.successMessage = page.locator('//div[@class="text-sm font-semibold leading-tight"]');
        this.courseCategory = page.locator('//label[text()="Course Category"]//following::span[@data-slot="select-value"][1]');
        this.validationMsg = page.locator("//span[normalize-space()='Please enter a course name']");
        this.ido = page.locator('//label[text()="I Do"]//following::span[@data-slot="select-value"][1]');
        this.wedo = page.locator('//label[text()="We Do"]//following::span[@data-slot="select-value"][1]');
        this.youdo = page.locator('//label[text()="You Do"]//following::span[@data-slot="select-value"][1]')
        this.basiccrsepage = page.locator('//div[@class="text-xs font-medium whitespace-nowrap font-sans text-slate-700 dark:text-gray-300"]');

    }

    async CoursePage(){
        await expect(this.courseMgt).toBeVisible({ timeout: 30000 });
        await this.courseMgt.click();
    }
    
    async SearchCourse() {
        await this.fill(this.searchbx, loginData.courseEdit.CourseName);
    }

    async EditMenubtn(){
        await this.click(this.editmenu);
    }

    async EditCourse(){
        await this.click(this.editcrse);
    }

    async CourseClient(){
        await this.selectDropdownValues(this.crsclient, loginData.courseEdit["Course Client"]);
    }

    async ServiceModel(){
        await this.selectDropdownValues(this.servicemdl, loginData.courseEdit["Service Model"]);
    }

    async NextButton(){
        await this.click(this.nextBtn);
    }

    async PreviewandUpdate(){
        await this.click(this.previewUpdateBtn);
        await this.click(this.Preview);
    }

    async SuccessMsg(){
        await expect(this.successMessage).toContainText(loginData.courseEdit.Success);
    }

    async CourseCat(){
        await this.selectDropdownValues(this.courseCategory, loginData.courseValidation.CourseCategory);
    }

    async MsgValidation(){
        await expect(this.validationMsg).toHaveText(loginData.courseValidation.ValidationMessage);
    }

    async selectMultiDdPedagogy(locator: Locator, value: string) {
        await locator.click();
        const listBox = this.page.locator('[role="listbox"]').last();
        await listBox
            .locator('label')
            .filter({ hasText: value })
            .click();
        await expect(this.page.getByText(new RegExp(`\\d+\\.\\s*${value}`))).toBeVisible();
    }

    async selectIDo(Ido: string) {
    await this.selectMultiDdPedagogy(this.ido, Ido);
    }

    async selectWeDo(Wedo: string) {
        await this.selectMultiDdPedagogy(this.wedo, Wedo);
    }

    async selectYouDo(Youdo: string) {
        await this.selectMultiDdPedagogy(this.youdo, Youdo);
    }

    async CourseBasicPge(){
        await this.basiccrsepage.isVisible();
    }
}