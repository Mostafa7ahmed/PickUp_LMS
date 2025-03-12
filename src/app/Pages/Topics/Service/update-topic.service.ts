import { environment } from './../../../Environments/environment';
import { Injectable } from '@angular/core';
import { IAddTopic } from '../Core/Interface/iadd-topic';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../../Core/Shared/Interface/irespose';
import { TopicResult } from '../Core/Interface/itopic';
import { IUpdateTopic } from '../Core/Interface/iupdate-topic';

@Injectable({
  providedIn: 'root'
})
export class UpdateTopicService {

  updatetopic:string = '';
  constructor(private _HttpClient:HttpClient) { this.updatetopic = `${environment.baseUrl}${environment.pickup}topic/update`
    
  }
  
  updateTopic(topic: IUpdateTopic): Observable<IResponseOf<TopicResult>> {
    return this._HttpClient.put<IResponseOf<TopicResult>>(`${this.updatetopic}`, topic  )
  }

}
