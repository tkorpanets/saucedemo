import { loginPageFixture } from '../../app/fixtures';
import { users } from '../../app/helpers/users';
import { mkdir } from 'node:fs/promises';
import { STORAGE_DIR, STORAGE_STATE_STANDARD_USER, STORAGE_STATE_VISUAL_USER } from '../../app/constants';

loginPageFixture('Login with standard user and save storage', async ({ app: { login, header }, page }) => {
  const { username, password } = users.standard;
  await login.login(username, password);
  await header.expectLoaded();
  await mkdir(STORAGE_DIR, { recursive: true });
  await page.context().storageState({ path: STORAGE_STATE_STANDARD_USER });
});

loginPageFixture('Login with visual user and save storage', async ({ app: { login, header }, page }) => {
  const { username, password } = users.visual;
  await login.login(username, password);
  await header.expectLoaded();
  await mkdir(STORAGE_DIR, { recursive: true });
  await page.context().storageState({ path: STORAGE_STATE_VISUAL_USER });
});
