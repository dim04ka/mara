import { Injectable } from '@angular/core';
import { Product } from '../interfaces/table';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { PRODUCTS_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private productService: ProductService,
    private http: HttpClient
  ) {}

  loadValues(): void {
    this.http
      .get(PRODUCTS_URL + '/products')
      .subscribe((products: Product[]) => {
        this.productService.setProduct(products);
      });
  }

  addProduct(product: any): void {
    this.http.post(PRODUCTS_URL + '/create', product).subscribe(res => {
      this.loadValues();
    });
  }
  update(product: any): void {
    this.http.post(PRODUCTS_URL + '/update', product).subscribe(() => {
      this.loadValues();
    });
  }

  delete(id: string): void {
    this.http.delete(PRODUCTS_URL + `/delete/${id}`).subscribe(() => {
      this.loadValues();
    });
  }
}
