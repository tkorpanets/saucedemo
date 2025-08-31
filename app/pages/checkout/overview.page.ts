import { expect } from '@playwright/test';
import { AppPage } from '../../base.page';

type PriceTotalParams = {
  itemTotal: number; // сума товарів з inventory.sumPrices(...)
  taxRate: number; // наприклад 0.08 (8%)
  labels: {
    priceTotal: string; // "Price Total"
    itemTotal: string; // "Item total:"
    tax: string; // "Tax:"
    total: string; // "Total:"
  };
};

export class Overview extends AppPage {
  private cartQuantityLabel = this.page.getByTestId('cart-quantity-label');
  private cartDescLabel = this.page.getByTestId('cart-desc-label');
  private labelPaymentInfo = this.page.getByTestId('payment-info-label');
  private valuePaymentInfo = this.page.getByTestId('payment-info-value');
  private labelShippingInfo = this.page.getByTestId('shipping-info-label');
  private valueShippingInfo = this.page.getByTestId('shipping-info-value');
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

  async expectedPaymentInfo(expectedLabelPayInfo: string, expectedValuePayInfo: string) {
    await expect(this.labelPaymentInfo).toContainText(expectedLabelPayInfo);
    await expect(this.valuePaymentInfo).toContainText(expectedValuePayInfo);
  }

  async expectedShippingInfo(expectedLabelShipInfo: string, expectedValueShipInfo: string) {
    await expect(this.labelShippingInfo).toContainText(expectedLabelShipInfo);
    await expect(this.valueShippingInfo).toContainText(expectedValueShipInfo);
  }

  async expectPriceTotal({ itemTotal, taxRate, labels }: PriceTotalParams) {
    await expect(this.labelPriceTotal).toContainText(labels.priceTotal);
    await expect(this.subtotalLabel).toContainText(labels.itemTotal);
    await expect(this.subtotalLabel).toContainText(itemTotal.toFixed(2));
    const expectedTax = Number((itemTotal * taxRate).toFixed(2));
    await expect(this.taxLabel).toContainText(labels.tax);
    await expect(this.taxLabel).toContainText(expectedTax.toFixed(2));
    const expectedTotal = Number((itemTotal + expectedTax).toFixed(2));
    await expect(this.totalLabel).toContainText(labels.total);
    await expect(this.totalLabel).toContainText(expectedTotal.toFixed(2));
  }
}
