import { defineConfig, devices } from '@playwright/test';
/* Load environment variables from .env file */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results/',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Timeout for each test */
  timeout: 30 * 1000, // 30 seconds
  /* Timeout for expect(...) */
  expect: {
    timeout: 5000,
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.saucedemo.com/',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    //headless: true,
    //viewport: { width: 1920, height: 1080 },
    screenshot: 'only-on-failure',
    /*IMPORTANT: To enable video recording, tests must be run via CLI (e.g., `npm run test`)
    Video may not be saved when tests are run from the Playwright UI or VSCode extension */
    // video: {
    //   mode: 'retain-on-failure',
    //   size: { width: 640, height: 480 },
    // },
    testIdAttribute: 'data-test',
    //
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        //viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});
