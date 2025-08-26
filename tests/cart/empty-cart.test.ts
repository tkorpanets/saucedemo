import { loggedUserFixture } from '../../fixtures';

loggedUserFixture('Empty cart UI states', { tag: ['@cart'] }, async ({ app: { header, cart } }) => {
  await header.shoppingCart.openCart();
  await cart.expectLoaded();
  await cart.expectNoItems();
});
