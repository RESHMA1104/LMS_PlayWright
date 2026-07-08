import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddCourse extends BasePage {
  private courseManagement: Locator;
  private addCourse: Locator;
  private nextBtn: Locator;

  private clientError: Locator;
  private typeError: Locator;
  private modelError: Locator;
  private categoryError: Locator;
  private nameError: Locator;

  
  private courseImage: Locator;

  constructor(page: Page) {
    super(page);

    this.courseManagement = page.locator("//div[@title='Course Management']");
    this.addCourse = page.getByRole('button', { name: 'Add Course' });
    this.nextBtn = page.getByRole('button', { name: 'Next' });

    this.clientError = page.getByText('Please select a client');
    this.typeError = page.getByText('Please select a service type');
    this.modelError = page.getByText('Please select a service model');
    this.categoryError = page.getByText('Please select a course category');
    this.nameError = page.getByText('Please enter a course name');

    this.courseImage = page.getByText('Course Image');
  }

  async commonMethod() {
    await this.click(this.courseManagement);
    await this.click(this.addCourse);
  }

  async clickAddCourse() {
    await this.click(this.addCourse);
  }

  async clickNext() {
    await this.click(this.nextBtn);
  }

  async validateWarningMessages() {
    await this.toBeVisible(this.clientError);
    await this.toBeVisible(this.typeError);
    await this.toBeVisible(this.modelError);
    await this.toBeVisible(this.categoryError);
    await this.toBeVisible(this.nameError);
  }

  async selectDropdown(index: number, value: string) {
    const dropdown = this.page.locator('button[role="combobox"]').nth(index);

    await this.click(dropdown);

    await this.page
      .locator('[role="option"]')
      .filter({ hasText: value })
      .first()
      .click();

    await this.toContainText(dropdown, value);
  }

  async validateNextPage() {
    await this.toBeVisible(this.courseImage);
  }

 async selectMultiDropdownPedagogy(index: number, value: string) {
  const dropdown = this.page
    .locator('button[role="combobox"]')
    .nth(index);

    await dropdown.click();

    const listBox = this.page.locator('[role="listbox"]').last();

    const label = listBox
      .locator('label')
      .filter({ hasText: value })
      .first();

      await label.click();

      await expect(
      this.page.getByText(new RegExp(`\\d+\\.\\s*${value}`))
      ).toBeVisible({ timeout: 10000 });
  }


  async validatePedagogyValue(value: string) {
  await expect(
      this.page.locator('span.font-medium')
        .filter({ hasText: value })
        .last()
    ).toBeVisible();
  }
}