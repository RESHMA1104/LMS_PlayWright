// fill (), click(), textContent(), url, tobeVisible(), haveText(), toBe(), toContain(), toContainText(), allTextContent(), count()

import { expect, Locator, Page } from "@playwright/test";

export class BasePage {

    async fill(locator: Locator, value: string) {
        await locator.isVisible();
        await locator.fill(value);
    }

    async click(locator: Locator) {
        await locator.isEnabled();
        await locator.click();
    }

    async getText(locator: Locator) {
        await locator.isVisible();
        return await locator.textContent();
    }

    async getUrl(page: Page) {
        return await page.url();
    }

    async elementVisible(locator: Locator) {
        await locator.isVisible();
        return await locator.isVisible();
    }

    async toHaveText(locator: Locator, value: string) {
        await locator.isVisible();
        return await expect(locator).toHaveText(value);
    }

    async toBe(locator: Locator, value: string) {
        await locator.isVisible();
        return await expect(locator).toBe(value);
    }

    async toContainText(locator: Locator, value: string) {
        await locator.isVisible();
        return await expect(locator).toContainText(value);
    }
    async toContain(locator: Locator, value: string) {
        await locator.isVisible();
        return await expect(locator.textContent()).toContain(value);
    }

    async allTextContent(locator: Locator) {
        await locator.isVisible();
        return await locator.allTextContents();
    }

    async count(locator: Locator) {
        await locator.isVisible();
        return await locator.count();
    }

    async checkTheBox(locator: Locator) {
        await locator.isVisible();
        await locator.check();
    }
    async clear(locator: Locator) {
        await locator.isVisible();
        await locator.clear();
    }

    async getInnerText(locator: Locator) {
        await locator.isVisible();
        return await locator.innerText();
    }

    async allInnerText(locator: Locator) {
        await locator.isVisible();
        return await locator.allInnerTexts();
    }

    async domClick(locator: Locator) {
        await locator.isVisible();
        await locator.evaluate((element: HTMLElement) => element.click());
    }

    async selectDDOptionByValue(locator: Locator, option: string) {
        await locator.isEnabled();
        await locator.selectOption({ value: option });
    }
}