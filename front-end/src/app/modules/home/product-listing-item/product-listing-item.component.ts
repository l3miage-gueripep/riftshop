import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-listing-item[data]',
  templateUrl: './product-listing-item.component.html',
  styleUrls: ['./product-listing-item.component.css']
})
export class ProductComponent {
  @Input() data!: Product; // made it mendatory in selector
}
