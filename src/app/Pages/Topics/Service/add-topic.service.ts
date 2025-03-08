import { Observable } from 'rxjs';
import { environment } from './../../../Environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResponseOf } from '../../../Core/Shared/Interface/irespose';
import { ITopic, TopicResult } from '../Core/Interface/itopic';
import { IAddTopic } from '../Core/Interface/iadd-topic';

@Injectable({
  providedIn: 'root'
})
export class AddTopicService {
  createtopic:string = '';
  constructor(private _HttpClient:HttpClient) { 
          this.createtopic = `${environment.baseUrl}${environment.pickup}topic/create`
    
  }
  
  addTopic(topic: IAddTopic): Observable<IResponseOf<TopicResult>> {
    return this._HttpClient.post<IResponseOf<TopicResult>>(`${this.createtopic}`, topic  )
  }
}
