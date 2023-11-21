import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Item } from '../interfaces/basket';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  public basket = new BehaviorSubject<Item[]>([]);
  isShowBucket$ = new BehaviorSubject<boolean>(true);
  public order$ = new BehaviorSubject<any>([]);
  public amount$ = new BehaviorSubject<number>(0);
  constructor(public afs: AngularFirestore) {
    this.initialBasket();
    this.basket.subscribe(items => {
      localStorage.setItem('basket', JSON.stringify(items));
    });
  }

  getBasket() {
    return this.basket.asObservable();
  }

  addToBasket(item: { id: string; count: number }) {
    const v = this.basket.value;
    console.log('item', item);
    if (v.find(el => el.id === item.id)) {
      const res = v.map(el => {
        if (el.id === item.id) {
          return {
            ...el,
            count: el.count + item.count,
          };
        }
        return el;
      });
      console.log('res', res);
      this.basket.next(res);
    } else {
      this.basket.next([...this.basket.value, item]);
    }
  }

  private initialBasket() {
    const items = localStorage.getItem('basket');
    if (items) {
      this.basket.next(JSON.parse(items));
    } else {
      localStorage.setItem('basket', JSON.stringify([]));
    }
  }
}
