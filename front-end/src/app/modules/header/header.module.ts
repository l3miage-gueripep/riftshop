import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuButtonsComponent } from './menu-buttons/menu-buttons.component';
import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo/logo.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuButtonsComponent,
    LogoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    MatProgressBarModule,
    MatBadgeModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
