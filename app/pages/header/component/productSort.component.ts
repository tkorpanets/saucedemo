import { expect } from '@playwright/test';
import { step } from '../../../../utils/step-decorator';
import { AppComponent } from '../../../base.page';

export class ProductSort extends AppComponent {
  private readonly sortDropdown = this.page.locator('select[data-test="product-sort-container"]');

  @step()
  async expectLoaded(): Promise<void> {
    await expect(this.sortDropdown).toBeVisible();
  }

  @step()
  async sortBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption({ label: option });
  }
}
