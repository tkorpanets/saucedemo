import { test as base } from '@playwright/test';
import { Application } from '..';
import { INVENTORY_URL, STORAGE_STATE_STANDARD_USER, STORAGE_STATE_VISUAL_USER } from '../constants';
import { Products } from '../constants/products';

type AppFixture = {
  app: Application;
};

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

type UserKey = 'standard' | 'visual';

const USER_STORAGE: Record<UserKey, string> = {
  standard: STORAGE_STATE_STANDARD_USER,
  visual: STORAGE_STATE_VISUAL_USER,
};

export const loggedUserFixture = test.extend<AppFixture & { user: UserKey }>({
  /* user: default value + { option: true } makes it overridable via .use() inside describe
     Default: 'standard'
     Available: 'standard', 'visual'*/
  user: ['standard', { option: true }],
  storageState: async ({ user }, use) => {
    // Map user key to correct storage state
    const state = USER_STORAGE[user];
    if (!state) throw new Error(`Unknown user key: ${user}`);
    await use(state);
  },
  app: async ({ page }, use) => {
    // Initialize application and ensure header is loaded
    const app = new Application(page);
    await page.goto(INVENTORY_URL);
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
  cartOptions: [{ products: [Products.Backpack] }, { option: true }],
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
