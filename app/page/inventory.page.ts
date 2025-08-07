import { expect } from '@playwright/test';
import { step } from '../../misc/step';
import { AppPage } from '../abstractClasses';

export class Inventory extends AppPage {
  private productCard = this.page.locator('.inventory_item');

  @step()
  async validateAllProducts(): Promise<void> {
    const count = await this.productCard.count();
    await expect(this.page).toHaveURL(/www.saucedemo.com\/inventory.html/);
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const product = this.productCard.nth(i);
      const name = product.locator('.inventory_item_name');
      const price = product.locator('.inventory_item_price');
      const addToCartButton = product.locator('button.btn_inventory');
      await expect(name).toHaveText(/.+/);
      await expect(price).toHaveText(/^\$\d+\.\d{2}$/);
      await expect(addToCartButton).toBeVisible();
    }
  }

  @step()
  async getItemPrice(productName: string): Promise<string> {
    const price = this.page
      .locator('div.inventory_item')
      .filter({ hasText: productName })
      .locator('.inventory_item_price');
    const priceText = (await price.textContent()) as string;
    return priceText;
  }

  @step()
  async addProductToCart(productName: string): Promise<void> {
    const buttonAddToCart = this.page
      .locator('div.inventory_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' });
    await buttonAddToCart.click();
  }

  @step()
  async getAllProductPrices(): Promise<number[]> {
    const priceLocators = this.page.locator('.inventory_item_price');
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
