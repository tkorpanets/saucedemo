import { expect } from '@playwright/test';

import { AppPage } from '../../../abstractClasses';
import { step } from '../../../../misc/step';

export class ShoppingCart extends AppPage {
  private shoppingCartBadge = this.page.locator('.shopping_cart_badge');
  private shoppingCartLink = this.page.locator('.shopping_cart_link');

  @step()
  async verifyShoppingCartBadge(state: 'visible' | 'notVisible', count?: string): Promise<void> {
    if (state === 'visible' && count !== undefined) {
      await expect(this.shoppingCartBadge).toHaveText(count);
    } else if (state === 'notVisible') {
      await expect(this.shoppingCartBadge).not.toBeVisible();
    }
  }

  @step()
  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}
