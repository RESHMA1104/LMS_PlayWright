import { Then, When } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_finder";
import dyanamicsearchdata from '../../../test-data/dyanamicsearchdata.json'


When('the user click on the Dynamic field Setting', async function (this: BugFinder) {
    await this.AddService.DynamicFieldclicking();
});

When('Click on Add Service', async function (this: BugFinder) {
    await this.AddService.AddSeviceclivking();
});

When('Enter the {string} and {string}', async function (this: BugFinder, ServiceName: string, Description: string) {
    await this.AddService.Enteringthedetailsing(ServiceName, Description);
}
);

When('Click on the Create Service', async function (this: BugFinder) {

    await this.AddService.CreateingServiceing();
});

Then(
    'A pop notification will come for Service successfully created',
    async function (this: BugFinder) {
        await this.AddService.VerifyServiceCreatedPopup();
    }
);


Then('The user did not see the notification', async function (this: BugFinder) {
    await this.AddService.VerifyNotificationNotDisplayed();

});

const valid = dyanamicsearchdata.valid;
const invalid = dyanamicsearchdata.invalid;

When('the user enter valid Service type in the search bar', async function (this: BugFinder) {
    await this.AddService.Searchdataindyamic(valid.serviceType);
});

When('the user enter invalid Service type in the search bar', async function (this: BugFinder) {
    await this.AddService.Searchdataindyamic(invalid.serviceType);
});

Then('the Service Should properly display', async function (this: BugFinder) {
    await this.AddService.validateSearchdata(valid.serviceType);
});

Then('the Service Should get the message for No services found matching your search for invalid data', async function (this: BugFinder) {
    await this.AddService.validateNoSearchDataFound();
});