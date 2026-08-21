import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import loginData from "../../../test-data/loginData.json";

export class ClientModalPage extends BasePage {
    private clientModalTab: Locator;
    private newClientBtn: Locator;
    private clientNameInput: Locator;
    private companyNameInput: Locator;
    private emailAddressInput: Locator;
    private phoneNumberInput: Locator;
    private clientDescriptionInput: Locator;
    private companyAddressInput: Locator;
    private addClientBtn: Locator;
    private successMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        // "Client Modal" tab on the Dynamic Field Management page
        this.clientModalTab = page.locator('//button[normalize-space()="Client Modal"]');

        // "+ New Client" button (top right of the Client Management card)
        this.newClientBtn = page.locator('//button[normalize-space()="New Client"]');

        // "Add New Client" modal fields
        this.clientNameInput = page.locator('//label[normalize-space()="Client Name *"]//following::input[1]');
        this.companyNameInput = page.locator('//label[normalize-space()="Company Name *"]//following::input[1]');
        this.emailAddressInput = page.locator('//label[normalize-space()="Email Address *"]//following::input[1]');
        this.phoneNumberInput = page.locator('//label[normalize-space()="Phone Number *"]//following::input[1]');
        this.clientDescriptionInput = page.locator('//label[normalize-space()="Description"]//following::textarea[1]');
        this.companyAddressInput = page.locator('//label[normalize-space()="Company Address"]//following::textarea[1]');
        this.addClientBtn = page.locator('//button[normalize-space()="Add Client"]');

        // Toast / success text shown after saving
        this.successMessage = page.locator('//div[@class="text-sm font-semibold leading-tight"]');
    }

    async SelectClientModalTab() {
        await this.click(this.clientModalTab);
    }

    async ClickNewClient() {
        await this.click(this.newClientBtn);
    }

    async EnterClientName() {
        await this.fill(this.clientNameInput, loginData.dynamicClientModel.ClientName);
    }

    async EnterCompanyName() {
        await this.fill(this.companyNameInput, loginData.dynamicClientModel.CompanyName);
    }

    async EnterEmailAddress() {
        await this.fill(this.emailAddressInput, loginData.dynamicClientModel.EmailAddress);
    }

    async EnterPhoneNumber() {
        await this.fill(this.phoneNumberInput, loginData.dynamicClientModel.PhoneNumber);
    }

    async EnterClientDescription() {
        await this.fill(this.clientDescriptionInput, loginData.dynamicClientModel.ClientDescription);
    }

    async EnterCompanyAddress() {
        await this.fill(this.companyAddressInput, loginData.dynamicClientModel.CompanyAddress);
    }

    async ClickAddClient() {
        await this.click(this.addClientBtn);
    }

    async ClientSuccessMsg() {
        await expect(this.successMessage).toContainText(loginData.dynamicClientModel.ClientSuccess);
    }

    // Mandatory field validation for the Client form - same native HTML5
    // required-field mechanism, read off the first required field (Client Name).
    async ClientMsgValidation() {
        const message = await this.clientNameInput.evaluate(
            (el: HTMLInputElement) => el.validationMessage
        );
        expect(message).toBe(loginData.dynamicClientModel.ValidationMessage);
    }
}