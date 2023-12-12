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
        { name: 'Свечи', id: 'category/candles' },
        { name: 'Воски', id: 'category/wax' },
        { name: 'Фитили', id: 'category/candlewick' },
        { name: 'Другой товар', id: 'category/other' },
      ],
    },
    {
      title: 'магазин',
      items: [
        { name: 'O нас', id: '/' },
        { name: 'Контакты', id: 'contact' },
      ],
    },
    {
      title: 'покупателям',
      items: [
        { name: 'Блог', id: '/' },
        { name: 'FAQ', id: '/' },
        { name: 'Доставка и оплата', id: 'delivery' },
      ],
    },
  ];
}
