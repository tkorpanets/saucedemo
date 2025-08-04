import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly buttonContinueShopping: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonContinueShopping = page.getByRole("button", {
      name: "Continue Shopping",
    });
  }

  async verifyItemPrice(
    productName: string,
    priceValue: string
  ): Promise<void> {
    const price = this.page.locator(
      `//*[contains(text(), "${productName}")]/ancestor::*[@class="cart_item"]//*[@class="inventory_item_price"]`
    );
    await expect(price).toHaveText(priceValue);
  }

  async removeProduct(productName: string): Promise<void> {
    const buttonRemove = this.page.locator(
      `//*[contains(text(), "${productName}")]/ancestor::*[@class="cart_item"]//button[contains(text(), "Remove")]`
    );
    await buttonRemove.click();
    await expect(buttonRemove).not.toBeVisible();
  }

  async clickButtonContinueShopping() {
    await this.buttonContinueShopping.click();
  }
}
