import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/table';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataService } from '../../services/data.service';
import { Item } from '../../interfaces/basket';
import { BasketService } from '../../services/basket.service';
import { ProductService } from '../../services/product.service';
import { FirestoreService } from '../../services/firestore.service';
import { categoryGroupByName } from '../../constants';
import { CATEGORY } from '../../interfaces/category';

@Component({
  selector: 'app-category-root',
  templateUrl: './category-root.component.html',
  styleUrls: ['./category-root.component.scss'],
})
export class CategoryRootComponent {
  category = '';
  data: Product[] = [];
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private basketService: BasketService,
    private firestoreService: FirestoreService,
    private productService: ProductService
  ) {
    this.firestoreService.loadValues();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.productService.products$.subscribe(products => {
        this.data = products.filter(
          product => product.category === this.categoryId(this.category)
        );
      });
    });
  }

  getCategoryId(category: CATEGORY) {
    return categoryGroupByName[category];
  }

  addToBasket({ id, count }: Item) {
    console.log('id: id, count: count ', id, count);
    this.basketService.addToBasket({ id: id, count: count });
  }

  private categoryId(category: string) {
    const categoryGroup: Record<any, string> = {
      candles: '0',
      wax: '1',
      candlewick: '2',
      other: '3',
    };
    return categoryGroup[category];
  }
}
