import { loggedUserFixture } from '../fixtures';

loggedUserFixture('Products are sorted by price from low to high', async ({ app }) => {
  await app.header.sort.sortBy('Price (low to high)');
  await app.inventory.checkSortingByPrice('low to high');
});

loggedUserFixture('Products are sorted by price from high to low', async ({ app }) => {
  await app.header.sort.sortBy('Price (high to low)');
  await app.inventory.checkSortingByPrice('high to low');
});
