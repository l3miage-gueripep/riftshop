import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User, signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, Auth, onAuthStateChanged, signInWithRedirect } from 'firebase/auth';
import { BehaviorSubject, skip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {
  private auth: Auth;
  public user?: User;

  constructor(firebaseService: FirebaseService, private router: Router, private route: ActivatedRoute) {
    this.auth = getAuth();
    this.user = this.getUserFromLocalStorage();
    console.log(this.user);
  }
  

  private autoRedirect() {
    let redirectTo: string;
    if(this.user){
      const returnUrl = this.route.snapshot.queryParams['returnUrl'];
      redirectTo = returnUrl ? returnUrl : 'user';
    }
    else{
      redirectTo = '';
    }
    this.router.navigate([redirectTo]);
  }

  public async login(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        localStorage.setItem('userAuth', JSON.stringify(userCredential));
        this.autoRedirect();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  public register(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        this.user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn(errorCode, errorMessage);
      });
  }

  public logout() {
    this.auth.signOut().then(() => {
      this.user = undefined;
      localStorage.removeItem('userAuth');
      this.autoRedirect();
    });
  }

  private getUserFromLocalStorage(): User | undefined {
    const userAuth = localStorage.getItem('userAuth');
    if (userAuth) {
      const userAuthObj = JSON.parse(userAuth);
      return userAuthObj.user;
    }
    return undefined;
  }


}
