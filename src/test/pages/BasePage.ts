import { setDefaultTimeout } from "@cucumber/cucumber";
/*/*
    Reusable action methods all over the project....
*/

import { expect, Locator, Page, Download } from "@playwright/test";

export class BasePage {
    protected page: Page;

    // constructor to add Pages inside child class
    constructor(page: Page) {
        this.page = page;
    }



    // Fill inside the input field
    async fill(locator: Locator, value: string) {
        await locator.isVisible();
        await locator.fill(value);
    }

    // Click the locator
    async click(locator: Locator) {
        await locator.isVisible({ timeout: 30000 });
        await locator.click();
    }

    // GetText from the locator
    async getText(locator: Locator) {
        await locator.isVisible();
        return await locator.textContent();
    }

    // get the current URL
    async getUrl(page: Page) {
        return await page.url();
    }

    // Element to be Visible return boolean
    async elementVisible(locator: Locator) {
        await locator.isVisible();
        return await locator.isVisible();
    }

    // Assertion to HaveText
    async toHaveText(locator: Locator, value: string) {
        await locator.isVisible({ timeout: 30000 });
        return await expect(locator).toHaveText(value);
    }

    // Assertion to toBe
    async toBe(locator: Locator, value: string) {
        await locator.isVisible();
        return await expect(locator).toBe(value);
    }

    // To ContainText
    async toContainText(locator: Locator, value: string) {
        await locator.isVisible({ timeout: 90000 });
        return await expect(locator).toContainText(value);
    }

    // toContainValue
    async toContain(locator: Locator, value: string) {
        await locator.isVisible();
        return await expect(locator.textContent()).toContain(value);
    }


    // Return AlltextContent inside the text 
    async allTextContent(locator: Locator) {
        await locator.isVisible();
        return await locator.allTextContents();
    }

    // return the count of the value
    async count(locator: Locator) {
        await locator.isVisible();
        return await locator.count();
    }

    // click the checkBox
    async checkTheBox(locator: Locator) {
        await locator.scrollIntoViewIfNeeded();
        await locator.isVisible({ timeout: 60000 });
        await locator.check();
    }

    // Clear the input field
    async clear(locator: Locator) {
        await locator.isVisible();
        await locator.clear();
    }

    // Return the innerText
    async getInnerText(locator: Locator) {
        await locator.isVisible();
        return await locator.innerText();
    }

    // Return allInnerText
    async allInnerText(locator: Locator) {
        await locator.isVisible();
        return await locator.allInnerTexts();
    }

    // DOM Click 
    async domClick(locator: Locator) {
        await locator.isVisible();
        await locator.evaluate((element: HTMLElement) => element.click());
    }


    async selectDDOptionByValue(locator: Locator, option: string) {
        await locator.isEnabled();
        await locator.selectOption({ value: option });
    }

    async pressEnter(locator: Locator) {
        await locator.press("Enter");
    }

    async selectDropdownValues(dropdown: Locator, option: string) {
        await dropdown.click();
        await this.page.getByText(option, { exact: true }).click();
    }

    // Return True  when the locator is toBeVisible
    async toBeVisible(locator: Locator) {
        return await expect(locator).toBeVisible();
    }

    async waitForDownload(page: Page, clickLocator: Locator): Promise<Download> {
        const downloadPromise = page.waitForEvent("download");
        await this.click(clickLocator);
        return await downloadPromise;
    }

}