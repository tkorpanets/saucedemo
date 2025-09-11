import { completedCheckoutFixture } from '../../app/fixtures';
import { ALL_PRODUCTS } from '../../app/constants/products';

completedCheckoutFixture.describe('Submit order', () => {
  completedCheckoutFixture.use({
    cartOptions: {
      products: ALL_PRODUCTS.slice(),
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
