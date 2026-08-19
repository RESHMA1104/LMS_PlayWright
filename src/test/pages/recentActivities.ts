import { Page, Locator } from "@playwright/test"
import { BasePage } from "./BasePage"

export class AdminDashboardPage extends BasePage {
    readonly page: Page
    readonly profileavatar: Locator
    readonly dashboardtext: Locator
    readonly dynamicFieldManagaement: Locator
    readonly coursemanagementlink: Locator
    readonly signOutButton: Locator
    readonly recentTab: Locator
    readonly leftArrow: Locator
    readonly dynRec: Locator
    readonly AdmRec: Locator

    constructor(page: Page) {
        super(page)
        this.page = page
        this.profileavatar = this.page.locator("//span[@data-slot='avatar']/ancestor::button")
        this.dashboardtext = this.page.locator("//div[@class='flex flex-col']/child::p[1]")
        this.recentTab = this.page.locator("//h1");
        this.dynamicFieldManagaement = this.page.locator("//div[@class='pt-6']/child::div/child::div[3]");
        this.coursemanagementlink = this.page.locator("//div[@title='Course Management']");
        this.signOutButton = this.page.locator("//div[@role='menuitem'][4]");
        this.leftArrow = this.page.locator("(//button[@data-slot='button'])[6]");
        this.dynRec = this.page.locator("//div[@class='mt-2']/div[1]/child::*[1]/child::*[2]");
        this.AdmRec = this.page.locator("//div[@class='mb-4']/div[2]/div[2]/div/span");
    }

    async profileclick() {
        await this.click(this.profileavatar)
    }

    getuseremail() {
        return this.dashboardtext
    }

    async dynamicFieldManagementClick() {
        await this.click(this.dynamicFieldManagaement);
    }

    async clickcoursemanagementlink() {
        await this.coursemanagementlink.waitFor({
            state: "visible",
            timeout: 30000
        });
        await this.click(this.coursemanagementlink);
    }

    async ClickSignOutButton() {
        await this.click(this.signOutButton);
    }

    // recent
    async adminPagevisible() {
        return await this.getText(this.recentTab);
    }

    async ClickLeftarrow() {
        await this.click(this.leftArrow);
    }

    async RecentActivity() {
        return await this.getText(this.dynRec);
    }

    async PreviousActivity() {
        return await this.getText(this.AdmRec);
    }
}