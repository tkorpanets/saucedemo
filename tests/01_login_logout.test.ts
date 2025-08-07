import users from '../data/users.json';

import { baseFixture, loggedJSONUserFixture } from '../fixtures';

baseFixture('Login', async ({ app }) => {
  const { username, password } = users.standard_user;
  await app.login.navigateToLoginPage();
  await app.login.url.expectURLToHaveText(/www.saucedemo.com/);
  await app.login.login(username, password);
  await app.login.url.expectURLToHaveText(/www.saucedemo.com\/inventory.html/);
  await app.header.expectLoaded();
});

loggedJSONUserFixture('Login and verify products', async ({ app }) => {
  await app.inventory.validateAllProducts();
});
