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
  private weDobtn: Locator;
  private youDo: Locator;
  private onState: Locator;

  private courseId: Locator;
  private description: Locator;
  private moduleClick: Locator;
  private submoduleClick: Locator;
  private topicClick: Locator;
  private skillSet: Locator;
  private saveBtn: Locator;

  private courseLayoutPreviewHeading: Locator;
  private yesAddNowBtn: Locator;

  // Tracks every combobox trigger button opened by
  // selectMultiDropdownPedagogy during a scenario. Multiple pedagogy
  // dropdowns (I Do / We Do / You Do) can be open AT THE SAME TIME - this
  // is not a single "last opened" situation. None of them dismiss on
  // outside click, and Escape must not be used here: focus is inside the
  // popup, and Escape bubbles up to the app's routing and triggers a
  // browser back-navigation instead of closing the popover. The only
  // reliable close mechanism is re-clicking each dropdown's own trigger
  // button.
  private openPedagogyDropdowns: Locator[] = [];

  // Confirmed manually: clicking this heading 3 times in a row is what
  // actually closes a stuck-open pedagogy dropdown when re-clicking the
  // trigger button alone isn't enough.
  private pedagogyHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.courseManagement = page.locator("//div[@title='Course Management']");

    // 'Add Course' also substring-matches 'Add Course Structure' buttons
    // in the course table rows, so this must be an exact match.
    this.addCourse = page.getByRole('button', { name: 'Add Course', exact: true });

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
    this.previewCreateBtn = page.locator(
      "//div[@class = 'flex gap-1.5']//button[text() = 'Preview & Create']"
    );
    this.courseImage = page.getByText('Course Image');

    this.resourcetypeBtn = page.locator("//button[@role='switch']");
    this.iDoBtn = page.getByRole('button', { name: 'I Do' });
    this.weDobtn = page.getByRole('button', { name: 'We Do' });
    this.youDo = page.getByRole('button', { name: 'You Do' });

    this.onState = page.locator("//span[text()= 'On']");

    this.courseId = page.locator('//input[@readonly]').first();
    this.description = page.locator("//div[@contenteditable = 'true']//p");
    this.moduleClick = page.locator("//input[@id = 'module-checkbox']");
    this.submoduleClick = page.locator("//input[@id = 'submodule-checkbox']");
    this.topicClick = page.locator("//input[@id = 'topic-checkbox']");

    this.skillSet = page.locator(
      "//div[@class = 'flex flex-wrap gap-2 pl-6']//input[@type = 'checkbox']"
    );

    this.saveBtn = page.locator("//button[text() = ' Save Course Layout']");

    // Two <h2> elements share this text: one is a visually-hidden Radix
    // dialog title (class 'sr-only', for screen readers), one is the real
    // visible heading. .last() picks the visible one based on DOM order
    // observed in the strict-mode violation (element #2 had real styling
    // classes, element #1 was sr-only).
    this.courseLayoutPreviewHeading = page
      .getByRole('heading', { name: 'Course Layout Preview' })
      .last();

    this.yesAddNowBtn = page.getByRole('button', { name: 'Yes, Add now' });

    this.pedagogyHeading = page.locator("//h3[text() = ' Pedagogy']");
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

    // Only open the dropdown if it isn't already open. Re-clicking an
    // already-open combobox trigger toggles it CLOSED.
    const isExpanded = await dropdown.getAttribute('aria-expanded');
    if (isExpanded !== 'true') {
      await dropdown.click();

      // Track this trigger so closeOpenPedagogyDropdown() can close it
      // later. Multiple different dropdowns (I Do / We Do / You Do) can
      // end up open at the same time, so we keep all of them, not just
      // the most recent.
      this.openPedagogyDropdowns.push(dropdown);
    }

    const listBox = this.page.locator('[role="listbox"]').last();

    const label = listBox.locator('label').filter({ hasText: value }).first();

    await label.click();

    await expect(
      this.page.getByText(new RegExp(`\\d+\\.\\s*${value}`))
    ).toBeVisible({ timeout: 10000 });
  }

  /**
   * Closes every pedagogy multi-select dropdown opened by
   * selectMultiDropdownPedagogy during selection. These dropdowns don't
   * auto-close when a different one is opened - multiple can be open at
   * once (I Do and We Do simultaneously open, confirmed via screenshot) -
   * and they don't dismiss on outside click. Escape is deliberately NOT
   * used: since focus sits inside the popup, Escape gets picked up by the
   * app's router and triggers a browser back-navigation instead of
   * closing the popover. The only reliable close mechanism is re-clicking
   * each dropdown's own trigger button, which toggles aria-expanded back
   * to false.
   */
  async closeOpenPedagogyDropdown() {
    for (const dropdown of this.openPedagogyDropdowns) {
      const expanded = await dropdown.getAttribute('aria-expanded').catch(() => null);

      if (expanded === 'true') {
        await dropdown.click();

        await expect(dropdown)
          .toHaveAttribute('aria-expanded', 'false', { timeout: 5000 })
          .catch(() => {
            console.log(
              'Warning: pedagogy dropdown did not report aria-expanded=false after re-click.'
            );
          });
      }
    }

    this.openPedagogyDropdowns = [];

    // Final safety check - if the trigger re-click didn't close
    // everything, fall back to the mechanism confirmed to work manually:
    // clicking the Pedagogy heading 3 times in a row.
    let remainingOpen = this.page.locator('[role="listbox"]');
    let stillHasOpen = await this.anyListboxVisible(remainingOpen);

    if (stillHasOpen) {
      for (let attempt = 0; attempt < 3; attempt++) {
        await this.pedagogyHeading.click();
      }

      remainingOpen = this.page.locator('[role="listbox"]');
      stillHasOpen = await this.anyListboxVisible(remainingOpen);
    }

    if (stillHasOpen) {
      console.log('Warning: a pedagogy listbox is still open after closeOpenPedagogyDropdown().');
    }
  }

  /**
   * Returns true if any element in the given locator is currently
   * visible on the page.
   */
  private async anyListboxVisible(listboxes: Locator): Promise<boolean> {
    const count = await listboxes.count();

    for (let i = 0; i < count; i++) {
      if (await listboxes.nth(i).isVisible().catch(() => false)) {
        return true;
      }
    }

    return false;
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
    // Make sure nothing is covering the I Do / We Do / You Do buttons
    // before we try to click them.
    await this.closeOpenPedagogyDropdown();

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
    const selectedSwitches = this.page.locator(
      "button[role='switch'][aria-checked='true']"
    );

    await expect(selectedSwitches).toHaveCount(1);
  }

  // ---- Newly added methods to support the missing feature steps ----

  /**
   * Selects the course level from a combobox dropdown, driven by Sheet3
   * of CourseData.xlsx (index 0 -> nth(0) combobox, value "Intermediate").
   * Reuses the same generic selectDropdown method as the basic
   * configuration dropdowns.
   */
  async selectCourseLevel(index: number, value: string) {
    await this.selectDropdown(index, value);
  }

  /**
   * Uploads a valid course image (jpg/png/webp) via the same file input
   * used by invalid_image().
   */
  async uploadCourseImage(fileName: string) {
    const filePath = path.resolve(process.cwd(), 'test-data', fileName);
    await this.imageupload.setInputFiles(filePath);
  }

  /**
   * Enters the course description text.
   */
  async enterCourseDescription(text: string) {
    await this.fill(this.description, text);
    await this.toBeVisible(this.description);
  }

  /**
   * Selects module, submodule and topic checkboxes that make up the
   * course hierarchy.
   */
  async selectCourseHierarchy() {
    await this.click(this.moduleClick);
    await this.click(this.submoduleClick);
    await this.click(this.topicClick);
  }

  /**
   * Selects skill set checkboxes by index.
   */
  async selectSkillSet(indices: number[]) {
    for (const i of indices) {
      await this.click(this.skillSet.nth(i));
    }
  }

  /**
   * Confirms the "Course Layout Preview" panel/modal is visible after
   * clicking Preview & Create.
   */
  async validateCourseLayoutPreview() {
    await expect(this.courseLayoutPreviewHeading).toBeVisible({
      timeout: 10000,
    });
  }

  /**
   * Clicks the "Save Course Layout" button.
   */
  async clickSaveCourseLayout() {
    await this.click(this.saveBtn);
  }

  /**
   * Waits for the "Yes, Add now" confirmation button to be visible and
   * clicks it to finish course creation.
   */
  async confirmAddCourse() {
    await expect(this.yesAddNowBtn).toBeVisible({ timeout: 10000 });
    await this.click(this.yesAddNowBtn);
  }

  /**
   * Optional convenience method that chains the individual steps above
   * into a single end-to-end flow. Not wired up to any Cucumber step by
   * default (the feature file drives the granular methods instead), but
   * kept - now with valid syntax - in case it's useful for a
   * non-BDD/smoke test.
   */
  async endtoend(
    dropdownIndex: number,
    dropdownValue: string,
    description: string,
    skillset: number[],
    resourceTypes: { buttons: number[]; resourceName: string }[]
  ) {
    await this.selectDropdown(dropdownIndex, dropdownValue);

    const filePath = path.resolve(process.cwd(), 'test-data', 'batman.jpg');
    await this.imageupload.setInputFiles(filePath);

    await this.enterCourseDescription(description);

    await this.selectCourseHierarchy();

    for (const resource of resourceTypes) {
      await this.resourceTypeAdd(resource.buttons, resource.resourceName);
    }

    await this.selectSkillSet(skillset);

    await this.click_preview_create();

    await this.click(this.saveBtn);
  }
}