import { expect, type Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashBoardPage extends BasePage {
    readonly page: Page;
    readonly corseManagementLinkDrawer: Locator;
    private questionBankLinkDrawer: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.corseManagementLinkDrawer = page.locator('[title="Course Management"]');
        this.questionBankLinkDrawer = page.locator('//div[@title="Question Banks"]');
    }

    async clickCourseManagementDrawer() {
        await expect(this.corseManagementLinkDrawer).toBeVisible({ timeout: 60000 });
        await this.corseManagementLinkDrawer.click();
    }

    async clickQuestionBankDrawer() {
        await expect(this.questionBankLinkDrawer).toBeVisible({ timeout: 60000 });
        await this.questionBankLinkDrawer.click();
    }
}