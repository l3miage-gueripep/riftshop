import { Component, Input } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.css']
})
export class QuantitySelectorComponent {
  @Input() public quantity: number = 1;
  @Input() public cartItem?: CartItem;

  constructor(private cartService: CartService){}

  protected changeQuantity(event: any) {
    const quantityToAddWhenPressingMinus: number = this.quantity > 1 ? -1 : 0;
    this.quantity += event.target.classList.contains("plus") ? 1 : quantityToAddWhenPressingMinus;
    //change the quantity in the cart item if it's already one
    console.log(this.cartItem);
    if(this.cartItem){
      this.cartService.setProductQuantity(this.cartItem.product.id, this.quantity);
    }
  }

}
