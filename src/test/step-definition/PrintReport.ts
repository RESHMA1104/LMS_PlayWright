
import { Given, When, Then } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_finder";
       
         When('the user click on the Print Button', async function (this: BugFinder) {
          await this.ReportDownload.clickprint()
          
         
         });
       
              
         When('Select Excel button to get the excel report to download it', async function (this: BugFinder) {
            await this.ReportDownload.DownloadReport()
         });
       

