import { loggedJSONUserFixture } from '../../fixtures';

loggedJSONUserFixture(
  'Inventory buttons reflect cart changes',
  { tag: '@inventory' },
  async ({ app: { inventory, header, cart } }) => {
    await inventory.addProductsToCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await header.shoppingCart.expectBadgeCount(2);

    await header.shoppingCart.openCart();
    await cart.expectLoaded();
    await cart.removeProduct('Sauce Labs Bike Light');
    await header.shoppingCart.expectBadgeCount(1);

    await cart.clickContinueShoppingButton();
    await inventory.expectLoaded();
    await inventory.expectButtonLabel('Sauce Labs Backpack', 'Remove');
    await inventory.expectButtonLabel('Sauce Labs Bike Light', 'Add to cart');
  }
);
