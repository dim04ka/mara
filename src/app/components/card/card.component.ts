import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/table';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() product: Product | null = null;
  @Output() addToBasket = new EventEmitter<{ id: string; count: number }>();
}
