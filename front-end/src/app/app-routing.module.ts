import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ProductComponent } from './modules/product/product.component';
import { UserComponent } from './modules/user/user.component';
import { CartComponent } from './modules/cart/cart.component';
import { PaymentComponent } from './modules/payment/payment.component';
import { canActivateUser } from './services/permissions.service';
import { LoginComponent } from './modules/login-system/login.component';
import { OrdersComponent } from './modules/user/orders/orders.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'products/:id', component: ProductComponent, data: { animation: 'ProductPage' } },
  { path: 'home', component: HomeComponent, data: { animation: 'HomePage' } },
  { path: 'user', component: UserComponent, data: { animation: 'UserPage' }, canActivate: [canActivateUser],},
  { path: 'login', component: LoginComponent, data: { animation: 'LoginPage' }},
  { path: 'cart', component: CartComponent, data: { animation: 'CartPage' } },
  { path: 'payment', component: PaymentComponent, data: { animation: 'PaymentPage' }, canActivate: [canActivateUser] },
  { path: 'orders', component: OrdersComponent, data: { animation: 'OrdersPage' }, canActivate: [canActivateUser] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
