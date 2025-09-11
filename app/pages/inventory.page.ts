import { expect } from '@playwright/test';
import { step } from '../utils/step-decorator';
import { AppPage } from '../base.page';
import type { PriceSort, NameSort, SortByValue } from '../types/sorting';

export class Inventory extends AppPage {
  private productCardSelector = '.inventory_item';
  private productNameSelector = '.inventory_item_name';
  private productDescriptionSelector = '.inventory_item_desc';
  private productPriceSelector = '.inventory_item_price';
  private productAddToCartButtonSelector = 'button.btn_inventory';

  private productCardByName = (name: string) => this.page.locator(this.productCardSelector).filter({ hasText: name });
  private productNameByName = (name: string) => this.productCardByName(name).locator(this.productNameSelector);
  private productButtonByName = (name: string) =>
    this.productCardByName(name).locator(this.productAddToCartButtonSelector);

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
  async getItemDescription(productName: string): Promise<string> {
    const description = this.page
      .locator(this.productCardSelector)
      .filter({ hasText: productName })
      .locator(this.productDescriptionSelector);

    return (await description.textContent()) as string;
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
  async addProductsToCart(names: readonly string[]) {
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

  @step()
  async expectButtonLabel(productName: string, label: 'Add to cart' | 'Remove'): Promise<void> {
    await expect(this.productButtonByName(productName)).toHaveText(label);
  }

  @step()
  async openProduct(productName: string) {
    await this.productNameByName(productName).click();
  }

  parsePrice(priceText: string): number {
    const n = Number(priceText.replace(/[^0-9.]/g, ''));
    if (Number.isNaN(n)) {
      throw new Error(`Cannot parse price from: "${priceText}"`);
    }
    return n;
  }

  async getPriceNumberByName(name: string): Promise<number> {
    const priceText = await this.productCardByName(name).locator(this.productPriceSelector).textContent();
    if (!priceText) {
      throw new Error(`Price not found for product "${name}"`);
    }
    return this.parsePrice(priceText);
  }

  @step()
  async sumItemPrices(names: readonly string[]): Promise<number> {
    const prices = await Promise.all(names.map((n) => this.getPriceNumberByName(n)));
    const total = prices.reduce((acc, v) => acc + v, 0);
    return Math.round(total * 100) / 100;
  }
}
