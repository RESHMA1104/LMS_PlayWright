import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AddService extends BasePage {
    //private Slidebar: Locator
    private DynamicField: Locator;
    private AddServiceBtn: Locator;
    private ServiceName: Locator;
    private Description: Locator;
    private CreateService: Locator;
    private SuccessPopup: Locator;
    private Searchbar: Locator;
    private Tabledata : Locator;
    private Nodatafound : Locator;


    constructor(page: Page) {
        super(page);
        //this.Slidebar = page.locator('//div[@title="Dynamic Field Settings"]')
        this.DynamicField = page.locator("//div[@title='Dynamic Field Settings']");
        this.AddServiceBtn = page.locator("//h3[text()='Service Management']/parent::div/parent::div/following-sibling::button");
        this.ServiceName = page.locator("//input[contains(@placeholder,'Software Development')]");
        this.Description = page.locator("//textarea[@placeholder='Describe the service...']");
        this.CreateService = page.locator("//button[@type='submit']");
        this.SuccessPopup = page.locator("//div[@role='alert']");
        this.Searchbar = page.locator("//input[@placeholder='Search services...']")
        this.Tabledata =page.locator("//tbody/tr/td[2]//div[contains(@class,'font-medium')]")
        this.Nodatafound =page.locator("//td[text()='No services found ']")


        // Update this locator according to your application's success message
        
    }

    async DynamicFieldclicking() {
        await this.click(this.DynamicField);
    }

    async AddSeviceclivking() {
        await this.click(this.AddServiceBtn);
    }

    async Enteringthedetailsing(ServiceName: string, Description: string) {
        await this.fill(this.ServiceName, ServiceName);
        await this.fill(this.Description, Description);
    }

    async CreateingServiceing() {
        await this.click(this.CreateService);

    }

    async VerifyServiceCreatedPopup() {
        await expect(this.SuccessPopup).toBeVisible();
    }

    async VerifyNotificationNotDisplayed() {
    await expect(this.SuccessPopup).not.toBeVisible();
    }
    

    async Searchdataindyamic(data:any){
        await this.fill(this.Searchbar,data)
    }





async validateSearchdata(searchData: string) {

    const serviceList = await this.Tabledata.allTextContents();
    console.log("Displayed Services:", serviceList);
    expect(serviceList.length).toBeGreaterThan(0);
    expect(serviceList.map(service => service.trim().toLowerCase()) ).toContain(searchData.trim().toLowerCase());
}

async validateNoSearchDataFound() {
    await expect(this.Nodatafound).toBeVisible();
    const serviceList = await this.Tabledata.allTextContents();
    expect(serviceList.length).toBe(0);
}
}

