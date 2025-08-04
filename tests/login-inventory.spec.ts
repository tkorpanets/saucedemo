import { test, expect } from "@playwright/test";

import users from "../data/users.json";

import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";

test.beforeEach("Login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const { username, password } = users.standard_user;

  await test.step("Login to the Inventory page", async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.login(username, password);
  });
});

test("Login and verify products", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await test.step("Validate all products", async () => {
    await inventoryPage.validateAllProducts();
  });
});

test("Add product to cart and check cart", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await test.step("Add product to cart and verify badge", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.verifyShoppingCartBadge("visible", "1");
  });

  await test.step("Save product price and verify Cart", async () => {
    const price = await inventoryPage.getItemPrice("Sauce Labs Backpack");
    await inventoryPage.openCart();
    await cartPage.verifyItemPrice("Sauce Labs Backpack", price);
  });
});

test("Add and remove product from cart", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await test.step("Add product to cart", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
  });

  await test.step("Open Cart", async () => {
    await inventoryPage.openCart();
  });

  await test.step("Remove product from Cart and check Badge", async () => {
    await cartPage.removeProduct("Sauce Labs Backpack");
    await inventoryPage.verifyShoppingCartBadge("notVisible");
    await cartPage.clickButtonContinueShopping();
    await inventoryPage.verifyShoppingCartBadge("notVisible");
  });
});

test("Products are sorted by price from low to high", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await test.step("Sort products by price low to high", async () => {
    await inventoryPage.sortBy("Price (low to high)");
  });

  await test.step("Verify products are sorted by price", async () => {
    const prices = await inventoryPage.getAllProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });
});

test("Products are sorted by price from high to low", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await test.step("Sort products by price low to high", async () => {
    await inventoryPage.sortBy("Price (high to low)");
  });

  await test.step("Verify products are sorted by price", async () => {
    const prices = await inventoryPage.getAllProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
