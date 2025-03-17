import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteStreamService {

  private urlDelete:string =  "";

  constructor( private http: HttpClient  ){ 
    this.urlDelete= `${environment.baseUrl}${environment.pickup}stream/delete-by-uri`
  }
  deleteFile(fileUrl :string): Observable<any> {

  
    return this.http.post(this.urlDelete, fileUrl);
  }}
