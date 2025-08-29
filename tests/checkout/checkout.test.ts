import { faker } from '@faker-js/faker';
import { checkoutFixture } from '../../app/fixtures';

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
