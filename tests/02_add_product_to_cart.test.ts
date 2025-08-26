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

loggedJSONUserFixture('Inventory buttons reflect cart changes', async ({ app: { inventory, header, cart } }) => {
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
});

loggedJSONUserFixture('Cart badge and states persist after reload', async ({ app: { inventory, header }, page }) => {
  await inventory.addProductsToCart(['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket']);
  await header.shoppingCart.expectBadgeCount(2);
  await page.reload();
  await header.shoppingCart.expectBadgeCount(2);
  await inventory.expectButtonLabel('Sauce Labs Backpack', 'Remove');
  await inventory.expectButtonLabel('Sauce Labs Fleece Jacket', 'Remove');
});

loggedJSONUserFixture('Empty cart UI states', async ({ app: { header, cart } }) => {
  await header.shoppingCart.openCart();
  await cart.expectLoaded();
  await cart.expectNoItems();
});
