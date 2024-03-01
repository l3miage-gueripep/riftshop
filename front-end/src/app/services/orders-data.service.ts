import { Injectable } from '@angular/core';
import { FirebaseDataService } from './firebase-data.service';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { collection, orderBy, where, query } from "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private collectionName: string = "orders";
  constructor(private firebaseDataService: FirebaseDataService) { }
  
  public getOrders(){
    return this.firebaseDataService.getCollectionFromFirebaseOrLocalStorage(this.collectionName, Order.firebaseConverter, Order);
  }

  public getUserOrders(userUid: string): Observable<Order[]>{
    const q = query(collection(this.firebaseDataService.db, this.collectionName).withConverter(Order.firebaseConverter), where("userUid", "==", userUid), orderBy("date"));
    return this.firebaseDataService.getObservableFromQuery(q, this.collectionName);
  }
}
