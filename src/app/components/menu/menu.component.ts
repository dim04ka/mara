import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() isMenuOpen = false;

  @Output() isMenuOpenChange = new EventEmitter<boolean>();

  categories = [
    { name: 'Свечи', id: 'candles' },
    { name: 'Воски', id: 'wax' },
    { name: 'Фитили', id: 'candlewick' },
    { name: 'Другое', id: 'other' },
  ];

  getLink(id: string) {
    return `category/${id}`;
  }
}
