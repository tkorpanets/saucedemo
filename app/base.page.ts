import type { Page } from '@playwright/test';

/**
 * Base class for all page objects and components.
 */
export abstract class BasePage {
  constructor(protected page: Page) {}
}

/**
 * Represents a full page in the application.
 * Must implement expectLoaded().
 */
export abstract class AppPage extends BasePage {
  abstract expectLoaded(message?: string): Promise<void>;
}

/**
 * Represents a UI component (part of a page).
 * expectLoaded is optional — only implement when the component
 * has a clear "ready" state that needs to be verified.
 */
export abstract class AppComponent extends BasePage {
  async expectLoaded?(): Promise<void> {}
}
