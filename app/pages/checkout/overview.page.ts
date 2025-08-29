import { expect } from '@playwright/test';
import { AppPage } from '../../base.page';

export class Overview extends AppPage {
  private cartQuantityLabel = this.page.getByTestId('cart-quantity-label');
  private cartDescLabel = this.page.getByTestId('cart-desc-label');
  private labelPaymentInfo = this.page.getByTestId('payment-info-label');
  private labelShippingInfo = this.page.getByTestId('shipping-info-label');
  private labelPriceTotal = this.page.getByTestId('total-info-label');
  private labelTotal = this.page.getByTestId('total-label');
  private subtotalLabel = this.page.getByTestId('subtotal-label');
  private taxLabel = this.page.getByTestId('tax-label');
  private totalLabel = this.page.getByTestId('total-label');

  private cancelButton = this.page.getByTestId('cancel');
  private finishButton = this.page.getByTestId('finish');

  //   private productCard = (productName: string) => this.page.locator('div.cart_item').filter({ hasText: productName });
  //   private price = (productName: string) => this.productCard(productName).locator('div.inventory_item_price');

  async expectLoaded() {
    await Promise.all([
      expect(this.cartQuantityLabel).toBeVisible(),
      expect(this.cartDescLabel).toBeVisible(),
      expect(this.labelPaymentInfo).toBeVisible(),
      expect(this.labelShippingInfo).toBeVisible(),
      expect(this.labelPriceTotal).toBeVisible(),
      expect(this.labelTotal).toBeVisible(),
      expect(this.subtotalLabel).toBeVisible(),
      expect(this.taxLabel).toBeVisible(),
      expect(this.totalLabel).toBeVisible(),
      expect(this.cancelButton).toBeVisible(),
      expect(this.finishButton).toBeVisible(),
    ]);
  }

  async clickFinishButton() {
    await this.finishButton.click();
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }
}
