import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FoodlistComponent } from './foodlist/foodlist.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ApiCallerService } from './api-caller.service';
import { UnAuthComponent } from './unAuth/unAuth.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './auth.service';

import { environment } from '../environments/environment'
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    FoodlistComponent,
    HomeComponent,
    NavbarComponent,
    CheckoutComponent,
    CartComponent,
    OrderConfirmationComponent,
    RestaurantsComponent,
    UnAuthComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.google_client_key
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }, ApiCallerService, AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }