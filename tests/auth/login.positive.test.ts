import { test, loginPageFixture } from '../../fixtures';
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

loginPageFixture('Login performance glitch user', { tag: ['@auth'] }, async ({ app: { login, header } }) => {
  const { username, password } = users.performance_glitch_user;
  await login.login(username, password);
  await header.expectLoaded();
});

loginPageFixture('Check login placeholders', { tag: ['@auth'] }, async ({ app: { login } }) => {
  await login.expectPlaceholders('Username', 'Password');
});

loginPageFixture('Password field should be hidden', { tag: ['@auth'] }, async ({ app: { login } }) => {
  await login.expectPasswordHidden();
});
