import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { DocumentSnapshot, Firestore, QuerySnapshot, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { Observable, from, map } from 'rxjs';

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

  public getCollectionWhere<DataType>(collectionName: string, converter: any, field: string, operator: any, value: any): Observable<DataType[]> {
    const q = query(collection(this.db, collectionName).withConverter(converter), where(field, operator, value));
    return from(getDocs(q)).pipe(
      map(querySnapshot =>{
        return querySnapshot.docs.map(doc => doc.data() as DataType);
      })
    );
  }

}
