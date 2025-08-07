import { AppPage } from './abstractClasses';

import { Cart } from './page/cart.page';
import { Inventory } from './page/inventory.page';
import { Login } from './page/login.page';
import { Header } from '../app/page/header';

export class Application extends AppPage {
  //Pages
  public cart = new Cart(this.page);
  public header = new Header(this.page);
  public inventory = new Inventory(this.page);
  public login = new Login(this.page);
}
