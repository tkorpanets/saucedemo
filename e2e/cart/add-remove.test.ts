import { loggedUserFixture } from '../../app/fixtures';

loggedUserFixture(
  'Add product to cart and check cart',
  { tag: ['@cart', '@smoke'] },
  async ({ app: { inventory, header, cart } }) => {
    await inventory.addProductToCart('Sauce Labs Backpack');
    await header.shoppingCart.expectBadgeCount(1);
    const price = await inventory.getItemPrice('Sauce Labs Backpack');
    await header.shoppingCart.openCart();
    await cart.expectLoaded();
    await cart.expectItemPrice('Sauce Labs Backpack', price);
  }
);

loggedUserFixture(
  'Add and remove product from cart',
  { tag: ['@cart'] },
  async ({ app: { inventory, header, cart } }) => {
    await inventory.addProductToCart('Sauce Labs Backpack');
    await header.shoppingCart.openCart();
    await cart.expectLoaded();
    await cart.removeProducts(['Sauce Labs Backpack']);
    await header.shoppingCart.expectNoBadge();
    await cart.clickContinueShoppingButton();
    await header.shoppingCart.expectNoBadge();
  }
);

loggedUserFixture('Empty cart UI states', { tag: ['@cart'] }, async ({ app: { header, cart } }) => {
  await header.shoppingCart.openCart();
  await cart.expectLoaded();
  await cart.expectNoItems();
});

//Special "visual" user – intentionally has UI defects (used to verify visual/UI issues)
loggedUserFixture.describe('Visual defect user tests', () => {
  loggedUserFixture.use({ user: 'visual' });

  loggedUserFixture(
    'Add product to cart and check cart',
    { tag: ['@cart', '@smoke'] },
    async ({ app: { inventory, header, cart } }) => {
      await inventory.addProductToCart('Sauce Labs Backpack');
      await header.shoppingCart.expectBadgeCount(1);
      const price = await inventory.getItemPrice('Sauce Labs Backpack');
      await header.shoppingCart.openCart();
      await cart.expectLoaded();
      await cart.expectItemPrice('Sauce Labs Backpack', price);
    }
  );

  loggedUserFixture(
    'Add and remove product from cart',
    { tag: ['@cart'] },
    async ({ app: { inventory, header, cart } }) => {
      await inventory.addProductToCart('Sauce Labs Backpack');
      await header.shoppingCart.openCart();
      await cart.expectLoaded();
      await cart.removeProducts(['Sauce Labs Backpack']);
      await header.shoppingCart.expectNoBadge();
      await cart.clickContinueShoppingButton();
      await header.shoppingCart.expectNoBadge();
    }
  );

  loggedUserFixture('Empty cart UI states', { tag: ['@cart'] }, async ({ app: { header, cart } }) => {
    await header.shoppingCart.openCart();
    await cart.expectLoaded();
    await cart.expectNoItems();
  });
});
