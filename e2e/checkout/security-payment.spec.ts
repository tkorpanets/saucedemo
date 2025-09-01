import { checkoutFixture, loggedUserFixture } from '../../app/fixtures';

const productsA = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
const productsB = ['Sauce Labs Fleece Jacket', 'Sauce Labs Onesie'];

loggedUserFixture(
  'Payment & totals for set A (tax 8%)',
  { tag: ['@checkout'] },
  async ({ app: { inventory, header, cart, yourInformation, overview } }) => {
    await inventory.addProductsToCart(productsA);
    const expectedItemTotal = await inventory.sumItemPrices(productsA);
    await header.shoppingCart.openCart();
    await cart.expectLoaded();
    await cart.clickCheckoutButton();
    await yourInformation.fillForm();
    await yourInformation.submitForm();
    await overview.expectedPaymentInfo('Payment Information:', 'SauceCard #');
    await overview.expectedShippingInfo('Shipping Information:', 'Free Pony Express Delivery!');
    await overview.expectPriceTotal({
      itemTotal: expectedItemTotal,
      taxRate: 0.08,
      labels: { priceTotal: 'Price Total', itemTotal: 'Item total:', tax: 'Tax:', total: 'Total:' },
    });
  }
);

loggedUserFixture(
  'Payment & totals for set B (tax 8%)',
  { tag: ['@checkout'] },
  async ({ app: { inventory, header, cart, yourInformation, overview } }) => {
    await inventory.addProductsToCart(productsB);
    const expectedItemTotal = await inventory.sumItemPrices(productsB);
    await header.shoppingCart.openCart();
    await cart.expectLoaded();
    await cart.clickCheckoutButton();
    await yourInformation.fillForm();
    await yourInformation.submitForm();
    await overview.expectedPaymentInfo('Payment Information:', 'SauceCard #');
    await overview.expectedShippingInfo('Shipping Information:', 'Free Pony Express Delivery!');
    await overview.expectPriceTotal({
      itemTotal: expectedItemTotal,
      taxRate: 0.08,
      labels: { priceTotal: 'Price Total', itemTotal: 'Item total:', tax: 'Tax:', total: 'Total:' },
    });
  }
);

checkoutFixture('Trims spaces & neutralizes HTML in last name', async ({ app: { yourInformation } }) => {
  await yourInformation.expectLoaded();
  await yourInformation.fillForm({
    firstName: '  John  ',
    lastName: '<img src=x onerror=alert(1)>',
    postalCode: '  12-345  ',
  });
  await yourInformation.submitForm();
});

checkoutFixture('Trims spaces & neutralizes HTML in first name', async ({ app: { yourInformation } }) => {
  await yourInformation.expectLoaded();
  await yourInformation.fillForm({
    firstName: '<svg onload=confirm(1)> ',
    lastName: ' Doe ',
    postalCode: '  99-999 ',
  });
  await yourInformation.submitForm();
});

loggedUserFixture('Cart persists after reload', async ({ app: { inventory, header }, page }) => {
  await inventory.addProductsToCart(['Sauce Labs Backpack', 'Sauce Labs Onesie']);
  await page.reload();
  await header.shoppingCart.expectBadgeCount(2);
});
