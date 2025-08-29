import { expect } from '@playwright/test';
import { AppPage } from '../../base.page';
import { step } from '../../utils/step-decorator';

export class Complete extends AppPage {
  private image = this.page.getByRole('img', { name: 'Pony Express' });
  private header = this.page.getByTestId('complete-header');
  private text = this.page.getByTestId('complete-text');
  private backHomeButton = this.page.getByRole('button', { name: 'Back Home' });

  @step()
  async expectLoaded(): Promise<void> {
    Promise.all([
      expect(this.image).toBeVisible(),
      expect(this.header).toBeVisible(),
      expect(this.text).toBeVisible(),
      expect(this.backHomeButton).toBeVisible(),
    ]);
  }

  @step()
  async backToHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
