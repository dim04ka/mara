import { Injectable } from '@angular/core';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FileUploadServiceService {
  constructor(
    // private storage: AngularFireStorage
    private http: HttpClient
  ) {}

  uploadFile(files: File[]) {
    return this.http.post('http://localhost:8080/upload', files);
    // const filePath = `uploads/${file.name}`;
    // const fileRef = this.storage.ref(filePath);
    // const task = this.storage.upload(filePath, file);
    //
    // return task
    //   .snapshotChanges()
    //   .pipe(finalize(() => fileRef.getDownloadURL()));
  }
}
