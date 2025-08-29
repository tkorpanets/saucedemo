import { test as base } from '@playwright/test';
import { Application } from '..';
import { users } from '../helpers/users';

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

export const loggedUserFixture = loginPageFixture.extend<AppFixture>({
  app: async ({ app }, use) => {
    const { username, password } = users.standard;
    await app.login.login(username, password);
    await app.header.expectLoaded();
    await use(app);
  },
});

export const loggedUserWithCartFixture = loggedUserFixture.extend<AppFixture>({
  app: async ({ app }, use) => {
    await app.inventory.addProductToCart('Sauce Labs Backpack');
    await app.header.shoppingCart.openCart();
    await app.cart.expectLoaded();
    await app.cart.clickCheckoutButton();
    await use(app);
  },
});
