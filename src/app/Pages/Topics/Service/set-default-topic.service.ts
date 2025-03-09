import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../Environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SetDefaultTopicService {

  constructor(private _HttpClient:HttpClient) { }


  
    setDefaultTopic(idTopic: number): Observable<any>{
      return this._HttpClient.put(`${environment.baseUrl}${environment.pickup}topic/set-default`,{id:idTopic})
    }
}
