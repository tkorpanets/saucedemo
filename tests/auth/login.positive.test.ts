import { test } from '../../fixtures';
import rawUsers from '../../data/users.json';
import type { UsersMap } from '../../types/users';

const users = rawUsers satisfies UsersMap;

test('Login with valid user', { tag: ['@auth', '@smoke'] }, async ({ app: { login, header, inventory } }) => {
  const { username, password } = users.standard_user;
  await login.navigateToLoginPage();
  await login.expectLoaded();
  await login.login(username, password);
  await login.urlComponent.expectURLToHaveText(/www.saucedemo.com/);
  await header.expectLoaded();
  await inventory.expectLoaded();
});

test('Login performance glitch user', { tag: ['@auth'] }, async ({ app: { login, header } }) => {
  const { username, password } = users.performance_glitch_user;
  await login.login(username, password);
  await header.expectLoaded();
});
