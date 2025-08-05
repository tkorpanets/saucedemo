import { expect } from "@playwright/test";

import users from "../data/users.json";

import { baseFixture } from "../fixtures";

baseFixture.beforeEach("Login", async ({ app }) => {
  const { username, password } = users.standard_user;
  await app.login.navigateToLoginPage();
  await app.login.url.expectURLToHaveText(/www.saucedemo.com/);
  await app.login.login(username, password);
  await app.login.url.expectURLToHaveText(/www.saucedemo.com\/inventory.html/);
});

baseFixture("Login and verify products", async ({ app }) => {
  await app.inventory.validateAllProducts();
});

baseFixture("Add product to cart and check cart", async ({ app }) => {
  await app.inventory.addProductToCart("Sauce Labs Backpack");
  await app.inventory.verifyShoppingCartBadge("visible", "1");

  const price = await app.inventory.getItemPrice("Sauce Labs Backpack");
  await app.inventory.openCart();
  await app.cart.expectItemPrice("Sauce Labs Backpack", price);
});

baseFixture("Add and remove product from cart", async ({ app }) => {
  await app.inventory.addProductToCart("Sauce Labs Backpack");
  await app.inventory.openCart();
  await app.cart.removeProduct("Sauce Labs Backpack");
  await app.inventory.verifyShoppingCartBadge("notVisible");
  await app.cart.clickButtonContinueShopping();
  await app.inventory.verifyShoppingCartBadge("notVisible");
});

baseFixture(
  "Products are sorted by price from low to high",
  async ({ app }) => {
    await app.inventory.sortBy("Price (low to high)");
    const prices = await app.inventory.getAllProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  }
);

baseFixture(
  "Products are sorted by price from high to low",
  async ({ app }) => {
    await app.inventory.sortBy("Price (high to low)");
    const prices = await app.inventory.getAllProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  }
);
