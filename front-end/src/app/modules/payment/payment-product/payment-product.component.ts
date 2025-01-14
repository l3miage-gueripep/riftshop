import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-payment-product',
  templateUrl: './payment-product.component.html',
  styleUrls: ['./payment-product.component.scss']
})
export class PaymentProductComponent {
  @Input() public product!: Product;

}
