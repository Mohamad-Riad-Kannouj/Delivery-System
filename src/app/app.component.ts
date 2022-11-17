import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    window.onbeforeunload = function () {
      localStorage.removeItem('user');
      return '';
    };
  }
  scrollToTop() {
    window.scrollTo(0, 0)
  }
}
