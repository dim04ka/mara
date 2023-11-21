import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/table';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data = new BehaviorSubject<Product[]>([]);
  constructor(
    private firestore: AngularFirestore,
    public afs: AngularFirestore
  ) {
    // this.data.next(this.getAllProducts());
  }

  getAllProducts(): Observable<any[]> {
    return this.firestore.collection('products').valueChanges();
  }

  getDocumentIdByFieldValue(fieldName: string, value: any): Observable<any[]> {
    return this.firestore
      .collection('products', ref => ref.where(fieldName, '==', value))
      .snapshotChanges();
  }

  deleteDocumentInCollection(
    collectionName: string,
    documentId: string
  ): Promise<void> {
    const documentRef: AngularFirestoreDocument<any> = this.firestore
      .collection(collectionName)
      .doc(documentId);
    return documentRef.delete();
  }
}
