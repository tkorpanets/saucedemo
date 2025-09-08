import { loginPageFixture } from '../../app/fixtures';
import { users } from '../../app/helpers/users';
import { mkdir } from 'node:fs/promises';

loginPageFixture('Login with standard user', async ({ app: { login, header }, page }) => {
  const { username, password } = users.standard;
  await login.login(username, password);
  await header.expectLoaded();
  await mkdir('app/storage', { recursive: true });
  await page.context().storageState({ path: 'app/storage/standard.json' });
});
