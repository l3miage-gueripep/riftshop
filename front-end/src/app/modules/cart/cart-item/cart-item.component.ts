import { Component, Input } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() public cartItem!: CartItem;

  constructor(private cartService: CartService, private generalService: GeneralService) { }

  updateItemQuantity(){
    this.generalService.enableLoading();
    this.cartService.updateCartItem(this.cartItem).subscribe((test) => {
      this.generalService.disableLoading();
    });
  }

  protected deleteFromCart(){
    this.generalService.enableLoading();
    this.cartService.removeItem(this.cartItem.product.id).subscribe(() => {
      this.generalService.disableLoading();
    });
  }
}
