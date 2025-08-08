import users from '../data/users.json';

import { baseFixture } from '../fixtures';

baseFixture('Login with valid data', async ({ app }) => {
  const { username, password } = users.standard_user;
  await app.login.navigateToLoginPage();
  await app.login.url.expectURLToHaveText(/www.saucedemo.com/);
  await app.login.login(username, password);
  await app.login.url.expectURLToHaveText(/www.saucedemo.com\/inventory.html/);
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

for (const testData of fieldValidationData) {
  baseFixture(testData.name, async ({ app }) => {
    await app.login.navigateToLoginPage();
    await app.login.login(testData.username, testData.password);
    await app.login.expectErrorMessage(testData.expectedError);
  });
}
