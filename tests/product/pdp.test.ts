import { loggedJSONUserFixture } from '../../fixtures';

loggedJSONUserFixture(
  'Add from PDP and return to inventory',
  { tag: ['@pdp', '@smoke'] },
  async ({ app: { inventory, header, productDetails } }) => {
    await inventory.openProduct('Sauce Labs Backpack');
    await productDetails.expectLoaded();
    await productDetails.expectButtonLabel('Add to cart');
    await productDetails.addToCart();
    await productDetails.expectButtonLabel('Remove');
    await header.shoppingCart.expectBadgeCount(1);
    await header.backToProducts();
    await inventory.expectButtonLabel('Sauce Labs Backpack', 'Remove');
  }
);
