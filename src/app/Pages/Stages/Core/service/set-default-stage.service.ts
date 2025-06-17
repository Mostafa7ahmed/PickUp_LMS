import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetDefaultStageService {


  constructor(private _HttpClient:HttpClient) { }
    setDefaultStage( id:number ,idTopic:number ): Observable<any>{
      return this._HttpClient.put(`${environment.baseUrl}${environment.pickup}stage/set-default`,
        {
          id:id,
          topicId : idTopic
        }
      )
    }
  
  }
