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
    await this.courseManagement.click();
    await this.addCourse.click();
  }

  async clickAddCourse() {
    await this.addCourse.click();
  }

  async clickNext() {
    await this.nextBtn.click();
  }

  async validateWarningMessages() {
    await expect(this.clientError).toBeVisible();
    await expect(this.typeError).toBeVisible();
    await expect(this.modelError).toBeVisible();
    await expect(this.categoryError).toBeVisible();
    await expect(this.nameError).toBeVisible();
  }

  async selectDropdown(index: number, value: string) {
    
    const dropdown = this.page.locator('button[role="combobox"]').nth(index);

    await dropdown.click();

    await this.page
        .locator('[role="option"]')
        .filter({ hasText: value })
        .first()
        .click();

    await expect(dropdown).toContainText(value);
    }

  async validateNextPage() {
    await expect(this.courseImage).toBeVisible();
  }
}