import { loginPageFixture } from '../../app/fixtures';
import { users } from '../../app/helpers/users';
import fs from 'node:fs';
import path from 'node:path';

loginPageFixture('Login with standard user', async ({ app: { login, header }, page }) => {
  const { username, password } = users.standard;
  await login.login(username, password);
  await page.goto('/inventory.html');
  await header.expectLoaded();
  const storagePath = path.resolve('app/storage/standard.json');
  fs.mkdirSync(path.dirname(storagePath), { recursive: true });
  await page.context().storageState({ path: storagePath });
  await page.context().close();
});
