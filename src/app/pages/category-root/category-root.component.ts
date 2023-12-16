import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/table';
import { Item } from '../../interfaces/basket';
import { BasketService } from '../../services/basket.service';
import { ProductService } from '../../services/product.service';
import { FirestoreService } from '../../services/firestore.service';
import { categoriesName, categoryGroup } from '../../constants';
import { CATEGORY_URL } from '../../interfaces/category';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-category-root',
  templateUrl: './category-root.component.html',
  styleUrls: ['./category-root.component.scss'],
})
export class CategoryRootComponent {
  category: CATEGORY_URL | null = null;
  data: Product[] = [];
  constructor(
    private route: ActivatedRoute,
    private basketService: BasketService,
    private firestoreService: FirestoreService,
    private productService: ProductService,
    private metaService: Meta,
    private titleService: Title,
  ) {
    this.firestoreService.loadValues();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];

      this.productService.products$.subscribe((products: Product[]) => {
        this.data = products.filter(
          product => product.category === this.categoryId(this.category)
        );
        this.addTag()
      });
    });
  }

  addToBasket({ id, count }: Item) {
    this.basketService.addToBasket({ id: id, count: count });
  }

  private categoryId(category: CATEGORY_URL) {
    return categoryGroup[category];
  }

  addTag() {
    this.titleService.setTitle(categoriesName[this.category]+ ' | Mara candles')
    this.metaService.addTags([
      {
        name: 'description',
        content:
         'Свечи || Соевый воск || Ручная работа || Тбилиси || Подарок. Свечи ручной работы Тбилиси Грузия',
      },
      {
        name: 'og:description',
        content:
          'Свечи || Соевый воск || Ручная работа || Тбилиси || Подарок. Свечи ручной работы Тбилиси Грузия',
      },
      { name: 'keywords', content: 'Свечи || Соевый воск || Ручная работа || Тбилиси || Подарок. Свечи ручной работы Тбилиси Грузия' },
      { name: 'robots', content: 'index,follow' },
      { property: 'og:locale', content: 'ru_RU' },
      { property: 'og:site_name', content: 'Свечи || Соевый воск || Ручная работа || Тбилиси || Подарок. Свечи ручной работы Тбилиси Грузия' },
      { property: 'og:title', content: categoriesName[this.category]+ ' | Mara candles' },
    ]);
  }
}
