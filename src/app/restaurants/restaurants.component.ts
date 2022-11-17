import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiCallerService } from '../api-caller.service'
import { Restaurant } from '../interfaces';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  restaurants: any = []

  constructor(private http: ApiCallerService, private router: Router) { }

  ngOnInit(): void {
    this.getRestaurants()
  }

  getRestaurants(): void {
    this.http.getRestaurants().subscribe({
      next: (rest) => this.restaurants = rest,
      error: (error) => console.log(error)
    })
  }

  navToRestMenu(rest: Restaurant) {
    let id = this.restaurants.findIndex((restaurant: Restaurant) => {
      return restaurant.name === rest.name;
    })
    this.router.navigate(['restaurants', id]);
  }
}