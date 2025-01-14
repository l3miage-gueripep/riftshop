import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  protected product$?: Observable<Product>;
  constructor(activatedRoute: ActivatedRoute, productDataService: ProductDataService, protected cartService: CartService) { 
    const productId = activatedRoute.snapshot.paramMap.get('productId');
    if(productId)
      this.product$ = productDataService.getProduct(productId);
  }

}
