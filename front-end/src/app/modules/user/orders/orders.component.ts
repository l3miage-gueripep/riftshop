import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { FirebaseLoginService } from 'src/app/services/firebase-login.service';
import { OrdersService } from 'src/app/services/orders-data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  protected orders$: Observable<Order[]>
  constructor(private orderService: OrdersService, private firebaseLoginService: FirebaseLoginService) { 
    const user = this.firebaseLoginService.user!;
    console.log(user);
    this.orders$ = this.orderService.getUserOrders(user.uid);
    this.orders$.subscribe(orders => console.log(orders));
  }

}
