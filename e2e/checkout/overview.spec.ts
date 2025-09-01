import { checkoutFixture } from '../../app/fixtures';

checkoutFixture.describe('Overview', () => {
  checkoutFixture.use({
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

  checkoutFixture(
    'Overview: remove all products',
    { tag: ['@checkout'] },
    async ({ app: { yourInformation, overview, header }, cartOptions }) => {
      await yourInformation.expectLoaded();
      await yourInformation.fillForm();
      await yourInformation.submitForm();
      await overview.expectLoaded();
      await header.shoppingCart.expectBadgeCount(cartOptions.products.length);
      await overview.removeAllProducts(cartOptions.products);
      await header.shoppingCart.expectNoBadge();
    }
  );

  checkoutFixture(
    'Overview: remove single product updates badge',
    async ({ app: { yourInformation, overview, header } }) => {
      await yourInformation.fillForm();
      await yourInformation.submitForm();
      await overview.expectLoaded();
      await header.shoppingCart.expectBadgeCount(6);
      await overview.removeAllProducts(['Sauce Labs Bike Light']);
      await header.shoppingCart.expectBadgeCount(5);
    }
  );
});
