import { Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject, finalize, Observable, of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FileUploadServiceService } from '../../services/file-upload-service.service';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DataService } from '../../services/data.service';
import { UUID } from 'uuid-generator-ts';
import { Product } from '../../interfaces/table';
import { FirestoreService } from '../../services/firestore.service';
import { ProductService } from '../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { PRODUCTS_URL } from '../../constants';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  isDisplayForm = false;
  data = new BehaviorSubject<Product[]>([]);

  constructor(
    private fileUploadService: FileUploadServiceService,
    // private storage: AngularFireStorage,
    private dataService: DataService,
    private firestoreService: FirestoreService,
    private productService: ProductService,
    private http: HttpClient,
    private elementRef: ElementRef
  ) {
    this.firestoreService.loadValues();
    this.productService.products$.subscribe(data => {
      this.data.next(data);
    });
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
      images: [this.url_photo],
    });
    // this.afs
    //   .collection('products')
    //   .add({
    //     ...this.profileForm.value,
    //     images: [this.url_photo],
    //     id: uuid.getDashFreeUUID(),
    //   })
    //   .catch(error => {
    //     // loading.dismiss();
    //     // this.toast(error.message, 'danger');
    //   });
    this.profileForm.reset();
    this.url_photo = '';
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  selectedFile: File | null = null;
  downloadURL: Observable<string> | null = null;
  url_photo = '';
  isEdit = false;

  // onFileSelected(event: any) {
  //
  //   console.log('event', event.target.files)
  //
  //   this.fileUploadService.uploadFile(event.target.files).subscribe(url => {
  //     console.log('url done', url);
  //   })
  //
  //   // var n = Date.now();
  //   // const file = event.target.files[0];
  //   // const filePath = `products/${n}`;
  //   // const fileRef = this.storage.ref(filePath);
  //   // const task = this.storage.upload(`products/${n}`, file);
  //   // task
  //   //   .snapshotChanges()
  //   //   .pipe(
  //   //     finalize(() => {
  //   //       this.downloadURL = fileRef.getDownloadURL();
  //   //       this.downloadURL.subscribe(url => {
  //   //         if (url) {
  //   //           console.log('URL===', url);
  //   //           this.url_photo = url;
  //   //         }
  //   //         // console.log(this.fb);
  //   //       });
  //   //     }),
  //   //   )
  //   //   .subscribe(url => {
  //   //     if (url) {
  //   //       console.log('url end', url);
  //   //     }
  //   //   });
  // }

  onFileSelected(event: any): void {
    let formData = new FormData();
    formData.append('x', event.target.files[0]);
    this.http
      .post('http://localhost:8080/upload', formData)
      .subscribe((response: { img_url: string }) => {
        this.url_photo = response.img_url;
      });
  }

  uploadFile(files: File[]): void {
    // const formData: FormData = new FormData();
    // formData.append('file', file, file.name);
    // this.http.post('http://localhost:8080/upload', formData)
    //   .subscribe(response => {
    //     console.log('Upload successful:', response);
    //   }, error => {
    //     console.error('Error uploading file:', error);
    //   });
  }

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
    this.url_photo = images[0];
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
      images: [this.url_photo],
      hide: this.profileForm.value.hide,
    });
    // this.afs
    // .collection('products')
    // .doc(this.documentId)
    // .update({
    //   title: this.profileForm.value.title,
    //   category: this.profileForm.value.category,
    //   price: this.profileForm.value.price,
    //   small_description: this.profileForm.value.small_description,
    //   full_description: this.profileForm.value.full_description,
    //   images: [this.url_photo],
    //   hide: this.profileForm.value.hide,
    // })
    // .catch(error => {
    //   // TODO: Handle
    //   // loading.dismiss();
    //   // this.toast(error.message, 'danger');
    // });
    this.profileForm.reset();
    this.url_photo = '';
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  documentId = '';
  value: any;

  // getDocumentId(fieldName: string, fieldValue: string) {
  //   this.dataService
  //     .getDocumentIdByFieldValue(fieldName, fieldValue)
  //     .subscribe(data => {
  //       if (data.length > 0) {
  //         this.documentId = data[0].payload.doc.id;
  //         console.log('Document ID:', this.documentId);
  //       } else {
  //         console.log('Document not found');
  //       }
  //     });
  // }

  handleActionDelete(product: Product) {
    this.firestoreService.delete(product.id);
    // this.afs
    // .collection('products')
    // .doc(product.id)
    // .delete()
    // .catch(error => {
    //     // TODO: Handle
    //     // loading.dismiss();
    //     // this.toast(error.message, 'danger');
    // this.dataService
    //   .getDocumentIdByFieldValue('id', product.id)
    //   .subscribe(data => {
    //     if (data.length > 0) {
    //       this.dataService
    //         .deleteDocumentInCollection('products', data[0].payload.doc.id)
    //         .then(() => console.log('Document deleted successfully'))
    //         .catch(error => console.error('Error deleting document:', error));
    //     } else {
    //       console.log('Document not found');
    //     }
    //   });
  }

  isAdmin = false;

  check(value: string) {
    if (value === 'qwerty123') this.isAdmin = true;
  }
}
