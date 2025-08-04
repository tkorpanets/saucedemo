import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly inputUsername: Locator;
  readonly inputPassword: Locator;
  readonly buttonLogin: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputUsername = page.getByRole("textbox", { name: "Username" });
    this.inputPassword = page.getByRole("textbox", { name: "Password" });
    this.buttonLogin = page.getByRole("button", { name: "Login" });
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com/");
    await expect(this.page).toHaveURL(/www.saucedemo.com/);
  }

  async login(username: string, password: string): Promise<void> {
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
    await this.buttonLogin.click();
    await expect(this.page).toHaveURL(/www.saucedemo.com\/inventory.html/);
  }
}
