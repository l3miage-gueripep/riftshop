import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ProductComponent } from './modules/product/product.component';
import { UserComponent } from './modules/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'products/:id', component: ProductComponent, data: {animation: 'ProductPage'}  },
  { path: 'home', component: HomeComponent, data: {animation: 'HomePage'} },
  { path: 'user', component: UserComponent, data: {animation: 'UserPage'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
