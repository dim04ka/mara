import { Injectable } from '@angular/core';
import { Product } from '../interfaces/table';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products = new BehaviorSubject<Product[]>([]);
  products$ = this.products.asObservable();

  setProduct(products: Product[]) {
    this.products.next(products);
  }
}
