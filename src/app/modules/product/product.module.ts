import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';

@NgModule({
  declarations: [
    ProductComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedComponentsModule,
  ],
  exports: [
    ProductComponent
  ]
})
export class ProductModule { }
