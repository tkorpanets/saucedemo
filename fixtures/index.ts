import { test } from '@playwright/test';
import { Application } from '../app';
import users from '../data/users.json';

export const baseFixture = test.extend<{ app: Application }>({
  app: async ({ page }, use) => {
    const app = new Application(page);
    await use(app);
  },
});

export const loggedJSONUserFixture = baseFixture.extend<{ app: Application }>({
  app: async ({ app }, use) => {
    const { username, password } = users.standard_user;
    await app.login.navigateToLoginPage();
    await app.login.login(username, password);
    await app.header.expectLoaded();
    await use(app);
  },
});

export const loggedEnvUserFixture = baseFixture.extend<{ app: Application }>({
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
