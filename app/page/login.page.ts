import { Page, Locator, expect } from '@playwright/test';
import { AppPage } from '../abstractClasses';
import { step } from '../../misc/step';
import { URL } from '../../component/url.component';

export class Login extends AppPage {
  public url = new URL(this.page);

  private inputUsername = this.page.getByRole('textbox', { name: 'Username' });
  private inputPassword = this.page.getByRole('textbox', { name: 'Password' });
  private buttonLogin = this.page.getByRole('button', { name: 'Login' });

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
}
