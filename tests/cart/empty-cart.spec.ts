import { loggedJSONUserFixture } from '../../fixtures';

loggedJSONUserFixture('Empty cart UI states', async ({ app: { header, cart } }) => {
  await header.shoppingCart.openCart();
  await cart.expectLoaded();
  await cart.expectNoItems();
});
