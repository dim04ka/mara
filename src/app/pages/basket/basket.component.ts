import { Component } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { Item } from '../../interfaces/basket';
import { DataService } from '../../services/data.service';
import { IBasketOrder } from '../../interfaces/basket';
import { Product } from '../../interfaces/table';
import { Observable } from 'rxjs';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TelegramService } from '../../services/telegram.service';
import { HttpClient } from '@angular/common/http';
import { FirestoreService } from '../../services/firestore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    // this.afs
    //   .collection('products')
    //   .valueChanges()
    //   .subscribe(data => {
    //     this.products = data as Product[];
    //     this.checkLoading();
    //   });

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

  onSubmit() {
    if (this.orderForm.valid) {
      // Process the form data
      console.log('Form submitted successfully!', this.orderForm.value);
    } else {
      // Display error messages or handle accordingly
      console.log('Form has validation errors.');
    }
  }

  private checkLoading() {
    if (this.products.length > 0) {
      this.isLoading = false;
    }
  }

  // getData(): IBasketOrder[] {
  //   return this.products
  //     .map((product: Product) => {
  //       return {
  //         ...product,
  //         countProduct: this.value.find(el => el.id)?.count || 0,
  //       };
  //     })
  //     .filter((product: IBasketOrder) =>
  //       this.currentValueIds.includes(product.id)
  //     );
  // }
  protected readonly JSON = JSON;

  private token = '6858475451:AAGTZ1BjJveNjVWZB3cn970F1UXIBey2hnU'; // Replace with your backend server URL
  private chatId = '-1001873241129';
  messages: string[] = [];

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
