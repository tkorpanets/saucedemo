import { expect } from '@playwright/test';

import { AppPage } from '../abstractClasses';

export class URL extends AppPage {
  async expectURLToHaveText(text: RegExp): Promise<void> {
    await expect(this.page).toHaveURL(text);
  }
}
