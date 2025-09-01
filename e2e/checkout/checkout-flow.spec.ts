import { checkoutFixture } from '../../app/fixtures';

checkoutFixture.describe('Submit order', () => {
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
    'Submit order with all products',
    { tag: ['@checkout', '@smoke'] },
    async ({ app: { yourInformation, overview, header, complete }, cartOptions }) => {
      await yourInformation.expectLoaded();
      await yourInformation.fillForm();
      await yourInformation.submitForm();
      await overview.expectLoaded();
      await header.shoppingCart.expectBadgeCount(cartOptions.products.length);
      await overview.clickFinishButton();
      await complete.expectLoaded();
    }
  );

  checkoutFixture(
    'Submit order with Backpack and Bike',
    { tag: ['@checkout'] },
    async ({ app: { yourInformation, overview, complete, header } }) => {
      await yourInformation.expectLoaded();
      await yourInformation.fillForm();
      await yourInformation.submitForm();
      await overview.expectLoaded();
      await header.shoppingCart.expectBadgeCount(1);
      await overview.clickFinishButton();
      await complete.expectLoaded();
    }
  );
});
