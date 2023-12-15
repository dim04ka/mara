import { Component, Input } from '@angular/core';
import { CATEGORY_URL } from '../../interfaces/category';
import { IBreadcrumbs } from '../../interfaces/breadcrumbs.interface';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  @Input() category: CATEGORY_URL;
  @Input() idProduct: string = '';
  @Input() titleProduct: string = '';

  breadcrumbs: IBreadcrumbs[] = [];
  ngOnChanges() {
    this.createBreadcrumbs();
  }

  createBreadcrumbs() {
    const categories: Record<any, string> = {
      candles: 'Свечи',
      wax: 'Воски',
      candlewick: 'Фитили',
      other: 'Другое',
    };
    this.breadcrumbs = [
      {
        title: 'Главная',
        url: '/',
      },
      {
        title: categories[this.category],
        url: `/category/${this.category}`,
      },
      {
        title: this.titleProduct,
        url: `/category/${this.category}/${this.idProduct}`,
      },
    ].filter(el => el.title !== '');
  }
}
