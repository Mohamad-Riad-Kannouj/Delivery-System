import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../api-caller.service'
import { loadStripe, Stripe } from '@stripe/stripe-js';

import { environment } from '../../environments/environment';
import { User } from '../interfaces';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cash: boolean = true

  cart: any[] = []
  totalItems: number = 0
  subTotal: number = 0

  id: string = ''
  firstName: string = ''
  lastName: string = ''
  email: string = ''
  phone: string = ''
  zone: string = ''
  address: string = ''
  address_details: string = ''

  private stripe?: Stripe | null;
  private stripe_pub_key: string = environment.stripe_pub_key
  private clientSecret: string = ''
  elements: any;
  card: any;
  submitted: boolean = false;

  constructor(private http: ApiCallerService) { }

  async ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user')!)
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.user(user);

    if ('cart' in localStorage) {
      this.http.cart = JSON.parse(localStorage.getItem('cart')!)
    }
    
    this.cart = this.http.cart;
    this.totalItems = this.http.cart.length;
    this.subTotal = parseFloat(localStorage.getItem('subTotal')!)

    this.stripe = await loadStripe(this.stripe_pub_key);
    this.elements = this.stripe!.elements();

    let styleCard = {
      base: {
        fontWeight: '500',
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
      },
      invalid: {
        iconColor: '#FFC7EE',
        color: '#ce1212',
      },
    };
    this.card = this.elements.create('card', {
      style: styleCard,
      hidePostalCode: true,
    })

    this.card.mount('#card-element');
    this.card.on('change', function (event: any) {
      let displayError = document.getElementById('messages');
      event.error ? displayError!.textContent = event.error.message : displayError!.textContent = '';
    });
  }

  placeOrder(settled: boolean) {
    const data = { cart: JSON.parse(localStorage.getItem('cart')!), id: this.id, fname: this.firstName, lname: this.lastName, phone: this.phone, zone: this.zone, address: this.address, address_details: this.address_details, settled: settled }
    this.http.postData(data)
  }

  user(user: User) {
    this.http.createCustomer(user)
      .subscribe({
        next: (customer) => {
          this.id = customer.id
          this.firstName = customer.fname
          this.lastName = customer.lname
          this.email = customer.email
          if ('shipping_address' in customer) {
            this.phone = customer.phone
            this.zone = customer.shipping_address.zone
            this.address = customer.shipping_address.address
            this.address_details = customer.shipping_address.address_details
          }
        },
        error: (error) => console.log(error),
      })
  }

  createIntent() {
    if (this.submitted) return;
    this.submitted = true;

    this.http.createPaymentIntent({
      amount: (this.subTotal + 5),
      currency: "usd",
      paymentMethodType: "card",
    }).subscribe({
      next: async (response) => {
        this.clientSecret = response.clientSecret
        let displayError = document.getElementById('messages');
        displayError!.textContent = 'Confirming Your Payment...';
      },
      error: (backendError) => {
        let displayError = document.getElementById('messages');
        backendError ? displayError!.textContent = 'Server Error' : displayError!.textContent = '';
        this.submitted = false
      },
      complete: async () => {
        await this.stripe?.confirmCardPayment(
          this.clientSecret,
          {
            payment_method: {
              card: this.card,
              billing_details: {
                name: this.firstName + ' ' + this.lastName,
                email: this.email,
                phone: this.phone,
              }
            }
          }
        ).then((result) => {
          if (result.paymentIntent) {
            let displayError = document.getElementById('messages');
            displayError!.textContent = `Payment ${result.paymentIntent.status}`;
            this.placeOrder(true)
          }
          if (result.error) {
            let displayError = document.getElementById('messages');
            displayError!.textContent = result.error.message!;
            this.submitted = false;
          }
        })
      }
    })


  }

  paymentMethod(paymentMethod: boolean) {
    this.cash = paymentMethod
  }
}