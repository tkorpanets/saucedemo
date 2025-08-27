import { expect } from '@playwright/test';
import { step } from '../../../utils/step-decorator';
import { AppComponent } from '../../../base.page';
import { SortByValue } from '../../../types/sorting';

export class ProductSort extends AppComponent {
  private sortDropdown = this.page.locator('select[data-test="product-sort-container"]');

  @step()
  async expectLoaded(): Promise<void> {
    await expect(this.sortDropdown).toBeVisible();
  }

  @step()
  async sortBy(option: SortByValue): Promise<void> {
    await this.sortDropdown.selectOption({ label: option });
  }
}
