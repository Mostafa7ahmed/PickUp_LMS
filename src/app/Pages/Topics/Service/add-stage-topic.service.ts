import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../Environments/environment';
import { IAddStage } from '../Core/Interface/iadd-stage';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../../Core/Shared/Interface/irespose';
import { TopicResult } from '../Core/Interface/itopic';

@Injectable({
  providedIn: 'root'
})
export class AddStageTopicService {

  createStage:string = '';
  constructor(private _HttpClient:HttpClient) { this.createStage = `${environment.baseUrl}${environment.pickup}topic/update-stages` }
  
  addStageFromTopic(Stage: IAddStage): Observable<IResponseOf<TopicResult>> {
    return this._HttpClient.put<IResponseOf<TopicResult>>(`${this.createStage}`, Stage  )
  }
  }
