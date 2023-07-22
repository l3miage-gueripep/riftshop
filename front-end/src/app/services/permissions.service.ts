import { Injectable, inject } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { UrlTree, Router, ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard {
  constructor(private firebaseService: FirebaseService, private router: Router) { 

  }
  canActivate(redirectTo: string): UrlTree | boolean {
    console.log(redirectTo)
    if (!this.firebaseService.user$.value) {
      return this.router.createUrlTree(['login'], { queryParams: { returnUrl: redirectTo } });
    }
    else{
      return true;
    }
  }
  canMatch(): boolean {
    return true;
  }
}

export const canActivateUser: CanActivateFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log('can ac')
  return inject(AuthGuard).canActivate(state.url);
};

