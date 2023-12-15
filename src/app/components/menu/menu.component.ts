import { Component, EventEmitter, Input, Output } from '@angular/core';
import { categories } from '../../constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() isMenuOpen = false;

  @Output() isMenuOpenChange = new EventEmitter<boolean>();

  getLink(id: string) {
    return `category/${id}`;
  }

  protected readonly categories = categories;
}
