import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './pages/root/root.component';
import { BasketPageComponent } from './pages/basket/basket.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CategoryRootComponent } from './pages/category-root/category-root.component';
import { DescriptionComponent } from './pages/description/description.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { BlogComponent } from './pages/blog/blog.component';
import { FaqComponent } from './pages/faq/faq.component';
// @ts-ignore
const routes: Routes = [
  {
    path: '',
    component: RootComponent,
  },
  {
    path: 'category/:category',
    component: CategoryRootComponent,
  },
  {
    path: 'category/:category/:id',
    component: DescriptionComponent,
  },
  {
    path: 'basket',
    component: BasketPageComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: 'delivery',
    component: DeliveryComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
