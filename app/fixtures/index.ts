import { test as base } from '@playwright/test';
import { Application } from '..';
import path from 'node:path';

type AppFixture = { app: Application };

export const test = base.extend<AppFixture>({
  app: async ({ page }, use) => {
    await use(new Application(page));
  },
});

export const loginPageFixture = test.extend<AppFixture>({
  app: async ({ app }, use) => {
    await app.login.navigateToLoginPage();
    await app.login.expectLoaded();
    await use(app);
  },
});

//import { users } from '../helpers/users';
// export const loggedUserFixture = loginPageFixture.extend<AppFixture>({
//   app: async ({ app }, use) => {
//     const { username, password } = users.standard;
//     await app.login.login(username, password);
//     await app.header.expectLoaded();
//     await use(app);
//   },
// });

/* Fixture that creates a browser context using a saved storageState
   → simulates a logged-in "standard" user session */
export const loggedUserFixture = base.extend<AppFixture>({
  //Override the default context with one that uses the storageState
  context: async ({ browser }, use) => {
    const storagePath = path.resolve('app/storage/standard.json');
    const context = await browser.newContext({ storageState: storagePath });
    await use(context);
    await context.close();
  },
  //Override the default page so it belongs to the custom context
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await page.goto('/inventory.html');
    await use(page);
  },
  //Provide an Application instance bound to this page
  app: async ({ page }, use) => {
    const app = new Application(page);
    await app.header.expectLoaded();
    await use(app);
  },
});

type CartOptions = {
  products: string[];
};

export const checkoutFixture = loggedUserFixture.extend<AppFixture & { cartOptions: CartOptions }>({
  /* cartOptions: default value + { option: true } makes it overridable via .use() inside describe
  Default: ['Sauce Labs Backpack'] */
  cartOptions: [{ products: ['Sauce Labs Backpack'] }, { option: true }],
  app: async ({ app, cartOptions }, use) => {
    // Add all products from cartOptions (can be overridden per describe)
    if (cartOptions.products?.length) {
      await app.inventory.addProductsToCart(cartOptions.products);
    }
    await app.header.shoppingCart.openCart();
    await app.cart.expectLoaded();
    await app.cart.clickCheckoutButton();
    await use(app);
  },
});

/*Fixture with a post-condition:
after the test it automatically completes checkout (Finish → Complete)
and returns the user to the home page. */
export const completedCheckoutFixture = checkoutFixture.extend<AppFixture>({
  app: async ({ app }, use) => {
    await use(app);
    await app.overview.clickFinishButton();
    await app.complete.expectLoaded();
    await app.complete.backToHome();
  },
});
