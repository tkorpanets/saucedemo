import { expect } from '@playwright/test';
import { step } from '../../utils/step-decorator';
import { AppPage } from '../base.page';
import { PriceSort, NameSort, SortByValue } from '../../types/sorting';

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

  @step()
  async addProductsToCart(names: string[]) {
    for (const name of names) {
      await this.addProductToCart(name);
    }
  }

  @step()
  async getAllProductPrices(): Promise<number[]> {
    const priceLocators = this.page.locator(this.productPriceSelector);
    const count = await priceLocators.count();
    const prices: number[] = [];
    for (let i = 0; i < count; i++) {
      const text = await priceLocators.nth(i).textContent();
      if (text) prices.push(parseFloat(text.replace('$', '')));
    }
    return prices;
  }

  @step()
  async checkSortingByPrice(sortOrder: PriceSort): Promise<void> {
    let sorted: number[] = [];
    const prices = await this.getAllProductPrices();
    if (sortOrder === 'Price (low to high)') {
      sorted = [...prices].sort((a, b) => a - b);
    } else if (sortOrder === 'Price (high to low)') {
      sorted = [...prices].sort((a, b) => b - a);
    }
    expect(prices).toEqual(sorted);
  }

  @step()
  async getAllProductNames(): Promise<string[]> {
    const nameLocators = this.page.locator(this.productNameSelector);
    const count = await nameLocators.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await nameLocators.nth(i).textContent();
      if (text) names.push(text);
    }
    return names;
  }

  @step()
  async checkSortingByName(sortOrder: NameSort): Promise<void> {
    let sorted: string[] = [];
    const names = await this.getAllProductNames();
    if (sortOrder === 'Name (A to Z)') {
      sorted = [...names].sort();
    } else if (sortOrder === 'Name (Z to A)') {
      sorted = [...names].sort().reverse();
    }
    expect(names).toEqual(sorted);
  }

  @step()
  async checkSortingBy(sortByValue: SortByValue): Promise<void> {
    if (sortByValue.includes('Price')) {
      return this.checkSortingByPrice(sortByValue as PriceSort);
    }
    if (sortByValue.includes('Name')) {
      return this.checkSortingByName(sortByValue as NameSort);
    }
    throw new Error(`Unknown sortByValue: ${sortByValue}`);
  }
}
