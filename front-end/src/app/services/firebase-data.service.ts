import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { DocumentSnapshot, Firestore, QuerySnapshot, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  private readonly db: Firestore;
  constructor(private firebaseService: FirebaseService) { 
    this.db = getFirestore(this.firebaseService.app);
  }

  public getDoc(collectionName: string, docId: string, converter: any): Observable<DocumentSnapshot> {
    const docRef = doc(this.db, collectionName, docId).withConverter(converter);
    return from(getDoc(docRef));
  }

  public getCollection(collectionName: string, converter: any): Observable<QuerySnapshot> {
    const q = collection(this.db, collectionName).withConverter(converter);
    return from(getDocs(q));
  }

  //you can make queries such as this
  //const q = query(collection(db, "cities"), where("capital", "==", true));

}
