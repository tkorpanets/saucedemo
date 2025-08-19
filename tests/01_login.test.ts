import { test, loginPageFixture } from '../fixtures';
import rawUsers from '../data/users.json';
import type { UsersMap } from '../types/users';

const users = rawUsers satisfies UsersMap;

test('Login with valid user', async ({ app: { login, header, inventory } }) => {
  const { username, password } = users.standard_user;
  await login.navigateToLoginPage();
  await login.expectLoaded();
  await login.login(username, password);
  await login.urlComponent.expectURLToHaveText(/www.saucedemo.com/);
  await header.expectLoaded();
  await inventory.expectLoaded();
});

loginPageFixture('Login with locked user', async ({ app: { login } }) => {
  const { username, password } = users.locked_out_user;
  await login.login(username, password);
  await login.expectErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  await login.closeErrorIfVisible();
});

loginPageFixture('Login performance glitch user', async ({ app: { login, header } }) => {
  const { username, password } = users.performance_glitch_user;
  await login.login(username, password);
  await header.expectLoaded();
});

const fieldValidationData = [
  {
    name: 'Login with empty fields',
    username: '',
    password: '',
    expectedError: 'Epic sadface: Username is required',
  },
  {
    name: 'Login without password',
    username: users.standard_user.username,
    password: '',
    expectedError: 'Epic sadface: Password is required',
  },
  {
    name: 'Login without username',
    username: '',
    password: users.standard_user.password,
    expectedError: 'Epic sadface: Username is required',
  },
  {
    name: 'Login with invalid username',
    username: 'invalid_user',
    password: users.standard_user.password,
    expectedError: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'Login with invalid password',
    username: users.standard_user.username,
    password: 'wrong_password',
    expectedError: 'Epic sadface: Username and password do not match any user in this service',
  },
];

for (const { name, username, password, expectedError } of fieldValidationData) {
  loginPageFixture(name, async ({ app: { login } }) => {
    await login.login(username, password);
    await login.expectErrorMessage(expectedError);
  });
}

loginPageFixture('Check login placeholders', async ({ app: { login } }) => {
  await login.expectPlaceholders('Username', 'Password');
});

loginPageFixture('Password field should be hidden', async ({ app: { login } }) => {
  await login.expectPasswordHidden();
});
