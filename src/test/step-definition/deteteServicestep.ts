import { When } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_finder";
import { logger } from "../../utils/logger";

When('click on the delete button', async function (this: BugFinder) {
    logger.info("Clicking on the Delete button");
    await this.deleteService.deleiconclicking()
});

When('the user click on the delete', async function (this: BugFinder) {
    logger.info("Clicking on the Delete confirmation button");
    await this.deleteService.Deleting()
});

When('the user See the notifucation for sucessfully delete', async function (this: BugFinder) {
    logger.info("Verifying the Service deleted successfully notification");
    await this.deleteService.popupchecking()
});