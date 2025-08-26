import { loggedUserFixture } from '../../fixtures';

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
