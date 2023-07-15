import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductComponent } from './product-listing-item/product-listing-item.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent,
    ProductListingComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
