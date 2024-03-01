import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, last, take } from 'rxjs';
import { slide } from 'src/app/animations/animations';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductDataService } from 'src/app/services/product-data.service';
import { QuantitySelectorComponent } from 'src/app/shared-components/quantity-selector/quantity-selector.component';

@Component({
  selector: 'app-product[product]',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [slide]
})
export class ProductComponent {
  protected product$!: Observable<Product>;
  protected isProductInCart$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @ViewChild(QuantitySelectorComponent) quantitySelector!: QuantitySelectorComponent;

  constructor(protected productDataService: ProductDataService, private route: ActivatedRoute, private router: Router, protected cartService: CartService) {
    this.retrieveProductFromRoute();
    this.refreshIsProductInCartOnProductRetrieved();
  }

  private retrieveProductFromRoute(): void {
    this.route.params.pipe(take(1)).subscribe(params => {
      const productId: string = params['id'];
      this.product$ = this.productDataService.getProduct(productId);
    });
  }

  private refreshIsProductInCartOnProductRetrieved(): void {
    this.product$.pipe(take(1)).subscribe(product => {
      this.isProductInCart$.next(this.cartService.isProductInCart(product));
    });
  }

  protected addToCart() {
    this.product$.pipe(last()).subscribe(product => {
      const quantity: number = this.quantitySelector.quantity;
      const cartItem: CartItem = new CartItem(product, quantity);
      this.cartService.addItem(cartItem).subscribe(item => {
        cartItem.id = item.id;
      });
    });
    
    //reset animation and update observable
    this.playSlideRightAnimation('cart-button', 'closed')
    this.isProductInCart$.next(true);
  }

  protected goToCart(): void {
    this.router.navigate(['cart'])
  }

  protected deleteFromCart(): void {
    this.product$.pipe(take(1)).subscribe(product => {
      this.cartService.removeItem(product.id);
    });
    this.isProductInCart$.next(false);
  }




  //animation
  protected cartButtonState = 'closed';
  protected buyButtonState = 'closed';

  protected playSlideRightAnimation(element: string, state: string) {
    switch (element) {
      case 'cart-button':
        this.cartButtonState = state;
        break;
      case 'buy-button':
        this.buyButtonState = state;
        break;
    }
  }
}
