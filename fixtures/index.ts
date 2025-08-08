//import { test } from '@playwright/test';
import { test as base } from '@playwright/test';
import { Application } from '../app';
import users from '../data/users.json';

export const test = base.extend<{
  app: Application;
}>({
  app: async ({ page }, use) => {
    await use(new Application(page));
  },
});

export const loggedJSONUserFixture = test.extend<{ app: Application }>({
  app: async ({ app }, use) => {
    const { username, password } = users.standard_user;
    await app.login.navigateToLoginPage();
    await app.login.login(username, password);
    await app.header.expectLoaded();
    await use(app);
  },
});

export const loggedEnvUserFixture = test.extend<{ app: Application }>({
  app: async ({ app }, use) => {
    const username = process.env.STANDARD_USER;
    const password = process.env.STANDARD_PASS;
    if (!username || !password) {
      throw new Error('Environment variables STANDARD_USER and STANDARD_PASS must be set');
    }
    await app.login.navigateToLoginPage();
    await app.login.login(username, password);
    await app.header.expectLoaded();
    await use(app);
  },
});
