import { faker } from '@faker-js/faker';
import { checkoutFixture, loggedUserFixture } from '../../app/fixtures';

checkoutFixture.describe('Custom cart: all products', () => {
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
    { tag: ['@checkout'] },
    async ({ app: { yourInformation, overview, header } }) => {
      await yourInformation.expectLoaded();
      await yourInformation.fillForm();
      await yourInformation.submitForm();
      await overview.expectLoaded();
      await header.shoppingCart.expectBadgeCount(6);
    }
  );
});

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

type InfoData = { firstName?: string; lastName?: string; postalCode?: string };

const infoValidationData: ReadonlyArray<{
  name: string;
  data: InfoData;
  expectedError: string;
}> = [
  {
    name: 'Submit with all fields empty',
    data: { firstName: '', lastName: '', postalCode: '' },
    expectedError: 'Error: First Name is required',
  },
  {
    name: 'Submit without Last Name',
    data: { firstName: faker.person.firstName(), lastName: '', postalCode: faker.location.zipCode('#####') },
    expectedError: 'Error: Last Name is required',
  },
  {
    name: 'Submit without First Name',
    data: { firstName: '', lastName: faker.person.lastName(), postalCode: faker.location.zipCode('#####') },
    expectedError: 'Error: First Name is required',
  },
  {
    name: 'Submit without Postal Code',
    data: { firstName: faker.person.firstName(), lastName: faker.person.lastName(), postalCode: '' },
    expectedError: 'Error: Postal Code is required',
  },
] as const;

for (const { name, data, expectedError } of infoValidationData) {
  checkoutFixture(name, { tag: ['@checkout'] }, async ({ app: { yourInformation } }) => {
    await yourInformation.expectLoaded();
    await yourInformation.closeErrorIfVisible();
    await yourInformation.fillForm(data);
    await yourInformation.submitForm();
    await yourInformation.expectErrorMessage(expectedError);
  });
}

checkoutFixture('Check Your Information placeholders', { tag: ['@checkout'] }, async ({ app: { yourInformation } }) => {
  await yourInformation.expectLoaded();
  await yourInformation.expectPlaceholders('First Name', 'Last Name', 'Zip/Postal Code');
});

const cancelData = [{ name: 'Cancel from empty form' }, { name: 'Cancel after filling form with faker data' }];

for (const { name } of cancelData) {
  checkoutFixture(name, { tag: ['@checkout'] }, async ({ app: { yourInformation, cart } }) => {
    await yourInformation.expectLoaded();
    if (name.includes('faker')) {
      await yourInformation.fillForm();
    }
    await yourInformation.cancelForm();
    await cart.expectLoaded();
  });
}

const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket'];

loggedUserFixture(
  'Adding several products to the cart and checking the amount',
  { tag: ['@checkout'] },
  async ({ app: { inventory, header, cart, yourInformation, overview } }) => {
    await inventory.addProductsToCart(items);
    const expectedItemTotal = await inventory.sumItemPrices(items);
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
      labels: {
        priceTotal: 'Price Total',
        itemTotal: 'Item total:',
        tax: 'Tax:',
        total: 'Total:',
      },
    });
  }
);
