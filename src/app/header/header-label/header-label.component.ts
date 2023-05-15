import { Component } from '@angular/core';

@Component({
  selector: 'app-header-label',
  templateUrl: './header-label.component.html',
  styleUrls: ['./header-label.component.scss']
})
export class HeaderLabelComponent {
  show = true;

  remove() {
    this.show = false;
  }
}
