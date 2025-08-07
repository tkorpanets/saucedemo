import { expect } from '@playwright/test';

import { step } from '../../../../misc/step';
import { AppPage } from '../../../abstractClasses';

export class ProductSort extends AppPage {
  private sortDropdown = this.page.locator('select[data-test="product-sort-container"]');

  @step()
  async expectLoaded() {
    await expect(this.sortDropdown).toBeVisible();
  }

  @step()
  async sortBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption({ label: option });
  }
}
