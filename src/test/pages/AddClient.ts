import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class Addclient extends BasePage {

    private clientIconbtn: Locator;
    private addclientbtn: Locator;
    private Clientname: Locator;
    private companyname: Locator;
    private email: Locator;
    private phone: Locator;
    private description: Locator;
    private Company_Address: Locator;
    private savebtn: Locator;
    private toastMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.clientIconbtn = page.locator("//button[text()='Client Modal']");
        this.addclientbtn = page.locator("//button[text()='New Client']");

        this.Clientname = page.locator('//input[@placeholder="Enter client name"]');
        this.companyname = page.locator('//input[@placeholder="Enter company name"]');
        this.email = page.locator('//input[@placeholder="Enter email address"]');
        this.phone = page.locator('//input[@placeholder="Enter phone number"]');
        this.description = page.locator("//textarea[@placeholder='Description']");
        this.Company_Address = page.locator('//textarea[@placeholder="Enter complete company address"]');

        this.savebtn = page.locator("//button[normalize-space()='Add Client']");
        this.toastMessage = page.locator("//div[contains(@class,'Toastify__toast-body')]");
    }

    async clickClientIcon() {
        await this.clientIconbtn.click();
    }

    async clickAddClient() {
        await this.addclientbtn.click();
    }

    async enterClientDetails(
        clientName: string,
        companyName: string,
        email: string,
        phone: string,
        description: string,
        companyAddress: string
    ) {
        await this.Clientname.fill(clientName);
        await this.companyname.fill(companyName);
        await this.email.fill(email);
        await this.phone.fill(phone);
        await this.description.fill(description);
        await this.Company_Address.fill(companyAddress);
    }

    async clickSave() {
        await this.savebtn.click();
    }

    async verifyClientAddedSuccessfully() {
        await expect(this.toastMessage).toBeVisible();
    }
}