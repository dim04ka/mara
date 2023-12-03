import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataService } from '../../services/data.service';
import { BasketService } from '../../services/basket.service';
import { Product } from '../../interfaces/table';
import { Item } from '../../interfaces/basket';
import { ProductService } from '../../services/product.service';

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
    private productService: ProductService
  ) {

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
      this.product = data.filter(el => el.id === this.id)[0];
    })
    // this.afs
    //   .collection('products')
    //   .valueChanges()
    //   .subscribe(data => {
    //     // this.dataService.data.next(this.data);
    //     this.product = (data as Product[]).filter(el => el.id === this.id)[0];
    //   });
  }

  addToBasket({ id, count }: Item) {
    console.log('id: id, count: count ', id, count);
    this.basketService.addToBasket({ id: id, count: count });
  }
}
