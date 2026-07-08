import { Then, When } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_finder";

When('the user click on the Dynamic field Setting', async function (this: BugFinder) {
    await this.AddService.DynamicFieldclicking();
});

When('Click on Add Service', async function (this: BugFinder) {
    await this.AddService.AddSeviceclivking();
});

When(
    'Enter the {string} and {string}',
    async function (
        this: BugFinder,
        ServiceName: string,
        Description: string
    ) {
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