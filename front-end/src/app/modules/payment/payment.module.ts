import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedComponentsModule } from "../../shared-components/shared-components.module";
import { PaymentItemComponent } from './payment-item/payment-item.component';
import { PaymentComponent } from './payment.component';
import { PaymentProductComponent } from './payment-product/payment-product.component';



@NgModule({
    declarations: [
        PaymentComponent,
        PaymentItemComponent,
        PaymentProductComponent
    ],
    exports: [
        PaymentComponent
    ],
    imports: [
        CommonModule,
        SharedComponentsModule,
        RouterModule,
        MatButtonModule,
        MatCardModule,
        FontAwesomeModule,
        MatListModule
    ]
})
export class PaymentModule { }
