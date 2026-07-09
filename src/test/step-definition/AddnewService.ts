import { Then, When } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_finder";
import dyanamicsearchdata from '../../../test-data/dyanamicsearchdata.json'
import { logger } from '../../utils/logger';

When('the user click on the Dynamic field Setting', async function (this: BugFinder) {
    logger.info("Clicking on Dynamic Field Setting");
    await this.AddService.DynamicFieldclicking();
    logger.info("Successfully clicked on Dynamic Field Setting");
});

When('Click on Add Service', async function (this: BugFinder) {
    logger.info("Clicking on Add Service button");
    await this.AddService.AddSeviceclivking();
    logger.info("Successfully clicked on Add Service button");
});

When(
    'Enter the {string} and {string}',
    async function (this: BugFinder, ServiceName: string, Description: string) {
        logger.info(`Entering Service Name: ${ServiceName} and Description: ${Description}`);
        await this.AddService.Enteringthedetailsing(ServiceName, Description);
        logger.info("Successfully entered Service details");
    }
);

When('Click on the Create Service', async function (this: BugFinder) {
    logger.info("Clicking on Create Service button");
    await this.AddService.CreateingServiceing();
    logger.info("Successfully clicked on Create Service button");
});

Then(
    'A pop notification will come for Service successfully created',
    async function (this: BugFinder) {
        logger.info("Verifying Service Created notification");
        await this.AddService.VerifyServiceCreatedPopup();
        logger.info("Service Created notification verified successfully");
    }
);

Then('The user did not see the notification', async function (this: BugFinder) {
    logger.info("Verifying notification is not displayed");
    await this.AddService.VerifyNotificationNotDisplayed();
    logger.info("Verified notification is not displayed");
});

const valid = dyanamicsearchdata.valid;
const invalid = dyanamicsearchdata.invalid;

When('the user enter valid Service type in the search bar', async function (this: BugFinder) {
    logger.info(`Searching with valid Service Type: ${valid.serviceType}`);
    await this.AddService.Searchdataindyamic(valid.serviceType);
    logger.info("Valid Service Type entered successfully");
});

When('the user enter invalid Service type in the search bar', async function (this: BugFinder) {
    logger.info(`Searching with invalid Service Type: ${invalid.serviceType}`);
    await this.AddService.Searchdataindyamic(invalid.serviceType);
    logger.info("Invalid Service Type entered successfully");
});

Then('the Service Should properly display', async function (this: BugFinder) {
    logger.info("Verifying search results for valid Service Type");
    await this.AddService.validateSearchdata(valid.serviceType);
    logger.info("Valid Service search results verified successfully");
});

Then('the Service Should get the message for No services found matching your search for invalid data', async function (this: BugFinder) {
    logger.info("Verifying 'No services found' message for invalid search");
    await this.AddService.validateNoSearchDataFound();
    logger.info("'No services found' message verified successfully");
});