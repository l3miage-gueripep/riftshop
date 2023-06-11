import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { slideRight } from 'src/app/animations/animations';
import { Product } from 'src/app/models/product';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-product[product]',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [
    slideRight
  ]
})
export class ProductComponent {
  product$!: Observable<Product>;
  selectedQuantity: number = 1;
  constructor(protected productDataService: ProductDataService, private route: ActivatedRoute){
    this.route.params.subscribe(params => {
      const productId: number = params['id'];
      // retrieve the corresponding product
      this.product$ = this.productDataService.getProductById(productId);


    });
  }

  changeQuantity(event: any) {
    this.selectedQuantity += event.target.classList.contains("plus") ? 1 : this.selectedQuantity > 1 ? -1 : 0;
  }

  //animation
  cartButtonState = 'closed';
  buyButtonState = 'closed';

  playSlideRightAnimation(element: string, state: string) {
    switch(element) {
      case 'cart-button':
        this.cartButtonState = state;
        break;
      case 'buy-button':
        this.buyButtonState = state;
        break;
    }
  }
}
