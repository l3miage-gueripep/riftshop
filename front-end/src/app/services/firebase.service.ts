import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public app: any;
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private auth: any;
  constructor(private router: Router, private route: ActivatedRoute) {
    const firebaseConfig = {
      apiKey: "AIzaSyBwOyfpQ7yhQexjzQoEozuAgkCfh9RA8hs",
      authDomain: "riftshop-340d2.firebaseapp.com",
      projectId: "riftshop-340d2",
      storageBucket: "riftshop-340d2.appspot.com",
      messagingSenderId: "11492220451",
      appId: "1:11492220451:web:becca9e373961aadd91b96"
    };
    this.app = initializeApp(firebaseConfig);

    this.auth = getAuth();

    this.user$.subscribe((user) => {
      this.autoRedirect(user);
    });
  }

  private autoRedirect(user: User | null) {
    let redirectTo: string;
    if(user){
      const returnUrl = this.route.snapshot.queryParams['returnUrl'];
      redirectTo = returnUrl ? returnUrl : 'user';
    }
    else{
      redirectTo = '';
    }
    this.router.navigate([redirectTo]);
  }

  public login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        this.user$.next(userCredential.user);
        // ...
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
        this.user$.next(userCredential.user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  public logout() {
    console.log('logout');
    this.user$.next(null);
  }





}
