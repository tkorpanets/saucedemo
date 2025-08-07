import users from '../data/users.json';

import { baseFixture } from '../fixtures';

baseFixture.beforeEach('Login', async ({ app }) => {
  const { username, password } = users.standard_user;
  await app.login.navigateToLoginPage();
  await app.login.url.expectURLToHaveText(/www.saucedemo.com/);
  await app.login.login(username, password);
  await app.login.url.expectURLToHaveText(/www.saucedemo.com\/inventory.html/);
  await app.header.expectLoaded();
});

baseFixture('Login and verify products', async ({ app }) => {
  await app.inventory.validateAllProducts();
});

baseFixture('Add product to cart and check cart', async ({ app }) => {
  await app.inventory.addProductToCart('Sauce Labs Backpack');
  await app.header.shoppingCart.verifyShoppingCartBadge('visible', '1');

  const price = await app.inventory.getItemPrice('Sauce Labs Backpack');
  await app.header.shoppingCart.openCart();
  await app.cart.expectItemPrice('Sauce Labs Backpack', price);
});

baseFixture('Add and remove product from cart', async ({ app }) => {
  await app.inventory.addProductToCart('Sauce Labs Backpack');
  await app.header.shoppingCart.openCart();
  await app.cart.removeProduct('Sauce Labs Backpack');
  await app.header.shoppingCart.verifyShoppingCartBadge('notVisible');
  await app.cart.clickButtonContinueShopping();
  await app.header.shoppingCart.verifyShoppingCartBadge('notVisible');
});
