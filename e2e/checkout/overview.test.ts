import { checkoutFixture } from '../../app/fixtures';
import { ALL_PRODUCTS, Products } from '../../app/constants/products';

checkoutFixture.describe('Overview', () => {
  checkoutFixture.use({
    cartOptions: {
      products: ALL_PRODUCTS.slice(),
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
      await overview.removeAllProducts([Products.BikeLight]);
      await header.shoppingCart.expectBadgeCount(5);
    }
  );
});
