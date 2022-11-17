import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';

import { ApiCallerService } from '../api-caller.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any[] = []
  totalItems: number = 0
  subTotal: number = 0

  user!: SocialUser;
  loggedIn!: boolean;

  constructor(private http: ApiCallerService, private router: Router, private authService: SocialAuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if ('cart' in localStorage) {
      this.http.cart = JSON.parse(localStorage.getItem('cart')!)
      this.cart = this.http.cart;
      this.totalItems = this.http.cart.length;
      this.subTotal = this.getSubTotal()
    }

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  getSubTotal(): number {
    let price = 0

    for (let i of this.cart) {
      price += (i.price * i.quantity)
    }

    return price
  }

  changeItemQty(): void {
    this.subTotal = this.getSubTotal()
  }

  deleteItem(oldItem: any): void {
    let oldCart = JSON.parse(localStorage.getItem('cart')!)
    let newCart = oldCart.filter((ob: any) => oldItem.name != ob.name)

    this.cart = newCart
    this.http.cart = newCart
    this.totalItems -= 1
    this.subTotal -= (oldItem.quantity * oldItem.price)

    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  checkout(): void {
    const cart = this.cart

    if (cart.length !== 0) {
      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('cart', JSON.stringify(cart))
      localStorage.setItem('subTotal', String(this.subTotal))
      this.router.navigate(['checkout']);
    }
    else {
      alert("Please add item(s) to your cart to proceed")
    }
  }
}