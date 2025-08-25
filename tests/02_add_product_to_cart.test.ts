import { loggedJSONUserFixture, loggedEnvUserFixture } from '../fixtures';

loggedEnvUserFixture('Verify products and inventory page', async ({ app: { header, inventory } }) => {
  await header.shoppingCart.expectLoaded();
  await header.expectLoaded();
  await header.productSort.expectLoaded();
  await inventory.expectLoaded();
  await inventory.validateAllProducts();
});

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

const addToCartCases = [
  {
    products: ['Sauce Labs Backpack', 'Sauce Labs Bike Light'],
  },
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
];

for (const { products } of addToCartCases) {
  loggedJSONUserFixture(
    `Add ${products.length} product(s) to cart and check cart`,
    async ({ app: { inventory, header, cart } }) => {
      await inventory.addProductsToCart(products);
      await header.shoppingCart.expectBadgeCount(products.length);
      await header.shoppingCart.openCart();
      await cart.expectLoaded();
      await cart.expectProductsCount(products.length);
    }
  );
}
