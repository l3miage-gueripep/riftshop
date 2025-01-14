import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartModule } from './modules/cart/cart.module';
import { HeaderModule } from './modules/header/header.module';
import { HomeModule } from './modules/home/home.module';
import { LoginSystemModule } from './modules/login-system/login-system.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ProductModule } from './modules/product/product.module';
import { ErrorHandlerService } from './modules/system/error-handler.service';
import { UserModule } from './modules/user/user.module';
import { AuthGuard } from './services/guards/auth-guard.service';
import { PaymentGuard } from './services/guards/payment-guard.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HeaderModule,
    HomeModule,
    ProductModule,
    CartModule,
    PaymentModule,
    FontAwesomeModule,
    LoginSystemModule,
    UserModule
  ],
  providers: [AuthGuard, PaymentGuard, { provide: ErrorHandler, useClass: ErrorHandlerService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
