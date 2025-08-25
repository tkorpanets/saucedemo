import { loggedJSONUserFixture } from '../fixtures';
import { SortByValue } from '../types/sorting';

const cases: Array<{ title: string; sortByValue: SortByValue }> = [
  { title: 'Products are sorted by name from A to Z', sortByValue: 'Name (A to Z)' },
  { title: 'Products are sorted by name from Z to A', sortByValue: 'Name (Z to A)' },
  { title: 'Products are sorted by price from low to high', sortByValue: 'Price (low to high)' },
  { title: 'Products are sorted by price from high to low', sortByValue: 'Price (high to low)' },
];

for (const { title, sortByValue } of cases) {
  loggedJSONUserFixture(title, async ({ app: { header, inventory } }) => {
    await header.productSort.sortBy(sortByValue);
    await inventory.checkSortingBy(sortByValue);
  });
}

// loggedJSONUserFixture('Products are sorted by price from low to high', async ({ app: { header, inventory } }) => {
//   await header.productSort.sortBy('Price (low to high)');
//   await inventory.checkSortingByPrice('Price (low to high)');
// });

// loggedJSONUserFixture('Products are sorted by price from high to low', async ({ app: { header, inventory } }) => {
//   await header.productSort.sortBy('Price (high to low)');
//   await inventory.checkSortingByPrice('Price (high to low)');
// });

// loggedJSONUserFixture('Products are sorted by name from A to Z', async ({ app: { header, inventory } }) => {
//   await header.productSort.sortBy('Name (A to Z)');
//   await inventory.checkSortingByName('Name (A to Z)');
// });

// loggedJSONUserFixture('Products are sorted by name from Z to A', async ({ app: { header, inventory } }) => {
//   await header.productSort.sortBy('Name (Z to A)');
//   await inventory.checkSortingByName('Name (Z to A)');
// });
