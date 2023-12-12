import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataService } from '../../services/data.service';
import { BasketService } from '../../services/basket.service';
import { Product } from '../../interfaces/table';
import { Item } from '../../interfaces/basket';
import { ProductService } from '../../services/product.service';
import { Meta } from '@angular/platform-browser';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent {
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private basketService: BasketService,
    private productService: ProductService,
    private metaService: Meta,
    private firestoreService: FirestoreService
  ) {
    this.productService.products$.subscribe((data: Product[]) => {
      this.product = data.filter(el => el.id === this.id)[0];
    });
  }
  addTag() {
    this.metaService.addTags([
      {
        name: 'description',
        content:
          this.product.full_description || this.product.small_description,
      },
      {
        name: 'og:description',
        content:
          'Свечи || Соевый воск || Ручная работа || Тбилиси || Подарок. Свечи ручной работы Тбилиси Грузия',
      },
      {
        name: 'og:image',
        content: this.product.images[0],
      },
      { name: 'robots', content: 'index,follow' },
      { property: 'og:title', content: this.product.title },
    ]);
  }

  id = '';
  category = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.category = params['category'];

      this.getData();
    });
  }

  product: Product | null = null;
  getData() {
    this.productService.products$.subscribe((data: Product[]) => {
      if (data.length === 0) {
        this.firestoreService.loadValues();
      }
      this.product = data.filter(el => el.id === this.id)[0];
      this.addTag();
    });
  }

  addToBasket({ id, count }: Item) {
    this.basketService.addToBasket({ id: id, count: count });
  }
}
