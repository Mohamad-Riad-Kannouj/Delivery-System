import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(public _router: Router) { }

  canActivate() {
    if (localStorage.getItem('user')) {
      return true
    }
    this._router.navigate(['unAuth']);
    return false
  }
}