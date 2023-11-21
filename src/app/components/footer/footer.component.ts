import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  date = [
    {
      title: 'товар',
      items: [
        { name: 'Свечи', id: 'candles' },
        { name: 'Воски', id: 'vox' },
        { name: 'Фитили', id: 'f' },
        { name: 'Аромамасла', id: 'f' },
        { name: 'Другой товар', id: 'other' },
      ],
    },
    {
      title: 'магазин',
      items: [
        { name: 'O нас', id: 'about-us' },
        { name: 'Контакты', id: 'contact' },
      ],
    },
    {
      title: 'покупателям',
      items: [
        { name: 'Блог', id: 'blog' },
        { name: 'FAQ', id: 'faq' },
        { name: 'Доставка и оплата', id: 'delivery' },
      ],
    },
  ];
}
