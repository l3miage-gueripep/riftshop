import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ProductComponent } from './modules/product/product.component';
import { UserComponent } from './modules/user/user.component';
import { CartComponent } from './modules/cart/cart.component';
import { PaypalCheckoutComponent } from './shared-components/paypal-checkout/paypal-checkout.component';
import { PaymentComponent } from './modules/payment/payment.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'products/:id', component: ProductComponent, data: {animation: 'ProductPage'}  },
  { path: 'home', component: HomeComponent, data: {animation: 'HomePage'} },
  { path: 'user', component: UserComponent, data: {animation: 'UserPage'} },
  { path: 'cart', component: CartComponent, data: {animation: 'CartPage'} },
  { path: 'payment', component: PaymentComponent, data: {animation: 'PaymentPage'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
