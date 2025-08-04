import type { Page } from "@playwright/test";

export abstract class AppPage {
  constructor(protected page: Page) {}
}
