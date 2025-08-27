import { loginPageFixture } from '../../fixtures';
import { users } from '../../helpers/users';

loginPageFixture('Login with locked user', { tag: ['@auth'] }, async ({ app: { login } }) => {
  const { username, password } = users.locked;
  await login.login(username, password);
  await login.expectErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  await login.closeErrorIfVisible();
});

const fieldValidationData = [
  { name: 'Login with empty fields', username: '', password: '', expectedError: 'Epic sadface: Username is required' },
  {
    name: 'Login without password',
    username: users.standard.username,
    password: '',
    expectedError: 'Epic sadface: Password is required',
  },
  {
    name: 'Login without username',
    username: '',
    password: users.standard.password,
    expectedError: 'Epic sadface: Username is required',
  },
  {
    name: 'Login with invalid username',
    username: 'invalid_user',
    password: users.standard.password,
    expectedError: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'Login with invalid password',
    username: users.standard.username,
    password: 'wrong_password',
    expectedError: 'Epic sadface: Username and password do not match any user in this service',
  },
] as const;

for (const { name, username, password, expectedError } of fieldValidationData) {
  loginPageFixture(name, { tag: ['@auth'] }, async ({ app: { login } }) => {
    await login.login(username, password);
    await login.expectErrorMessage(expectedError);
  });
}
