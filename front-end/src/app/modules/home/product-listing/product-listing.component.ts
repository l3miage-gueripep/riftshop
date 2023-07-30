import { Component } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent {
  products$: Observable<Product[]>;
  constructor(protected productDataService: ProductDataService) {
    this.products$ = this.productDataService.getProducts();
  }


}