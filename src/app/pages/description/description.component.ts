import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../../services/basket.service';
import { Product } from '../../interfaces/table';
import { Item } from '../../interfaces/basket';
import { ProductService } from '../../services/product.service';
import { Meta, Title } from '@angular/platform-browser';
import { FirestoreService } from '../../services/firestore.service';
import { CATEGORY_URL } from '../../interfaces/category';
import { categoriesName } from '../../constants';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent {
  constructor(
    private route: ActivatedRoute,
    private basketService: BasketService,
    private productService: ProductService,
    private metaService: Meta,
    private firestoreService: FirestoreService,
    private titleService: Title,
  ) {
    this.productService.products$.subscribe((data: Product[]) => {
      this.product = data.filter(el => el.id === this.id)[0];
    });
  }
  addTag() {
    this.titleService.setTitle(this.product.title + ' | Mara candles')
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
        property: 'og:image',
        content: this.product.images[0].url,
      },
      { name: 'keywords', content: this.product.title },
      { name: 'robots', content: 'index,follow' },
      { property: 'og:locale', content: 'ru_RU' },
      { property: 'og:site_name', content: 'Свечи || Соевый воск || Ручная работа || Тбилиси || Подарок. Свечи ручной работы Тбилиси Грузия' },
      { property: 'og:title', content: this.product.title },
    ]);
  }

  id = '';
  category: CATEGORY_URL;

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

  currentImage = '';
  currentImageIndex = 0;

  nextSlide() {
    if (this.product.images.length <= this.currentImageIndex + 1) return;
    this.currentImageIndex = this.currentImageIndex + 1;
    this.currentImage = this.product.images[this.currentImageIndex].url;
  }

  prevSlide() {
    if (this.currentImageIndex !== 0) {
      this.currentImageIndex = this.currentImageIndex - 1;
      this.currentImage = this.product.images[this.currentImageIndex].url;
    }
  }
}
