import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdataCoursesService {

  private urlUpload:string =  "";

  constructor( private http: HttpClient  ){ 
    this.urlUpload = `${environment.baseUrl}${environment.pickup}stream/upload`
  }
  uploadFile(file: File | File[], type: number): Observable<any> {
    const formData = new FormData();
  
    if (Array.isArray(file)) {
      file.forEach((f) => formData.append('formFile', f))
    } else {
      formData.append('formFile', file);
    }
  
    formData.append('type', type.toString());
  
    return this.http.post(this.urlUpload, formData);
  }

}
