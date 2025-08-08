import { expect } from '@playwright/test';
import { AppPage } from '../base.page';
import { step } from '../../utils/step-decorator';
import { URL } from '../components/url.component';

export class Login extends AppPage {
  public url = new URL(this.page);

  private readonly logo = this.page.locator('.login_logo');
  private readonly inputUsername = this.page.getByRole('textbox', { name: 'Username' });
  private readonly inputPassword = this.page.getByRole('textbox', { name: 'Password' });
  private readonly buttonLogin = this.page.getByRole('button', { name: 'Login' });
  private readonly errorMessage = this.page.locator('[data-test="error"]');
  private readonly errorClose = this.page.locator('[data-test="error-button"]');

  @step()
  async expectLoaded(message?: string): Promise<void> {
    await expect(this.logo).toHaveText('Swag Labs');
    await expect(this.inputUsername).toBeVisible();
    await expect(this.inputPassword).toBeVisible();
    await expect(this.buttonLogin).toBeVisible();
  }

  @step()
  async navigateToLoginPage(): Promise<void> {
    await this.page.goto('/');
  }

  @step()
  async login(username: string, password: string): Promise<void> {
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
    await this.buttonLogin.click();
  }

  @step()
  async expectErrorMessage(errorMessage: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(errorMessage);
  }

  @step()
  async closeErrorIfVisible(): Promise<void> {
    if (await this.errorClose.isVisible()) {
      await this.errorClose.click();
      await expect(this.errorMessage).toBeHidden();
    }
  }

  @step()
  async expectPlaceholders(usernamePlaceholder: string, passwordPlaceholder: string): Promise<void> {
    await expect(this.inputUsername).toHaveAttribute('placeholder', usernamePlaceholder);
    await expect(this.inputPassword).toHaveAttribute('placeholder', passwordPlaceholder);
  }

  @step()
  async expectPasswordHidden(): Promise<void> {
    await expect(this.inputPassword).toHaveAttribute('type', 'password');
  }
}
