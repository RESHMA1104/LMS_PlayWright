import { expect, type Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashBoardPage extends BasePage {
    readonly page: Page;
    readonly corseManagementLinkDrawer: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.corseManagementLinkDrawer = page.locator('[title="Course Management"]');
    }

    async clickCourseManagementDrawer() {
        await expect(this.corseManagementLinkDrawer).toBeVisible({ timeout: 15000 });
        await this.corseManagementLinkDrawer.click();
    }
}