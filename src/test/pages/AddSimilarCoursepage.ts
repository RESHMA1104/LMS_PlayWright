import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import path from "node:path";
export class ReportDownload extends BasePage {

    readonly page: Page;
    readonly Print: Locator;
    readonly DownloadExcel: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.Print = page.locator("//button[@title='Click to preview']");
        this.DownloadExcel = page.locator('//h3[text()="Export Options"]/parent::div/following-sibling::div//button');
    }

    async downloadReport(downloadPath: string) {
        await this.click(this.Print);
        const download = await this.waitForDownload( this.page,this.DownloadExcel);
        await download.saveAs(path.join(downloadPath, download.suggestedFilename()));
    }
}