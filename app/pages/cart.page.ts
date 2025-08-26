import { expect } from '@playwright/test';
import { AppPage } from '../base.page';
import { step } from '../../utils/step-decorator';

export class Cart extends AppPage {
  private cartQuantityLabel = this.page.getByTestId('cart-quantity-label');
  private cartDescLabel = this.page.getByTestId('cart-desc-label');
  private continueShoppingButton = this.page.getByTestId('continue-shopping');
  private checkoutButton = this.page.getByTestId('checkout');
  private cartItems = this.page.locator('div.cart_item');

  private productCard = (productName: string) => this.page.locator('div.cart_item').filter({ hasText: productName });
  private price = (productName: string) => this.productCard(productName).locator('div.inventory_item_price');
  private buttonRemove = (productName: string) => this.productCard(productName).getByRole('button', { name: 'Remove' });

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      expect(this.cartQuantityLabel).toHaveText('QTY'),
      expect(this.cartDescLabel).toHaveText('Description'),
      expect(this.continueShoppingButton).toBeVisible(),
      expect(this.checkoutButton).toBeVisible(),
    ]);
  }

  @step()
  async expectItemPrice(productName: string, priceValue: string): Promise<void> {
    await expect(this.price(productName)).toHaveText(priceValue);
  }

  @step()
  async removeProduct(productName: string): Promise<void> {
    await this.buttonRemove(productName).click();
    await expect(this.buttonRemove(productName)).not.toBeVisible();
  }

  @step()
  async clickContinueShoppingButton(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  @step()
  async expectProductsCount(expectItemCount: number): Promise<void> {
    const actualItemCount = await this.page.locator('div.cart_item').count();
    expect(actualItemCount).toBe(expectItemCount);
  }

  @step()
  async expectNoItems(): Promise<void> {
    expect(await this.cartItems.count()).toBe(0);
  }

  // @step('Availability of a specific product')
  // async expectProductInCart(productName: string) {
  //   await expect(this.productCard(productName)).toBeVisible();
  // }
}
