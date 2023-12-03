import { Injectable } from '@angular/core';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadServiceService {
  constructor(
    // private storage: AngularFireStorage
  ) {}

  // uploadFile(file: File) {
  //   const filePath = `uploads/${file.name}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(filePath, file);
  //
  //   return task
  //     .snapshotChanges()
  //     .pipe(finalize(() => fileRef.getDownloadURL()));
  // }
}
