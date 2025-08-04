import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from "../../misc/step";

export class Cart extends AppPage {
  private buttonContinueShopping = this.page.getByRole("button", {
    name: "Continue Shopping",
  });

  @step()
  async verifyItemPrice(
    productName: string,
    priceValue: string
  ): Promise<void> {
    const price = this.page.locator(
      `//*[contains(text(), "${productName}")]/ancestor::*[@class="cart_item"]//*[@class="inventory_item_price"]`
    );
    await expect(price).toHaveText(priceValue);
  }

  @step()
  async removeProduct(productName: string): Promise<void> {
    const buttonRemove = this.page.locator(
      `//*[contains(text(), "${productName}")]/ancestor::*[@class="cart_item"]//button[contains(text(), "Remove")]`
    );
    await buttonRemove.click();
    await expect(buttonRemove).not.toBeVisible();
  }

  @step()
  async clickButtonContinueShopping() {
    await this.buttonContinueShopping.click();
  }
}
