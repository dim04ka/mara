import { Component } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { Item } from '../../interfaces/basket';
import { Product } from '../../interfaces/table';
import { HttpClient } from '@angular/common/http';
import { FirestoreService } from '../../services/firestore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketPageComponent {
  currentValueIds: string[] = [];
  value: Item[] = [];
  products: Product[] = [];
  isLoading: boolean = true;

  doneOrder = false;

  constructor(
    private basketService: BasketService,
    private http: HttpClient,
    private firestoreService: FirestoreService
  ) {
    this.firestoreService.loadValues();

    this.basketService.getBasket().subscribe((value: Item[]) => {
      this.value = value;
      this.currentValueIds = value.map(item => item.id);
      this.checkLoading();
    });
  }

  orderForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    text: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  private checkLoading() {
    if (this.products.length > 0) {
      this.isLoading = false;
    }
  }

  protected readonly JSON = JSON;

  private token = environment.telegram.token;
  private chatId = environment.telegram.chatId;

  sendTelegramMessage() {
    this.http
      .get(`https://api.telegram.org/bot${this.token}/getUpdates`)
      .subscribe((response: any) => {
        this.http
          .post(`https://api.telegram.org/bot${this.token}/sendMessage`, {
            chat_id: this.chatId,
            text: `
            Заявка: ${JSON.stringify(this.orderForm.value)}
            Товары: ${JSON.stringify(this.basketService.order$.value)}
            Стоимость заказа: ${JSON.stringify(
              this.basketService.amount$.value
            )}₾
            `,
          })
          .subscribe((response: any) => {
            if (response.ok) {
              this.doneOrder = true;
              this.basketService.order$.next([]);
              this.basketService.basket.next([]);
              this.basketService.amount$.next(0);
              this.orderForm.reset();
              localStorage.removeItem('basket');
            }
          });
      });
  }

  async submit() {
    if (this.orderForm.valid) {
      this.sendTelegramMessage();
    }
  }
}
