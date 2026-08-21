import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import loginData from "../../../test-data/loginData.json";

export class DynamicPage extends BasePage {
    private dynamicFieldSettingsMenu: Locator;
    private serviceModelTab: Locator;
    private addServiceBtn: Locator;
    private serviceNameInput: Locator;
    private descriptionInput: Locator;
    private createServiceBtn: Locator;
    private successMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        // Left navigation entry to open the Dynamic Field Settings page
        this.dynamicFieldSettingsMenu = page.locator('[title="Dynamic Field Settings"]');

        // "Service Model" tab on the Dynamic Field Management page
        this.serviceModelTab = page.locator('//button[normalize-space()="Service Model"]');

        // "+ Add Service" button (top right of the Service Management card)
        this.addServiceBtn = page.locator('//button[normalize-space()="Add Service"]');

        // "Add New Service" modal fields
        this.serviceNameInput = page.locator('//label[normalize-space()="Service Name"]//following::input[1]');
        this.descriptionInput = page.locator('//label[normalize-space()="Description"]//following::textarea[1]');
        this.createServiceBtn = page.locator('//button[normalize-space()="Create Service"]');

        // Toast / success text shown after saving
        this.successMessage = page.locator('//div[@class="text-sm font-semibold leading-tight"]');
    }

    async DynamicFieldSettingsPageNav() {
        await expect(this.dynamicFieldSettingsMenu).toBeVisible({ timeout: 60000 });
        await this.dynamicFieldSettingsMenu.click();
    }

    async SelectServiceModelTab() {
        await this.click(this.serviceModelTab);
    }

    async ClickAddService() {
        await this.click(this.addServiceBtn);
    }

    async EnterServiceName() {
        await this.fill(this.serviceNameInput, loginData.dynamicFieldSettings.ServiceName);
    }

    async EnterDescription() {
        await this.fill(this.descriptionInput, loginData.dynamicFieldSettings.Description);
    }

    async ClickCreateService() {
        await this.click(this.createServiceBtn);
    }

    async SuccessMsg() {
        await expect(this.successMessage).toContainText(loginData.dynamicFieldSettings.Success);
    }

    // Mandatory field validation is native browser (HTML5 required) validation,
    // it is NOT rendered as a DOM element you can assert with toHaveText/toContainText.
    // It must be read off the input's validationMessage property instead.
    async MsgValidation() {
        const message = await this.serviceNameInput.evaluate(
            (el: HTMLInputElement) => el.validationMessage
        );
        expect(message).toBe(loginData.dynamicFieldSettings.ValidationMessage);
    }
}