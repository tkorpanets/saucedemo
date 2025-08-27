import { test, loginPageFixture } from '../../app/fixtures';
import { users } from '../../app/helpers/users';

test('Login with valid user', { tag: ['@auth', '@smoke'] }, async ({ app: { login, header, inventory } }) => {
  const { username, password } = users.standard;
  await login.navigateToLoginPage();
  await login.expectLoaded();
  await login.login(username, password);
  await header.expectLoaded();
  await inventory.expectLoaded();
});

loginPageFixture('Login performance glitch user', { tag: ['@auth'] }, async ({ app: { login, header } }) => {
  const { username, password } = users.perf;
  await login.login(username, password);
  await header.expectLoaded();
});

loginPageFixture('Check login placeholders', { tag: ['@auth'] }, async ({ app: { login } }) => {
  await login.expectPlaceholders('Username', 'Password');
});

loginPageFixture('Password field should be hidden', { tag: ['@auth'] }, async ({ app: { login } }) => {
  await login.expectPasswordHidden();
});
