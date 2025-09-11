import { loggedUserFixture } from '../../app/fixtures';
import { Products } from '../../app/constants/products';

loggedUserFixture(
  'Add from PDP and return to inventory',
  { tag: ['@pdp', '@smoke'] },
  async ({ app: { inventory, header, productDetails } }) => {
    await inventory.openProduct(Products.Backpack);
    await productDetails.expectLoaded();
    await productDetails.expectButtonLabel('Add to cart');
    await productDetails.addToCart();
    await productDetails.expectButtonLabel('Remove');
    await header.shoppingCart.expectBadgeCount(1);
    await header.backToProducts();
    await inventory.expectButtonLabel(Products.Backpack, 'Remove');
  }
);

loggedUserFixture(
  'Add from PDP and verify product data',
  { tag: ['@pdp'] },
  async ({ app: { inventory, productDetails } }) => {
    const description = await inventory.getItemDescription(Products.Backpack);
    const price = await inventory.getItemPrice(Products.Backpack);
    await inventory.openProduct(Products.Backpack);
    await productDetails.expectLoaded();
    await productDetails.expectItemDescription(description);
    await productDetails.expectItemPrice(price);
  }
);
