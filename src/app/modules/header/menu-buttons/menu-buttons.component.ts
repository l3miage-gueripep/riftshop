import { Component } from '@angular/core';
import { faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-menu-buttons',
  templateUrl: './menu-buttons.component.html',
  styleUrls: ['./menu-buttons.component.css']
})
export class MenuButtonsComponent {
  shoppingCartIcon = faShoppingBag;
  userIcon = faUser;
  constructor(protected cartService: CartService) { }
}
