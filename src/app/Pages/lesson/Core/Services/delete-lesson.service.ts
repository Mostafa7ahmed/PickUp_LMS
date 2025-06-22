import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteLessonService {


  constructor(private _HttpClient:HttpClient) { 
    
  }


  deleteLesson(id: number)
  : Observable<any> {
    let headers = new HttpHeaders({
      'id': id.toString(),
    });
  

    return this._HttpClient.delete(`${environment.baseUrl}${environment.pickup}lesson/delete`, { headers });
  }
}
