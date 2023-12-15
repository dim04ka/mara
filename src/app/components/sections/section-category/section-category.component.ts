import { Component } from '@angular/core';
import { categories } from '../../../constants';

@Component({
  selector: 'app-section-category',
  templateUrl: './section-category.component.html',
  styleUrls: ['./section-category.component.scss'],
})
export class SectionCategoryComponent {
  protected readonly categories = categories;
}
