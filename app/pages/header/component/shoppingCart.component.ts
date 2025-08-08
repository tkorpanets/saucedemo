import { expect } from '@playwright/test';
import { step } from '../../../../utils/step-decorator';
import { AppComponent } from '../../../base.page';

export class ShoppingCart extends AppComponent {
  private readonly shoppingCartIcon = this.page.locator('.shopping_cart_link');
  private readonly shoppingCartBadge = this.page.locator('.shopping_cart_badge');

  @step()
  async expectLoaded(): Promise<void> {
    await expect(this.shoppingCartIcon).toBeVisible();
  }

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
    await this.shoppingCartIcon.click();
  }
}
