import { expect } from '@playwright/test';

import { step } from '../../../misc/step';
import { AppPage } from '../../abstractClasses';

import { ShoppingCart } from '../header/component/shoppingCart.component';
import { ProductSort } from './component/productSort.component';

export class Header extends AppPage {
  public shoppingCart = new ShoppingCart(this.page);
  public sort = new ProductSort(this.page);

  private appLogo = this.page.locator('.app_logo', { hasText: 'Swag Labs' });
  private title = this.page.locator('.title', { hasText: 'Products' });

  @step()
  async expectLoaded() {
    await expect(this.appLogo).toBeVisible();
    await expect(this.title).toBeVisible();
  }
}
