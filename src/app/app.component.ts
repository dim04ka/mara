import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BasketService } from './services/basket.service';
import { infinityMenuItems, categories } from './constants';

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
  ngOnDestroy(): void {
    this.routerEvents.unsubscribe();
  }

  isMenuOpen = false;

  protected readonly infinityMenuItems = infinityMenuItems;
  protected readonly categories = categories;
}
