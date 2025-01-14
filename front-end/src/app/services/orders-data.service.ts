import { Injectable } from '@angular/core';
import { collection, orderBy, query, where } from "firebase/firestore";
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { FirebaseDataService } from './firebase-data.service';


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
    const q = query(collection(this.firebaseDataService.db, this.collectionName).withConverter(Order.firebaseConverter), where("userUid", "==", userUid), orderBy("date", "desc"));
    return this.firebaseDataService.getObservableFromQuery(q, this.collectionName);
  }
}
