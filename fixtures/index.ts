import { test } from '@playwright/test';
import { Application } from '../app';

export const baseFixture = test.extend<{ app: Application }>({
  app: async ({ page }, use) => {
    const app = new Application(page);
    await use(app);
  },
});

export type DefaultUserOption = {
  defaultUser: {
    username: string;
    password: string;
  };
};

export const loggedUserFixture = baseFixture.extend<DefaultUserOption & { app: Application }>({
  defaultUser: [
    {
      username: 'standard_user',
      password: 'secret_sauce',
    },
    {
      option: true,
    },
  ],
  app: async ({ app, defaultUser }, use) => {
    const { username, password } = defaultUser;
    await app.login.navigateToLoginPage();
    await app.login.login(username, password);
    await app.header.expectLoaded();
    await use(app);
  },
});
