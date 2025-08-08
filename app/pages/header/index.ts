import { expect } from '@playwright/test';

import { step } from '../../../utils/step-decorator';
import { AppPage } from '../../base.page';

import { ShoppingCart } from './component/shoppingCart.component';
import { ProductSort } from './component/productSort.component';

export class Header extends AppPage {
  public shoppingCart = new ShoppingCart(this.page);
  public productSort = new ProductSort(this.page);

  private readonly appLogo = this.page.locator('.app_logo', { hasText: 'Swag Labs' });
  private readonly title = this.page.locator('.title', { hasText: 'Products' });

  @step()
  async expectLoaded(): Promise<void> {
    await expect(this.appLogo).toBeVisible();
    await expect(this.title).toBeVisible();
  }
}
