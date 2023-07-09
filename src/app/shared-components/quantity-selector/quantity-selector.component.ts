import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.css']
})
export class QuantitySelectorComponent {
  @Input() public quantity: number = 1;

  protected changeQuantity(event: any) {
    const quantityToAddWhenPressingMinus: number = this.quantity > 1 ? -1 : 0;
    this.quantity += event.target.classList.contains("plus") ? 1 : quantityToAddWhenPressingMinus;
  }

}
