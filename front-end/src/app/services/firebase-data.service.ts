import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { CollectionReference, DocumentData, DocumentSnapshot, Firestore, FirestoreDataConverter, Query, QuerySnapshot, collection, doc, getDoc, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore";
import { Observable, from, map, of } from 'rxjs';
import { ClassConstructor, plainToInstance } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  public readonly db: Firestore;
  constructor(private firebaseService: FirebaseService) { 
    this.db = getFirestore(this.firebaseService.app);
  }

  public getDocFromFirebaseOrLocalStorage<DataType>(collectionName: string, docId: string, converter: FirestoreDataConverter<DataType>, typeContructor: ClassConstructor<DataType>): Observable<DataType> {
    const dataString = sessionStorage.getItem(docId);
    if(dataString){
      console.log("Document found in session storage");
      return from([plainToInstance(typeContructor, JSON.parse(dataString) as DataType)]);
    }
    const docRef = doc(this.db, collectionName, docId).withConverter(converter);
    return from(getDoc(docRef)).pipe(
      map(doc =>{
        const product = doc.data() as DataType;
        sessionStorage.setItem(docId, JSON.stringify(product));
        return product;
      })
    );
  }

  public getCollectionFromFirebaseOrLocalStorage<DataType>(collectionName: string, converter: any, typeConstructor: ClassConstructor<DataType>): Observable<DataType[]> {
    const result = this.tryGetCollectionFromLocalStorage(collectionName, typeConstructor);
    if(result)
      return of(result);
    const q = collection(this.db, collectionName).withConverter(converter);
    return this.getObservableFromQuery(q, collectionName);
  }

  public getObservableFromQuery<DataType>(q: CollectionReference<DocumentData> | Query<DocumentData>, collectionName: string): Observable<DataType[]>{
    return from(getDocs(q)).pipe(
      map(querySnapshot =>{
        const data = querySnapshot.docs.map(doc =>{
          const dataItem = doc.data() as DataType;
          sessionStorage.setItem(doc.id, JSON.stringify(dataItem)); 
          return dataItem;
        });
        sessionStorage.setItem(collectionName, JSON.stringify(data)); 
        return data;
      })
    );
  }

  public getCollectionFromFirebaseOrLocalStorageWhere<DataType>(collectionName: string, converter: any, field: string, operator: any, value: any, typeConstructor: ClassConstructor<DataType>, sortField?: string): Observable<DataType[]> {
    const result = this.tryGetCollectionFromLocalStorage(collectionName, typeConstructor);
    if(result)
      return of(result);

    //not very clean way i guess, maybe there is a better way to do this
    const q = sortField ? 
    query(collection(this.db, collectionName).withConverter(converter), where(field, operator, value), orderBy(sortField)) 
    : query(collection(this.db, collectionName).withConverter(converter), where(field, operator, value));

    return this.getObservableFromQuery(q, collectionName);
  }

  public tryGetCollectionFromLocalStorage<DataType>(collectionName: string, typeContructor: ClassConstructor<DataType>): DataType[] | null {
    const collectionString = sessionStorage.getItem(collectionName);
    if(collectionString){
      console.log("Collection found in session storage");
      return plainToInstance(typeContructor, JSON.parse(collectionString) as DataType[]);
    }
    return null;
  }

}
