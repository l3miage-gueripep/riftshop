import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-listing-item[data]',
  templateUrl: './product-listing-item.component.html',
  styleUrls: ['./product-listing-item.component.css']
})
export class ProductComponent {
  @Input() data!: Product; // made it mendatory in selector

  ngOnInit(): void {
    //create a new instance of product from the data
    // this.data = new Product(this.data.id, this.data.name, this.data.price, this.data.description, this.data.image);
  }

}
