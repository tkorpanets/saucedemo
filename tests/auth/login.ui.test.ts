import { loginPageFixture } from '../../fixtures';

loginPageFixture('Check login placeholders', { tag: ['@auth'] }, async ({ app: { login } }) => {
  await login.expectPlaceholders('Username', 'Password');
});

loginPageFixture('Password field should be hidden', { tag: ['@auth'] }, async ({ app: { login } }) => {
  await login.expectPasswordHidden();
});
