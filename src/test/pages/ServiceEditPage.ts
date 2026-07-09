
import {Page,Locator, expect}from '@playwright/test';
import { BasePage } from './BasePage';
export class ServieEdit extends BasePage{
    private Edit:Locator;
    private name:Locator;
    private descrition : Locator;
    private updatebtn : Locator;
    private toats : Locator
    private Searchbar:Locator


    constructor(page:Page){
        super(page)
        this.Edit = page.locator("//button[@title='Edit Service']");
        this.name = page.locator("//input[@placeholder=\"e.g., 'Software Development'\"]");
        this.descrition = page.locator('//label[text()="Description"]/following::textarea')
        this.updatebtn = page.locator('//button[@type="submit"]')
        this.toats = page.locator("//div[@role='alert']");
        this.Searchbar = page.locator("//input[@placeholder='Search services...']")

    }

    async Searchdataindyamic(data:any){
        await this.fill(this.Searchbar,data)
    }

    async clickngediting(){
        this.click(this.Edit)
    }

    async enteringDetails(value:any){
        this.fill(this.name,value.name.Service_Name)
        this.fill(this.descrition,value.Description)
    }

    async updatebtning(){
        this.click(this.updatebtn)
    }

     async VerifyupdatePopup() {
        console.log(this.toats.textContent())
        console.log(this.toats.textContent())
        await expect(this.toats).toBeVisible({ timeout: 90000 });           

    }

    async VerifyupdatepopupNotDisplayed() {
    await expect(this.toats).not.toBeVisible();
    }

}

