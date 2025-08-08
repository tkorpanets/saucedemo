import { loggedJSONUserFixture } from '../fixtures';

loggedJSONUserFixture('Verify products and inventory page', async ({ app }) => {
  await app.header.shoppingCart.expectLoaded();
  await app.header.expectLoaded();
  await app.header.productSort.expectLoaded();
  await app.inventory.expectLoaded();
  await app.inventory.validateAllProducts();
});

loggedJSONUserFixture('Add product to cart and check cart', async ({ app }) => {
  await app.inventory.addProductToCart('Sauce Labs Backpack');
  await app.header.shoppingCart.verifyShoppingCartBadge('visible', '1');
  const price = await app.inventory.getItemPrice('Sauce Labs Backpack');
  await app.header.shoppingCart.openCart();
  await app.cart.expectLoaded();
  await app.cart.expectItemPrice('Sauce Labs Backpack', price);
});

loggedJSONUserFixture('Add and remove product from cart', async ({ app }) => {
  await app.inventory.addProductToCart('Sauce Labs Backpack');
  await app.header.shoppingCart.openCart();
  await app.cart.expectLoaded();
  await app.cart.removeProduct('Sauce Labs Backpack');
  await app.header.shoppingCart.verifyShoppingCartBadge('notVisible');
  await app.cart.clickButtonContinueShopping();
  await app.header.shoppingCart.verifyShoppingCartBadge('notVisible');
});
