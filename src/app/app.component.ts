import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showMobileMenu = false;

  toggleMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }
}
