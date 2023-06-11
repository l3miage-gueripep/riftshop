import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuButtonsComponent } from './menu-buttons/menu-buttons.component';
import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo/logo.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuButtonsComponent,
    LogoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
