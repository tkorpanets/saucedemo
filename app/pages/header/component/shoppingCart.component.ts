import { expect } from '@playwright/test';
import { step } from '../../../utils/step-decorator';
import { AppComponent } from '../../../base.page';

export class ShoppingCart extends AppComponent {
  private shoppingCartIcon = this.page.locator('.shopping_cart_link');
  private shoppingCartBadge = this.page.locator('.shopping_cart_badge');

  @step()
  async expectLoaded(): Promise<void> {
    await expect(this.shoppingCartIcon).toBeVisible();
  }

  @step()
  async expectBadgeCount(count: number): Promise<void> {
    await expect(this.shoppingCartBadge).toHaveText(String(count));
  }

  @step()
  async expectNoBadge(): Promise<void> {
    await expect(this.shoppingCartBadge).not.toBeVisible();
  }

  @step()
  async openCart(): Promise<void> {
    await this.shoppingCartIcon.click();
  }
}
