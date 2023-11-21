import { Component } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { Item } from '../../interfaces/basket';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  value: Item[] = [];
  isShowBucket = true;
  constructor(private basketService: BasketService) {
    this.basketService.getBasket().subscribe((value: Item[]) => {
      this.value = value;
    });
    this.basketService.isShowBucket$.subscribe((value: boolean) => {
      this.isShowBucket = value;
    });
  }
}
