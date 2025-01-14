import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CartService } from '../cart.service';

@Injectable()
export class PaymentGuard {
  constructor(private cartService: CartService, private router: Router) { 

  }
  canActivate(redirectTo: string): UrlTree | boolean {
    if (this.cartService.itemsAmount <= 0) {
      return this.router.createUrlTree([''], { queryParams: { returnUrl: redirectTo } });
    }
    else{
      return true;
    }
  }
}

export const canActivatePayment: CanActivateFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PaymentGuard).canActivate(state.url);
};


