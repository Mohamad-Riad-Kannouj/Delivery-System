import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  large = true;

  constructor() { }

  ngOnInit(): void {
    const screenSizeListener = window.matchMedia("(min-width: 991px)");
    this.large = screenSizeListener.matches;
    screenSizeListener.addEventListener("change", (event) =>
      this.large = event.matches
    );
  }

}