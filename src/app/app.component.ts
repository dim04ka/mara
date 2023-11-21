import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BasketService } from './services/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  routerEvents: any;
  constructor(
    private router: Router,
    private basketService: BasketService
  ) {
    this.routerEvents = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('basket')) {
          this.basketService.isShowBucket$.next(false);
        } else {
          this.basketService.isShowBucket$.next(true);
        }
      }
    });
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.routerEvents.unsubscribe();
    // Unsubscribe to avoid memory leak
  }

  data = [
    'воск',
    'фитили',
    'аромамасла',
    'свечи',
    'быстрый самовывоз с нашего склада',
    'бесплатная доставка по тбилиси от 350 лар',
  ];
  isMenuOpen = false;

  categories = [
    { name: 'Свечи', url: 'candles' },
    { name: 'Воски', url: 'wax' },
    { name: 'Фитили', url: 'candlewick' },
    { name: 'Другое', url: 'other' },
  ];
}
