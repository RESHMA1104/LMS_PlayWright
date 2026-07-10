import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import loginData from "../../../test-data/loginData.json";


export class DeletePage extends BasePage{
    private searchbx : Locator;
    private deletebtn : Locator;
    private deletecrse : Locator;
    private deletemenu : Locator;

constructor(page:Page){
        super(page);
        this.page = page;
        this.searchbx = page.locator('//input[@placeholder="Search courses, codes, clients, or categories..."]')
        this.deletebtn = page.getByRole('button', { name: 'Delete Course' });
        this.deletecrse = page.locator('//button[text()="Delete Course"]');
        this.deletemenu = page.locator('.flex.items-center.gap-1.px-2.py-1.rounded.bg-gray-50');
    }

    async Searchcrse(){
        await this.fill(this.searchbx, loginData.courseDelete.CourseName);
    }

    async CourseMenu(){
        await this.click(this.deletemenu);
    }

    async DeleteCourse() {
        await this.click(this.deletebtn);
    }

    async ConfirmDelete(){
        await this.click(this.deletecrse);
    }

    async VerifyCourseDeleted() {
        await this.searchbx.clear();
        await this.fill(this.searchbx, loginData.courseDelete.CourseName);
        await expect(this.page.getByText(loginData.courseDelete.CourseName)).not.toBeVisible();
    }
}