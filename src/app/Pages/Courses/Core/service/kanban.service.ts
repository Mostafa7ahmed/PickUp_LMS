import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { IKanbanResponse, ITopicKanbaResult } from '../interface/ikanban-response';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  private urlKanban: string;

  constructor(private _HttpClient :HttpClient) {
    this.urlKanban = `${environment.baseUrl}${environment.pickup}topic/get-kanban?`;
   }



   getAllKanbans(topicId:number): Observable<IResponseOf<IKanbanResponse>> {


    return this._HttpClient.get<IResponseOf<IKanbanResponse>>(`${this.urlKanban}topicId=${topicId}`);
  }


}
