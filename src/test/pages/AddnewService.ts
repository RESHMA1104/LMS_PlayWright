import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AddService extends BasePage {

    private DynamicField: Locator;
    private AddServiceBtn: Locator;
    private ServiceName: Locator;
    private Description: Locator;
    private CreateService: Locator;
    private SuccessPopup: Locator;

    constructor(page: Page) {
        super(page);

        this.DynamicField = page.locator("//div[@title='Dynamic Field Settings']//div[@class='p-1.5']//*[name()='svg']");
        this.AddServiceBtn = page.locator("//h3[text()='Service Management']/parent::div/parent::div/following-sibling::button");
        this.ServiceName = page.locator("//input[contains(@placeholder,'Software Development')]");
        this.Description = page.locator("//textarea[@placeholder='Describe the service...']");
        this.CreateService = page.locator("//button[@type='submit']");
        this.SuccessPopup = page.locator("//div[@role='alert']");

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
}