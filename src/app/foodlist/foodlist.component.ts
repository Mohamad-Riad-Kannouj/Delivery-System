import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiCallerService } from '../api-caller.service'
import { FoodItem, Restaurant } from '../interfaces';


@Component({
  selector: 'app-foodlist',
  templateUrl: './foodlist.component.html',
  styleUrls: ['./foodlist.component.css']
})
export class FoodlistComponent implements OnInit {
  restaurant: any = []
  categories: any = []

  constructor(private http: ApiCallerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let restaurant_id_int = 0;
    this.route.paramMap.subscribe((params: ParamMap) => {
      let restaurant_id_str = params.get('id')
      restaurant_id_int = parseInt(restaurant_id_str!);
    });

    this.getMenu(restaurant_id_int);
  }

  getMenu(id: number): void {
    this.http.getRestaurants().subscribe((rest: any) => {
      this.restaurant = rest[id]
      this.categories = rest[id].categories
    })
  }

  addToCart(food: any): void {
    food['quantity'] = 1

    if ('cart' in localStorage) {
      this.http.cart = JSON.parse(localStorage.getItem('cart')!)
      let exist = this.http.cart.find((item: FoodItem) => item.name === food.name)

      if (!exist) {
        this.http.addItem(food)
        localStorage.setItem('cart', JSON.stringify(this.http.cart))
      }

    } else {
      this.http.addItem(food)
      localStorage.setItem('cart', JSON.stringify(this.http.cart))
    }
  }

}