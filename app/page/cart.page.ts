import { expect } from '@playwright/test';
import { AppPage } from '../abstractClasses';
import { step } from '../../misc/step';

export class Cart extends AppPage {
  private price = (productName: string) =>
    this.page.locator('div.cart_item').filter({ hasText: productName }).locator('div.inventory_item_price');

  private buttonRemove = (productName: string) =>
    this.page.locator('div.cart_item').filter({ hasText: productName }).getByRole('button', { name: 'Remove' });

  private buttonContinueShopping = this.page.getByRole('button', { name: 'Continue Shopping' });

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
  async clickButtonContinueShopping() {
    await this.buttonContinueShopping.click();
  }
}
