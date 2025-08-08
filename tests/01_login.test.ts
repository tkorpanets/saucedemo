import { test } from '../fixtures';
import rawUsers from '../data/users.json';
import type { UsersMap } from '../types/users';

const users = rawUsers satisfies UsersMap;

test('Login with valid user', async ({ app }) => {
  const { username, password } = users.standard_user;
  await app.login.navigateToLoginPage();
  await app.login.expectLoaded();
  await app.login.login(username, password);
  await app.login.url.expectURLToHaveText(/www.saucedemo.com/);
  await app.header.expectLoaded();
});

test('Login with locked user', async ({ app }) => {
  const { username, password } = users.locked_out_user;
  await app.login.navigateToLoginPage();
  await app.login.expectLoaded();
  await app.login.login(username, password);
  await app.login.expectErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  await app.login.closeErrorIfVisible();
});

test('Login performance glitch user', async ({ app }) => {
  const { username, password } = users.performance_glitch_user;
  await app.login.navigateToLoginPage();
  await app.login.expectLoaded();
  await app.login.login(username, password);
  await app.header.expectLoaded();
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
  test(name, async ({ app }) => {
    await app.login.navigateToLoginPage();
    await app.login.expectLoaded();
    await app.login.login(username, password);
    await app.login.expectErrorMessage(expectedError);
  });
}

test('Check login placeholders', async ({ app }) => {
  await app.login.navigateToLoginPage();
  await app.login.expectLoaded();
  await app.login.expectPlaceholders('Username', 'Password');
});

test('Password field should be hidden', async ({ app }) => {
  await app.login.navigateToLoginPage();
  await app.login.expectLoaded();
  await app.login.expectPasswordHidden();
});
