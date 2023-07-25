import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";
import { FirebaseApp, initializeApp } from 'firebase/app';
import { BehaviorSubject, skip } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, getDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public app: FirebaseApp ;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBwOyfpQ7yhQexjzQoEozuAgkCfh9RA8hs",
      authDomain: "riftshop-340d2.firebaseapp.com",
      projectId: "riftshop-340d2",
      storageBucket: "riftshop-340d2.appspot.com",
      messagingSenderId: "11492220451",
      appId: "1:11492220451:web:becca9e373961aadd91b96"
    };
    
    this.app = initializeApp(firebaseConfig);
  }
}
