import { loggedUserFixture } from '../../app/fixtures';
import { Products } from '../../app/constants/products';

const addToCartCases = [
  { products: [Products.Backpack, Products.BikeLight] },
  {
    products: [
      Products.Backpack,
      Products.BikeLight,
      Products.BoltTShirt,
      Products.FleeceJacket,
      Products.Onesie,
      Products.RedTShirt,
    ],
  },
] as const;

for (const { products } of addToCartCases) {
  loggedUserFixture(
    `Add ${products.length} product(s) to cart and check cart`,
    { tag: ['@cart'] },
    async ({ app: { inventory, header, cart } }) => {
      await inventory.addProductsToCart(products);
      await header.shoppingCart.expectBadgeCount(products.length);
      await header.shoppingCart.openCart();
      await cart.expectLoaded();
      await cart.expectProductsCount(products.length);
    }
  );
}

loggedUserFixture(
  'Cart badge and states persist after reload',
  { tag: ['@cart'] },
  async ({ app: { inventory, header }, page }) => {
    await inventory.addProductsToCart([Products.Backpack, Products.FleeceJacket]);
    await header.shoppingCart.expectBadgeCount(2);
    await page.reload();
    await header.shoppingCart.expectBadgeCount(2);
    await inventory.expectButtonLabel(Products.Backpack, 'Remove');
    await inventory.expectButtonLabel(Products.FleeceJacket, 'Remove');
  }
);
