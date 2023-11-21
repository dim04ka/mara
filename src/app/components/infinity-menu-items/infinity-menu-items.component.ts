import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-infinity-menu-items',
  templateUrl: './infinity-menu-items.component.html',
  styleUrls: ['./infinity-menu-items.component.scss'],
})
export class InfinityMenuItemsComponent {
  value = '';
  @Input() set text(text: string[]) {
    this.value = (
      text.map(el => el[0].toLocaleUpperCase() + el.slice(1)).join(' • ') +
      ' • '
    ).repeat(3);
  }
}
