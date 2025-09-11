import { defineConfig, devices } from '@playwright/test';

import * as dotenv from 'dotenv';
import * as path from 'path';
const target = process.env.ENV_TARGET || 'dev';
if (!process.env.BASE_URL) {
  dotenv.config({ path: path.resolve(__dirname, 'config', `.env.${target}`) });
}
if (!process.env.BASE_URL) {
  throw new Error('BASE_URL is not defined. Set it via .env.<target> locally or secrets in CI.');
}

export default defineConfig({
  testDir: './e2e',
  outputDir: 'test-results/',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['list'], ['html', { open: 'never' }]],
  /* Timeout for each test */
  timeout: 30 * 1000, // 30 seconds
  /* Timeout for expect(...) */
  expect: {
    timeout: 5000,
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',
    //headless: true,
    //viewport: { width: 1920, height: 1080 },
    screenshot: 'only-on-failure',
    /*IMPORTANT: To enable video recording, tests must be run via CLI (e.g., `npm run test`)
    Video may not be saved when tests are run from the Playwright UI or VSCode extension */
    video: {
      mode: 'retain-on-failure',
      size: { width: 640, height: 480 },
    },
    testIdAttribute: 'data-test',
    //
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/ },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        //viewport: { width: 1920, height: 1080 },
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['setup'],
    },
  ],
});
