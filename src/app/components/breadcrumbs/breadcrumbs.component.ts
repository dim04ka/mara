import { Component, Input } from '@angular/core';

interface IBreadcrumbs {
  title: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  @Input() category: string = '';
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
