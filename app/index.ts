import { BasePage } from './base.page';
import { Cart } from './pages/cart.page';
import { Inventory } from './pages/inventory.page';
import { Login } from './pages/login.page';
import { Header } from './pages/header';

export class Application extends BasePage {
  //Only pages and components extend through page
  public cart = new Cart(this.page);
  public header = new Header(this.page);
  public inventory = new Inventory(this.page);
  public login = new Login(this.page);
}
