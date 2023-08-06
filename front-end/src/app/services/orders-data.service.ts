import { Injectable } from '@angular/core';
import { FirebaseDataService } from './firebase-data.service';
import { Order } from '../models/order';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private firebaseDataService: FirebaseDataService) { }
  
  public getOrders(){
    return this.firebaseDataService.getCollection("orders", Order.firebaseConverter).pipe(
      map(querySnapshot =>{
        return querySnapshot.docs.map(doc => doc.data() as Order);
      })
    );
  }

  public getUserOrders(userUid: string): Observable<Order[]>{
    return this.firebaseDataService.getCollectionWhere<Order>("orders", Order.firebaseConverter, "userUid", "==", userUid)
  }
}
