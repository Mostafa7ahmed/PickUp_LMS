import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../Environments/environment';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../../Core/Shared/Interface/irespose';
import { TopicResult } from '../Core/Interface/itopic';

@Injectable({
  providedIn: 'root'
})
export class GetoneTopicService {

  private getTopic: string;

  constructor(private _HttpClient :HttpClient) {
    this.getTopic = `${environment.baseUrl}${environment.pickup}topic/get`;
   }

    getTopicById(topic: number): Observable<IResponseOf<TopicResult>> {
      return this._HttpClient.get<IResponseOf<TopicResult>>(`${this.getTopic}?id=${topic}`  )
    }
}
