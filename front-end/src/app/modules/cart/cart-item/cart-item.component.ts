import { Component, Input } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() public cartItem!: CartItem;

  constructor(private cartService: CartService){

  }

  protected deleteFromCart(){
    this.cartService.removeProduct(this.cartItem.product.id);
  }
}
