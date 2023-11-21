import { Component } from '@angular/core';
import { ICategory } from '../../../interfaces/navigate';

@Component({
  selector: 'app-section-category',
  templateUrl: './section-category.component.html',
  styleUrls: ['./section-category.component.scss'],
})
export class SectionCategoryComponent {
  categories: ICategory[] = [
    {
      name: 'Свечи',
      url: 'candles',
      img: '/assets/images/category-candles.png',
    },
    {
      name: 'Воски',
      url: 'wax',
      img: '/assets/images/category-vox.png',
    },
    {
      name: 'Фитили',
      url: 'candlewick',
      img: '/assets/images/category-wick.png',
    },
    { name: 'Другое', url: 'other', img: '/assets/images/category-other.png' },
  ];
}
