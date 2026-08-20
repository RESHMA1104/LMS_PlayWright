import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import loginData from "../../../test-data/loginData.json";

export class DynamicFieldSettingsPage extends BasePage {
    private dynamicFieldSettingsMenu: Locator;
    private serviceModelDropdown: Locator;
    private addBtn: Locator;
    private courseNameInput: Locator;
    private saveBtn: Locator;
    private successMessage: Locator;
    private courseNameValidationMsg: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        // Left navigation entry to open the Dynamic Field Settings page
        this.dynamicFieldSettingsMenu = page.locator('[title="Dynamic Field Settings"]');

        // Service Model dropdown on the Dynamic Field Settings page
        this.serviceModelDropdown = page.locator('//label[text()="Service Model"]//following::span[@data-slot="select-value"][1]');

        // "Add" button that opens the add-field form/modal
        this.addBtn = page.locator('//button[normalize-space()="Add"]');

        // Course Name field inside the Add form/modal
        this.courseNameInput = page.locator('//label[text()="Course Name"]//following::input[1]');

        // Save button on the Add form/modal
        this.saveBtn = page.locator('//button[normalize-space()="Save"]');

        // Toast / success text shown after saving
        this.successMessage = page.locator('//div[@class="text-sm font-semibold leading-tight"]');

        // Inline validation message when Course Name is left empty
        this.courseNameValidationMsg = page.locator("//span[normalize-space()='Please enter a course name']");
    }

    async DynamicFieldSettingsPageNav() {
        await expect(this.dynamicFieldSettingsMenu).toBeVisible({ timeout: 60000 });
        await this.dynamicFieldSettingsMenu.click();
    }

    async SelectServiceModel() {
        await this.selectDropdownValues(this.serviceModelDropdown, loginData.dynamicFieldSettings["Service Name"]);
    }

    async ClickAdd() {
        await this.click(this.addBtn);
    }

    async EnterCourseName() {
        await this.fill(this.courseNameInput, loginData.dynamicFieldSettings.Description);
    }

    async ClickSave() {
        await this.click(this.saveBtn);
    }

    async SuccessMsg() {
        await expect(this.successMessage).toContainText(loginData.dynamicFieldSettings.Success);
    }

    async MsgValidation() {
        await expect(this.courseNameValidationMsg).toHaveText(loginData.dynamicFieldSettings.ValidationMessage);
    }
}