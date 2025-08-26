import { test as base } from '@playwright/test';
import { Application } from '../app';
import users from '../data/users.json';

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
    const { username, password } = users.standard_user;
    await app.login.login(username, password);
    await app.header.expectLoaded();
    await use(app);
  },
});

export const loggedEnvUserFixture = loginPageFixture.extend<AppFixture>({
  app: async ({ app }, use) => {
    const username = process.env.STANDARD_USER;
    const password = process.env.STANDARD_PASS;
    if (!username || !password) {
      throw new Error('Environment variables STANDARD_USER and STANDARD_PASS must be set');
    }
    await app.login.login(username, password);
    await app.header.expectLoaded();
    await use(app);
  },
});
