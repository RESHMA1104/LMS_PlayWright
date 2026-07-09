import { expect, Locator, Page } from '@playwright/test';
import path from 'path';
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
  private courseLevelError: Locator;
  private courseHierarchyError: Locator;
  private resourceTypeError: Locator;
  private invalidImageToast: Locator;
  private imageupload: Locator;

  private previewCreateBtn: Locator;
  private courseImage: Locator;
  private resourcetypeBtn: Locator;
  private iDoBtn: Locator;
  private weDobtn : Locator;
  private youDo: Locator;
  private onState: Locator

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
    this.courseLevelError = page.getByText('Please select a course level');
    this.courseHierarchyError = page.getByText(
      'Please select at least one course hierarchy option'
    );
    this.resourceTypeError = page.getByText(
      'Please select at least one resource type'
    );

    this.imageupload = page.locator("input[type='file']").first();
    this.invalidImageToast = page.getByText(
      'Only JPEG, JPG, PNG, and WebP formats are allowed'
    );
    this.previewCreateBtn = page.locator("//div[@class = 'flex gap-1.5']//button[text() = 'Preview & Create']")
    this.courseImage = page.getByText('Course Image');

    this.resourcetypeBtn = page.locator("//button[@role='switch']");
    this.iDoBtn = page.getByRole('button', { name: 'I Do' });
    this.weDobtn = page.getByRole('button', { name: 'We Do' });
    this.youDo = page.getByRole('button', { name: 'You Do' });

    this.onState = page.locator("//span[text()= 'On']");
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

  async selectMultiDropdownPedagogy(index: number, value: string) {
    const dropdown = this.page.locator('button[role="combobox"]').nth(index);

    await dropdown.click();

    const listBox = this.page.locator('[role="listbox"]').last();

    const label = listBox.locator('label').filter({ hasText: value }).first();

    await label.click();

    await expect(
      this.page.getByText(new RegExp(`\\d+\\.\\s*${value}`))
    ).toBeVisible({ timeout: 10000 });
  }

  async validatePedagogyValue(value: string) {
    await expect(
      this.page.locator('span.font-medium').filter({ hasText: value }).last()
    ).toBeVisible();
  }


  async click_preview_create() {
    await this.previewCreateBtn.click();
  }

  async invalid_prview_create() {
    await expect(this.courseLevelError).toBeVisible({ timeout: 10000 });

    await expect(this.courseHierarchyError).toBeVisible({ timeout: 10000 });

    const resourceErrorVisible = await this.resourceTypeError
      .isVisible()
      .catch(() => false);

    if (!resourceErrorVisible) {
      console.log('Resource type error not visible');
    }
  }

  async invalid_image() {
    const filePath = path.resolve(process.cwd(), 'test-data', 'epic-2.docx');

    await this.imageupload.setInputFiles(filePath);

    await expect(this.invalidImageToast).toBeVisible({ timeout: 10000 });
  }

 async resourceTypeAdd(buttons: number[], resourceName: string) {
  if (resourceName === 'I Do') {
    await this.iDoBtn.click();
  } else if (resourceName === 'We Do') {
    await this.weDobtn.click();
  } else if (resourceName === 'You Do') {
    await this.youDo.click();
  } else {
    throw new Error(`Invalid resource name: ${resourceName}`);
  }

  for (const index of buttons) {
    const toggle = this.resourcetypeBtn.nth(index);

    const isOn = await toggle.getAttribute('aria-checked');

    if (isOn !== 'true') {
      await toggle.click();
    }

    await expect(toggle).toHaveAttribute('aria-checked', 'true', {
      timeout: 10000,
    });

    console.log(resourceName, index);
  }
}

async validateResourceTypeOnState() {
  const selectedSwitches = this.page.locator("button[role='switch'][aria-checked='true']");

  await expect(selectedSwitches).toHaveCount(1);
}


}