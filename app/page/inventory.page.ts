import { expect } from '@playwright/test';
import { step } from '../../misc/step';
import { AppPage } from '../abstractClasses';

export class Inventory extends AppPage {
  private readonly productCardSelector = '.inventory_item';
  private readonly productNameSelector = '.inventory_item_name';
  private readonly productDescriptionSelector = '.inventory_item_desc';
  private readonly productPriceSelector = '.inventory_item_price';
  private readonly productAddToCartButtonSelector = 'button.btn_inventory';

  @step()
  async validateAllProducts(): Promise<void> {
    const productCards = this.page.locator(this.productCardSelector);
    const count = await productCards.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const product = productCards.nth(i);
      const name = product.locator(this.productNameSelector);
      const description = product.locator(this.productDescriptionSelector);
      const price = product.locator(this.productPriceSelector);
      const addToCartButton = product.locator(this.productAddToCartButtonSelector);

      await expect(name).toHaveText(/.+/);
      await expect(description).toHaveText(/^.{10,}$/);
      await expect(price).toHaveText(/^\$\d+\.\d{2}$/);
      await expect(addToCartButton).toBeVisible();
    }
  }

  @step()
  async getItemPrice(productName: string): Promise<string> {
    const price = this.page
      .locator(this.productCardSelector)
      .filter({ hasText: productName })
      .locator(this.productPriceSelector);

    return (await price.textContent()) as string;
  }

  @step()
  async addProductToCart(productName: string): Promise<void> {
    const button = this.page
      .locator(this.productCardSelector)
      .filter({ hasText: productName })
      .locator(this.productAddToCartButtonSelector);

    await button.click();
  }

  @step()
  async getAllProductPrices(): Promise<number[]> {
    const priceLocators = this.page.locator(this.productPriceSelector);
    const count = await priceLocators.count();
    const prices: number[] = [];

    for (let i = 0; i < count; i++) {
      const text = await priceLocators.nth(i).textContent();
      if (text) {
        prices.push(parseFloat(text.replace('$', '')));
      }
    }

    return prices;
  }

  @step()
  async checkSortingByPrice(sortOrder: 'low to high' | 'high to low'): Promise<void> {
    let sorted: number[] = [];
    const prices = await this.getAllProductPrices();
    if (sortOrder === 'low to high') {
      sorted = [...prices].sort((a, b) => a - b);
    } else if (sortOrder === 'high to low') {
      sorted = [...prices].sort((a, b) => b - a);
    }
    expect(prices).toEqual(sorted);
  }
}
