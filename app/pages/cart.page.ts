import { expect } from '@playwright/test';
import { AppPage } from '../base.page';
import { step } from '../../utils/step-decorator';

export class Cart extends AppPage {
  private readonly cartQuantityLabel = this.page.getByTestId('cart-quantity-label');
  private readonly cartDescLabel = this.page.getByTestId('cart-desc-label');
  private readonly continueShoppingButton = this.page.getByTestId('continue-shopping');
  private readonly checkoutButton = this.page.getByTestId('checkout');

  private readonly price = (productName: string) =>
    this.page.locator('div.cart_item').filter({ hasText: productName }).locator('div.inventory_item_price');
  private readonly buttonRemove = (productName: string) =>
    this.page.locator('div.cart_item').filter({ hasText: productName }).getByRole('button', { name: 'Remove' });
  private readonly buttonContinueShopping = this.page.getByRole('button', { name: 'Continue Shopping' });

  @step()
  async expectLoaded(): Promise<void> {
    await expect(this.cartQuantityLabel).toHaveText('QTY');
    await expect(this.cartDescLabel).toHaveText('Description');
    await expect(this.continueShoppingButton).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
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
  async clickButtonContinueShopping(): Promise<void> {
    await this.buttonContinueShopping.click();
  }
}
