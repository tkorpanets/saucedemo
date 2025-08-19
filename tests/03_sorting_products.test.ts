import { loggedJSONUserFixture, loggedEnvUserFixture } from '../fixtures';

loggedJSONUserFixture('Products are sorted by price from low to high', async ({ app: { header, inventory } }) => {
  await header.productSort.sortBy('Price (low to high)');
  await inventory.checkSortingByPrice('low to high');
});

loggedEnvUserFixture('Products are sorted by price from high to low', async ({ app: { header, inventory } }) => {
  await header.productSort.sortBy('Price (high to low)');
  await inventory.checkSortingByPrice('high to low');
});
