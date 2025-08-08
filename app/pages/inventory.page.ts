import { expect } from '@playwright/test';
import { step } from '../../utils/step-decorator';
import { AppPage } from '../base.page';

export class Inventory extends AppPage {
  private productCardSelector = '.inventory_item';
  private productNameSelector = '.inventory_item_name';
  private productDescriptionSelector = '.inventory_item_desc';
  private productPriceSelector = '.inventory_item_price';
  private productAddToCartButtonSelector = 'button.btn_inventory';

  @step()
  async expectLoaded(): Promise<void> {
    await expect(this.page.locator(this.productCardSelector).first()).toBeVisible();
    const productCount = await this.page.locator(this.productCardSelector).count();
    expect(productCount).toBeGreaterThan(2);
  }

  @step()
  async validateAllProducts(): Promise<void> {
    const productCards = this.page.locator(this.productCardSelector);
    const count = await productCards.count();

    expect(count).toBeGreaterThan(0);

    const validations = [];
    for (let i = 0; i < count; i++) {
      const product = productCards.nth(i);
      validations.push(expect(product.locator(this.productNameSelector)).toHaveText(/.+/));
      validations.push(expect(product.locator(this.productDescriptionSelector)).toHaveText(/^.{10,}$/));
      validations.push(expect(product.locator(this.productPriceSelector)).toHaveText(/^\$\d+\.\d{2}$/));
      validations.push(expect(product.locator(this.productAddToCartButtonSelector)).toBeVisible());
    }
    await Promise.all(validations);
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

  // TODO: Bulk method of adding products
  // @step()
  // async addProductsToCart(names: string[]) {
  //   for (const name of names) {
  //     await this.addProductToCart(name);
  //   }
  // }

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
