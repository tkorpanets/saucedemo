import { loggedJSONUserFixture } from '../../fixtures';

loggedJSONUserFixture('Add product to cart and check cart', async ({ app: { inventory, header, cart } }) => {
  await inventory.addProductToCart('Sauce Labs Backpack');
  await header.shoppingCart.expectBadgeCount(1);
  const price = await inventory.getItemPrice('Sauce Labs Backpack');

  await header.shoppingCart.openCart();
  await cart.expectLoaded();
  await cart.expectItemPrice('Sauce Labs Backpack', price);
});

loggedJSONUserFixture('Add and remove product from cart', async ({ app: { inventory, header, cart } }) => {
  await inventory.addProductToCart('Sauce Labs Backpack');
  await header.shoppingCart.openCart();
  await cart.expectLoaded();
  await cart.removeProduct('Sauce Labs Backpack');
  await header.shoppingCart.expectNoBadge();
  await cart.clickContinueShoppingButton();
  await header.shoppingCart.expectNoBadge();
});
