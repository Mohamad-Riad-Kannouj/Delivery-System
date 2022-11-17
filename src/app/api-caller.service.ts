import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment'
import { FoodItem, User } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiCallerService {
  private api_url: string = environment.api_url
  private orders_url: string = environment.orders_url

  cart: any[] = [];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(environment.api_auth)
    })
  };

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  getRestaurants() {
    return this.http.get(this.api_url, this.httpOptions)
  }

  addItem(item: FoodItem): void {
    this.cart.push(item)
  }

  postData(data: any): void {
    this.http.post<any>(this.orders_url + 'createNewOrder/', { formdata: JSON.stringify(data) })
      .subscribe({
        next: (response) => this.router.navigate(['orderConfirmation']),
        error: (error) => console.log(error),
        complete: () => {
          localStorage.clear()
          this.cart = []
        },
      });
  }

  createCustomer(customer: User) {
    return this.http.post<any>(this.orders_url + 'createNewCustomer/', { customer: JSON.stringify(customer) })
  }

  createPaymentIntent(paymentInfo: any) {
    return this.http.post<any>(this.orders_url + 'createPaymentIntent/', JSON.stringify(paymentInfo))
  }
}