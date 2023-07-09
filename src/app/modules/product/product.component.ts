import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, last, take } from 'rxjs';
import { slide } from 'src/app/animations/animations';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-product[product]',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [slide]
})
export class ProductComponent {
  protected product$!: Observable<Product>;
  protected selectedQuantity: number = 1;
  protected isProductInCart$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(protected productDataService: ProductDataService, private route: ActivatedRoute, private router: Router, protected cartService: CartService) {
    this.retrieveProductFromRoute();
    this.refreshIsProductInCartOnProductRetrieved();
  }

  private retrieveProductFromRoute(): void {
    this.route.params.pipe(take(1)).subscribe(params => {
      const productId: number = params['id'];
      this.product$ = this.productDataService.getProductById(productId);
    });
  }

  private refreshIsProductInCartOnProductRetrieved(): void {
    this.product$.pipe(take(1)).subscribe(product => {
      this.isProductInCart$.next(this.cartService.isProductInCart(product));
    });
  }

  protected changeQuantity(event: any) {
    const quantityToAddWhenPressingMinus: number = this.selectedQuantity > 1 ? -1 : 0;
    this.selectedQuantity += event.target.classList.contains("plus") ? 1 : quantityToAddWhenPressingMinus;
  }



  protected addToCart() {
    this.product$.pipe(last()).subscribe(product => {
      this.cartService.addProduct(product, this.selectedQuantity);
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
      this.cartService.removeProduct(product.id);
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
