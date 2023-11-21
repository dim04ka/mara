import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/table';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    private productService: ProductService
  ) {}
  getValues(): Observable<any[]> {
    return this.firestore.collection('products').valueChanges();
  }

  loadValues(): void {
    this.getValues().subscribe((products: Product[]) => {
      this.productService.setProduct(products);
    });
  }
}
