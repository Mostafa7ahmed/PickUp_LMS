import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteTopicService {

  constructor(private _HttpClient:HttpClient) { 
    
  }


  deleteTpoic(id: number, isMove: boolean, replacementTopicId?: number, replacementStageId?: number)
  : Observable<any> {
    let headers = new HttpHeaders({
      'id': id.toString(),
      'move': isMove.toString(),
    });
  
    if (isMove && replacementTopicId && replacementStageId) {
      headers = headers.set('replacementStageId', replacementStageId.toString());
      headers = headers.set('replacementTopicId', replacementTopicId.toString());
    }
  
    return this._HttpClient.delete(`${environment.baseUrl}${environment.pickup}topic/delete`, { headers });
  }
    
   
}
