import { expect } from '@playwright/test';
import { AppPage } from '../base.page';
import { step } from '../utils/step-decorator';

export class ProductDetails extends AppPage {
  private invName = this.page.getByTestId('inventory-item-name');
  private invDescription = this.page.getByTestId('inventory-item-desc');
  private invPrice = this.page.getByTestId('inventory-item-price');
  private addToCartButton = this.page.getByTestId('add-to-cart');
  private removeButton = this.page.getByTestId('remove');

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      expect(this.invName).toBeVisible(),
      expect(this.invDescription).toBeVisible(),
      expect(this.invPrice).toBeVisible(),
      expect(this.addToCartButton).toBeVisible(),
    ]);
  }

  @step()
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  @step()
  async expectButtonLabel(label: 'Add to cart' | 'Remove'): Promise<void> {
    if (label === 'Add to cart') {
      await expect(this.addToCartButton).toHaveText('Add to cart');
      await expect(this.removeButton).toBeHidden();
    } else {
      await expect(this.removeButton).toHaveText('Remove');
      await expect(this.addToCartButton).toBeHidden();
    }
  }

  @step()
  async expectItemDescription(descriptionValue: string): Promise<void> {
    await expect(this.invDescription).toContainText(descriptionValue);
  }

  @step()
  async expectItemPrice(priceValue: string): Promise<void> {
    await expect(this.invPrice).toContainText(priceValue);
  }
}
