import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './modules/cart/cart.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login-system/login.component';
import { PaymentComponent } from './modules/payment/payment.component';
import { ProductComponent } from './modules/product/product.component';
import { NotFoundComponent } from './modules/system/not-found/not-found.component';
import { OrdersComponent } from './modules/user/orders/orders.component';
import { UserComponent } from './modules/user/user.component';
import { canActivateUser } from './services/guards/auth-guard.service';
import { canActivatePayment } from './services/guards/payment-guard.service';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'products/:id', component: ProductComponent, data: { animation: 'ProductPage' } },
  { path: 'home', component: HomeComponent, data: { animation: 'HomePage' } },
  { path: 'user', component: UserComponent, data: { animation: 'UserPage' }, canActivate: [canActivateUser],},
  { path: 'login', component: LoginComponent, data: { animation: 'LoginPage' }},
  { path: 'cart', component: CartComponent, data: { animation: 'CartPage' } },
  { path: 'payment', component: PaymentComponent, data: { animation: 'PaymentPage' }, canActivate: [canActivateUser, canActivatePayment] },
  { path: 'payment/:productId', component: PaymentComponent, data: { animation: 'PaymentPage' }, canActivate: [canActivateUser] },
  { path: 'orders', component: OrdersComponent, data: { animation: 'OrdersPage' }, canActivate: [canActivateUser] },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
