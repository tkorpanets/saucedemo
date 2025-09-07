import { completedCheckoutFixture } from '../../app/fixtures';

completedCheckoutFixture.describe('Submit order', () => {
  completedCheckoutFixture.use({
    cartOptions: {
      products: [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt (Red)',
      ],
    },
  });

  completedCheckoutFixture(
    'Submit order with all products',
    { tag: ['@checkout', '@smoke'] },
    async ({ app: { yourInformation, overview, header }, cartOptions }) => {
      await yourInformation.expectLoaded();
      await yourInformation.fillForm();
      await yourInformation.submitForm();
      await overview.expectLoaded();
      await header.shoppingCart.expectBadgeCount(cartOptions.products.length);
    }
  );
});

completedCheckoutFixture(
  'Submit order with "Sauce Labs Backpack" (default products)',
  { tag: ['@checkout'] },
  async ({ app: { yourInformation, overview, header } }) => {
    await yourInformation.expectLoaded();
    await yourInformation.fillForm();
    await yourInformation.submitForm();
    await overview.expectLoaded();
    await header.shoppingCart.expectBadgeCount(1);
  }
);
