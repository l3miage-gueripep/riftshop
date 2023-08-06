import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrdersComponent } from './orders/orders.component';
import { MatListModule } from '@angular/material/list';
import { OrderItemComponent } from './orders/order-item/order-item.component';


const routes: Routes = [
  { path: '', component: UserComponent },
];

@NgModule({
  declarations: [
    UserComponent,
    OrdersComponent,
    OrderItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    FontAwesomeModule,
    MatListModule
  ],
  exports: [
    OrdersComponent
  ]
})
export class UserModule { }
