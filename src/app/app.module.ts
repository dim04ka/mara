import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfinityMenuItemsComponent } from './components/infinity-menu-items/infinity-menu-items.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderPhotoComponent } from './components/header-photo/header-photo.component';
import { SectionAboutComponent } from './components/sections/section-about/section-about.component';
import { SectionCategoryComponent } from './components/sections/section-category/section-category.component';
import { FooterComponent } from './components/footer/footer.component';
import { RootComponent } from './pages/root/root.component';
import { CardComponent } from './components/card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BasketComponent } from './components/basket/basket.component';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DescriptionComponent } from './pages/description/description.component';
import { AdminComponent } from './pages/admin/admin.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { BasketPageComponent } from './pages/basket/basket.component';
import { BasketOrderComponent } from './components/basket-order/basket-order.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryRootComponent } from './pages/category-root/category-root.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './shared/loader/loader.component';
import { MatSidenavModule } from '@angular/material/sidenav';
@NgModule({
  declarations: [
    AppComponent,
    InfinityMenuItemsComponent,
    MenuComponent,
    HeaderPhotoComponent,
    SectionAboutComponent,
    SectionCategoryComponent,
    FooterComponent,
    RootComponent,
    CardComponent,
    BasketComponent,
    DescriptionComponent,
    AdminComponent,
    TableComponent,
    BasketPageComponent,
    BasketOrderComponent,
    CategoryRootComponent,
    BreadcrumbsComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatBadgeModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatTableModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSortModule,
    HttpClientModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
