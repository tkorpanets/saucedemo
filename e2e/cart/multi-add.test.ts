import { loggedUserFixture } from '../../app/fixtures';

const addToCartCases = [
  { products: ['Sauce Labs Backpack', 'Sauce Labs Bike Light'] },
  {
    products: [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)',
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
    await inventory.addProductsToCart(['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket']);
    await header.shoppingCart.expectBadgeCount(2);
    await page.reload();
    await header.shoppingCart.expectBadgeCount(2);
    await inventory.expectButtonLabel('Sauce Labs Backpack', 'Remove');
    await inventory.expectButtonLabel('Sauce Labs Fleece Jacket', 'Remove');
  }
);
