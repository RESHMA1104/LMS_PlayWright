import { Page,Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
export class ReportDownload extends  BasePage{

    readonly page: Page
    readonly Print : Locator
    readonly DownnloadExcel : Locator 

    constructor(page : Page){
        super(page)
        this.page =page;
        this.Print = page.locator("//button[@title='Click to preview']")
        this.DownnloadExcel = page.locator('//h3[text()="Export Options"]/parent::div/following-sibling::div//button');
    }

    async clickprint(){
        await this.click(this.Print)
    }

    async DownloadReport(){    
        await this.click(this.DownnloadExcel)
    }
    
}