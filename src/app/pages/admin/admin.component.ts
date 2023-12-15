import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { UUID } from 'uuid-generator-ts';
import { Product } from '../../interfaces/table';
import { FirestoreService } from '../../services/firestore.service';
import { ProductService } from '../../services/product.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
export interface Images {
  url: string;
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  isDisplayForm = false;
  data = new BehaviorSubject<Product[]>([]);

  constructor(
    private firestoreService: FirestoreService,
    private productService: ProductService
  ) {
    this.firestoreService.loadValues();
    this.productService.products$.subscribe(data => {
      this.data.next(data);
    });

    this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
  }

  profileForm = new FormGroup({
    title: new FormControl(''),
    category: new FormControl(''),
    small_description: new FormControl(''),
    full_description: new FormControl(''),
    price: new FormControl(''),
    hide: new FormControl(false),
  });

  protected readonly JSON = JSON;

  @ViewChild('fileInput') fileInput!: ElementRef;

  addProduct() {
    const uuid = new UUID();
    this.firestoreService.addProduct({
      ...this.profileForm.value,
      images: this.images,
    });
    this.images = [];
    this.profileForm.reset();
    this.url_photo = '';
  }

  url_photo = '';
  isEdit = false;

  handleActionEdit({
    id,
    title,
    category,
    price,
    small_description,
    full_description,
    images,
    hide,
  }: Product) {
    this.isEdit = true;

    this.profileForm.setValue({
      title: title,
      category: category,
      price: price,
      small_description: small_description,
      full_description: full_description,
      hide: hide,
    });
    this.images = images;
    this.documentId = id;
  }

  saveProduct() {
    this.firestoreService.update({
      id: this.documentId,
      title: this.profileForm.value.title,
      category: this.profileForm.value.category,
      price: this.profileForm.value.price,
      small_description: this.profileForm.value.small_description,
      full_description: this.profileForm.value.full_description,
      images: this.images,
      hide: this.profileForm.value.hide,
    });
    this.profileForm.reset();
    this.images = [];
  }

  documentId = '';
  value: any;

  handleActionDelete(product: Product) {
    this.firestoreService.delete(product.id);
  }

  isAdmin = false;

  check(value: string) {
    if (value === 'qwerty123') {
      this.isAdmin = true;
      localStorage.setItem('isAdmin', 'true');
    }
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  images: Images[] = [];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.images.push({ url: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(image: Images): void {
    const index = this.images.indexOf(image);

    if (index >= 0) {
      this.images.splice(index, 1);

      this.announcer.announce(`Removed ${image}`);
    }
  }

  edit(image: Images, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(image);
      return;
    }

    // Edit existing fruit
    const index = this.images.indexOf(image);
    if (index >= 0) {
      this.images[index].url = value;
    }
  }
}
