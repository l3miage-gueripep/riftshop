import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { CartService } from '../cart.service';

@Injectable()
export class PaymentGuard {
  constructor(private cartService: CartService, private router: Router) { 

  }
  canActivate(redirectTo: string): Observable<UrlTree | boolean> {
    //wait for the cart to be loaded
    return this.cartService.loaded$.pipe(
      filter(loaded => loaded !== false),
      map(() => {
        if (this.cartService.itemsAmount <= 0) {
          return this.router.createUrlTree([''], { queryParams: { returnUrl: redirectTo } });
        }
        return true;
      })
    );
  }
}

export const canActivatePayment: CanActivateFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PaymentGuard).canActivate(state.url);
};


