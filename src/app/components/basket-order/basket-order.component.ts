import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { IBasketOrder, Item } from '../../interfaces/basket';
import { Column, ITableColumns, Product } from '../../interfaces/table';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProductService } from '../../services/product.service';
import { categoryGroupById } from '../../constants';
import { CATEGORY } from '../../interfaces/category';

class ChangeEvent<T> {}

@Component({
  selector: 'app-basket-order',
  templateUrl: './basket-order.component.html',
  styleUrls: ['./basket-order.component.scss'],
})
export class BasketOrderComponent implements OnChanges {
  tableColumns: ITableColumns[] = [
    {
      columnDef: Column.Images,
      header: 'Фото',
      cell: ({ images }) => images[0].url,
      // filterType: FILTER_TYPE.TEXT,
      save: (value: any) => {
        console.log('value', value);
      },
    },
    {
      columnDef: Column.Title,
      header: 'Назнавание',
      cell: ({ title }) => title,
      // filterType: FILTER_TYPE.TEXT,
      save: (value: any) => {
        console.log('value', value);
        // const { citationFilter } = this.internalAppliedFilters;
        // this.internalAppliedFilters.citationFilter = {
        //   ...citationFilter,
        //   id: value,
        // };
        //
        // this.filterService.applyAllFilters(this.internalAppliedFilters);
      },
    },
    {
      columnDef: Column.Price,
      header: 'Цена',
      cell: ({ price, countProduct }) => {
        return '₾' + String((Number(price) * countProduct).toFixed(2));
      },

      // filterType: FILTER_TYPE.TEXT,
      save: (value: any) => {
        console.log('value', value);
        // const { citationFilter } = this.internalAppliedFilters;
        // this.internalAppliedFilters.citationFilter = {
        //   ...citationFilter,
        //   id: value,
        // };
        //
        // this.filterService.applyAllFilters(this.internalAppliedFilters);
      },
    },
    {
      columnDef: Column.Count,
      header: 'Количество',
      cell: ({ countProduct }) => String(countProduct),
      // filterType: FILTER_TYPE.TEXT,
      save: (value: any) => {
        console.log('value', value);
        // const { citationFilter } = this.internalAppliedFilters;
        // this.internalAppliedFilters.citationFilter = {
        //   ...citationFilter,
        //   id: value,
        // };
        //
        // this.filterService.applyAllFilters(this.internalAppliedFilters);
      },
    },
  ];
  displayedColumns: Column[] = [
    ...this.tableColumns.map((column: ITableColumns) => column.columnDef),
    Column.CustomColumn,
  ];
  protected readonly Column = Column;

  constructor(
    private basketService: BasketService,
    private productService: ProductService
  ) {}

  products: Product[] = [];
  items: Item[] = [];
  dataSource: IBasketOrder[] = [];

  ngOnInit() {
    this.productService.products$.subscribe(products => {
      this.products = products;
      if (products) {
        this.checkLoading();
      }
    });
    this.basketService.basket.subscribe(items => {
      this.items = items;
      this.checkLoading();
    });
  }

  isLoading = false;
  amount = 0;

  private checkLoading() {
    if (this.products.length > 0) {
      this.isLoading = false;
    }
    const items = this.items.map(el => el.id);
    // const filteredItems = this.products.filter(item =>
    //   items.includes(item.id)
    // );
    this.dataSource = this.products
      .filter(item => items.includes(item.id))
      .map(product => ({
        ...product,
        countProduct: (
          this.items.find(item => item.id === product.id) || { count: 0 }
        ).count,
      }));
    this.basketService.order$.next(
      this.dataSource.map(item => ({
        count: item.countProduct,
        title: item.title,
        price: item.price,
      }))
    );
    this.basketService.amount$.next(this.amount);

    this.amount = this.dataSource.reduce((acc: number, curr: IBasketOrder) => {
      return Number((acc + curr.countProduct * Number(curr.price)).toFixed(2));
    }, 0);
  }

  update() {}

  ngOnChanges() {
    this.combineProducts();
  }

  combineProducts() {
    // if (this.value.length > 0) {
    //   const ids = this.value.map(el => el.id);
    //   this.dataSource = this.products
    //     .filter(el => ids.includes(el.id))
    //     .map(el => {
    //       return {
    //         ...el,
    //         countProduct: 0,
    //         // this.value.find(elem => elem.id === el.id)?.count || 0,
    //       };
    //     });
    // } else {
    //   this.dataSource = [];
    // }
  }

  remove(id: string) {
    console.log('idddddddd=', id);
    this.basketService.basket.next(
      this.basketService.basket.value.filter(el => el.id !== id)
    );
  }

  handleChange(e: any, id: any) {
    console.log('e=', e.target.value, 'id=', id);
    this.basketService.basket.next(
      this.basketService.basket.value.map(el => {
        return {
          ...el,
          count: el.id === id ? Number(e.target.value) : el.count,
        };
      })
    );
  }

  reduceLink(element: Product) {
    const data = {
      '0': 'candles',
      '1': 'wax',
      '2': 'candlewick',
      '3': 'other',
    };

    // @ts-ignore
    return `/category/${data[element.category]}/${element.id}`;
  }
}
