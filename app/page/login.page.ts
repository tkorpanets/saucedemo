import { Page, Locator, expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from "../../misc/step";

export class Login extends AppPage {
  private inputUsername = this.page.getByRole("textbox", { name: "Username" });
  private inputPassword = this.page.getByRole("textbox", { name: "Password" });
  private buttonLogin = this.page.getByRole("button", { name: "Login" });

  @step()
  async navigateToLoginPage(): Promise<void> {
    await this.page.goto("/");
    await expect(this.page).toHaveURL(/www.saucedemo.com/);
  }

  @step()
  async login(username: string, password: string): Promise<void> {
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
    await this.buttonLogin.click();
    await expect(this.page).toHaveURL(/www.saucedemo.com\/inventory.html/);
  }
}
