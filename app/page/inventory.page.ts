import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly products: Locator;
  readonly buttonAddToCart: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;
  readonly price: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator(".inventory_item");
    this.shoppingCartBadge = page.locator(".shopping_cart_badge");
    this.shoppingCartLink = page.locator(".shopping_cart_link");
  }

  async validateAllProducts(): Promise<void> {
    const count = await this.products.count();

    await expect(this.page).toHaveURL(/www.saucedemo.com\/inventory.html/);
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const product = this.products.nth(i);
      const name = product.locator(".inventory_item_name");
      const price = product.locator(".inventory_item_price");
      const addToCartButton = product.locator("button.btn_inventory");

      await expect(name).toHaveText(/.+/);
      await expect(price).toHaveText(/^\$\d+\.\d{2}$/);
      await expect(addToCartButton).toBeVisible();
    }
  }

  async getItemPrice(productName: string): Promise<string> {
    const price = this.page.locator(
      `//*[contains(text(), "${productName}")]/ancestor::*[@class="inventory_item"]//*[contains(@class, "inventory_item_price")]`
    );
    const priceText = (await price.textContent()) as string;
    return priceText;
  }

  async addProductToCart(productName: string): Promise<void> {
    const buttonAddToCart = this.page.locator(
      `//*[contains(text(), "${productName}")]/ancestor::*[@class="inventory_item"]//*[contains(text(), "Add to cart")]`
    );
    await buttonAddToCart.click();
  }

  async verifyShoppingCartBadge(
    state: "visible" | "notVisible",
    count?: string
  ): Promise<void> {
    if (state === "visible" && count !== undefined) {
      await expect(this.shoppingCartBadge).toHaveText(count);
    } else if (state === "notVisible") {
      await expect(this.shoppingCartBadge).not.toBeVisible();
    }
  }

  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async sortBy(option: string): Promise<void> {
    await this.page
      .locator('select[data-test="product-sort-container"]')
      .selectOption({ label: option });
  }

  async getAllProductPrices(): Promise<number[]> {
    const priceLocators = this.page.locator(".inventory_item_price");
    const count = await priceLocators.count();
    const prices: number[] = [];

    for (let i = 0; i < count; i++) {
      const text = await priceLocators.nth(i).textContent(); // e.g. "$9.99"
      if (text) {
        prices.push(parseFloat(text.replace("$", "")));
      }
    }

    return prices;
  }
}
