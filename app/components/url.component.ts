import { expect } from '@playwright/test';
import { AppComponent } from '../base.page';
import { step } from '../../utils/step-decorator';

export class UrlComponent extends AppComponent {
  @step()
  async expectURLToHaveText(text: string | RegExp) {
    await expect(this.page).toHaveURL(text);
  }
}
