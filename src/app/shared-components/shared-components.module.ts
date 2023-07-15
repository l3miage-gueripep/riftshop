import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantitySelectorComponent } from './quantity-selector/quantity-selector.component';
import { PaypalCheckoutComponent } from './paypal-checkout/paypal-checkout.component';



@NgModule({
  declarations: [
    QuantitySelectorComponent,
    PaypalCheckoutComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    QuantitySelectorComponent,
    PaypalCheckoutComponent,
  ]
})
export class SharedComponentsModule { }
