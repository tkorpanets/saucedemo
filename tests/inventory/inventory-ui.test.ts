import { loggedEnvUserFixture } from '../../fixtures';

loggedEnvUserFixture(
  'Verify products and inventory page',
  { tag: ['@inventory', '@smoke'] },
  async ({ app: { header, inventory } }) => {
    await header.shoppingCart.expectLoaded();
    await header.expectLoaded();
    await header.productSort.expectLoaded();
    await inventory.expectLoaded();
    await inventory.validateAllProducts();
  }
);
