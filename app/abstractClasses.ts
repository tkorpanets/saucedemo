import type { Page } from '@playwright/test';

/**
 * Base class for all page objects.
 * Provides common functionality and access to the Playwright Page instance.
 */

export abstract class AppPage {
  constructor(protected page: Page) {}

  //abstract expectLoaded(message?: string): Promise<void>;
}
