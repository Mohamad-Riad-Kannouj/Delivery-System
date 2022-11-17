import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FoodlistComponent } from './foodlist/foodlist.component';
import { HomeComponent } from './home/home.component';
import { UnAuthComponent } from './unAuth/unAuth.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AuthService } from './auth.service';

const routes: Routes = [
  { path: "", title: "Home Page", component: HomeComponent },
  { path: "restaurants", title: "Restaurants", component: RestaurantsComponent },
  { path: "restaurants/:id", title: "Restaurant Menu", component: FoodlistComponent },
  { path: "cart", title: "My Cart", component: CartComponent },
  { path: "contact", title: "Contact Us", component: ContactComponent },
  { path: "about", title: "About Us", component: AboutComponent },
  { path: "checkout", title: "Checkout Page", component: CheckoutComponent, canActivate: [AuthService] },
  { path: "orderConfirmation", title: "Order Confirmed", component: OrderConfirmationComponent },
  { path: "unAuth", title: "401", component: UnAuthComponent },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }