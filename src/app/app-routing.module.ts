import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './pages/root/root.component';
import { BasketPageComponent } from './pages/basket/basket.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CategoryRootComponent } from './pages/category-root/category-root.component';
import { DescriptionComponent } from './pages/description/description.component';

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
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
