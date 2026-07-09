import { When, Then } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_finder";
import ServiceEditdata from '../../../test-data/ServiceEditdata.json'
const valid = ServiceEditdata.edit

When("the user Search the particular Service to Edit",async function (this: BugFinder) {
   this.ServieEdit.Searchdataindyamic(valid)
  }
);

When("the user click on the edit Service",async function (this: BugFinder) {
    this.ServieEdit.clickngediting()
  
  }
);

When("The user give the new Details such as servicename and description",async function (this: BugFinder) {
    this.ServieEdit.enteringDetails(valid)
  }
);

Then("the user see the successfully edited popup meassage",async function (this: BugFinder) {
    this.ServieEdit.VerifyupdatePopup()
  }
);