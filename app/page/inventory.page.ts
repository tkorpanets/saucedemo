import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from "../../misc/step";

type sortOrder = "low to high" | "high to low";

export class Inventory extends AppPage {
  private products = this.page.locator(".inventory_item");
  private shoppingCartBadge = this.page.locator(".shopping_cart_badge");
  private shoppingCartLink = this.page.locator(".shopping_cart_link");

  @step()
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

  @step()
  async getItemPrice(productName: string): Promise<string> {
    const price = this.page
      .locator("div.inventory_item")
      .filter({ hasText: productName })
      .locator(".inventory_item_price");
    const priceText = (await price.textContent()) as string;
    return priceText;
  }

  @step()
  async addProductToCart(productName: string): Promise<void> {
    const buttonAddToCart = this.page
      .locator("div.inventory_item")
      .filter({ hasText: productName })
      .getByRole("button", { name: "Add to cart" });
    await buttonAddToCart.click();
  }

  @step()
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

  @step()
  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  @step()
  async sortBy(option: string): Promise<void> {
    await this.page
      .locator('select[data-test="product-sort-container"]')
      .selectOption({ label: option });
  }

  @step()
  async getAllProductPrices(): Promise<number[]> {
    const priceLocators = this.page.locator(".inventory_item_price");
    const count = await priceLocators.count();
    const prices: number[] = [];

    for (let i = 0; i < count; i++) {
      const text = await priceLocators.nth(i).textContent();
      if (text) {
        prices.push(parseFloat(text.replace("$", "")));
      }
    }

    return prices;
  }

  @step()
  async checkSortingByPrice(sortOrder: sortOrder): Promise<void> {
    let sorted: number[] = [];
    const prices = await this.getAllProductPrices();
    if (sortOrder === "low to high") {
      sorted = [...prices].sort((a, b) => a - b);
    } else if (sortOrder === "high to low") {
      sorted = [...prices].sort((a, b) => b - a);
    }
    expect(prices).toEqual(sorted);
  }
}
