import { Page,expect,Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
export class deleteService extends BasePage{

    private  deletebtn:Locator;
    private  deleteServicepopup : Locator;
    private  deletionbuttton : Locator; 
    private  popupnotification : Locator;

    constructor(page:Page){
        super(page)
      this.deletebtn = page.locator('//button[@title="Delete Service"][5]');
        this.deleteServicepopup = page.locator("//h3[text()='Delete Service']");
         this.deletionbuttton = page.locator("//button[text()='Delete']");
          this.popupnotification = page.locator("//div[contains(@class,'Toastify__toast--success') and contains(.,'Service deleted successfully')]")       
    }

    async deleiconclicking(){
      await  this.click(this.deletebtn)
    }

    async Deleting(){
       await  expect(this.deleteServicepopup).toBeVisible
       await this.click(this.deletionbuttton)
    }

    async popupchecking(){
        await expect(this.popupnotification).toBeVisible
    }


}