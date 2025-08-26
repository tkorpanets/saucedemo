import { loggedUserFixture } from '../../fixtures';

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
