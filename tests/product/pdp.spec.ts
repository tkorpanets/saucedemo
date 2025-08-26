// import { loggedJSONUserFixture } from '../../fixtures';

// loggedJSONUserFixture(
//   'Add from PDP and return to inventory',
//   async ({ app: { inventory, header, productDetails } }) => {
//     await inventory.openProduct('Sauce Labs Backpack');
//     await productDetails.expectLoaded('Sauce Labs Backpack');
//     await productDetails.addToCart();
//     await header.shoppingCart.expectBadgeCount(1);
//     await productDetails.backToProducts();

//     await inventory.expectButtonLabel('Sauce Labs Backpack', 'Remove');
//   }
// );
