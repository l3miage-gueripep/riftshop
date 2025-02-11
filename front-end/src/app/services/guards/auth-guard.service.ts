import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { FirebaseLoginService } from '../firebase-login.service';

//authentication guard
@Injectable()
export class AuthGuard {
  constructor(private firebaseLoginService: FirebaseLoginService, private router: Router) { 

  }
  canActivate(redirectTo: string): UrlTree | boolean {
    if (!this.firebaseLoginService.user) {
      return this.router.createUrlTree(['login'], { queryParams: { returnUrl: redirectTo } });
    }
    else{
      return true;
    }
  }
}

export const canActivateUser: CanActivateFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthGuard).canActivate(state.url);
};


