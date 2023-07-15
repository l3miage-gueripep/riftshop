import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { SharedComponentsModule } from "../../shared-components/shared-components.module";



@NgModule({
    declarations: [
        PaymentComponent
    ],
    exports: [
        PaymentComponent
    ],
    imports: [
        CommonModule,
        SharedComponentsModule
    ]
})
export class PaymentModule { }
