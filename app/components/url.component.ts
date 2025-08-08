import { expect } from '@playwright/test';
import { AppComponent } from '../base.page';

export class URL extends AppComponent {
  async expectURLToHaveText(text: RegExp): Promise<void> {
    await expect(this.page).toHaveURL(text);
  }
}
