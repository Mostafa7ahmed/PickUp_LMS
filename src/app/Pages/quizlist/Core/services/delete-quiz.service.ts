import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../Environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteQuizService {

  constructor(private _HttpClient:HttpClient) { 
    
  }


  deleteQuiz(id: number)
  : Observable<any> {
    let headers = new HttpHeaders({
      'id': id.toString(),
    });
  

    return this._HttpClient.delete(`${environment.baseUrl}${environment.pickup}quiz/delete`, { headers });
  }


}
