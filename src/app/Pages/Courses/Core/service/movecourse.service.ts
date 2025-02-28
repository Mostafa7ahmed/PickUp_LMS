import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { Observable } from 'rxjs';
import { ImoveCourseResult } from '../interface/imove';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';

@Injectable({
  providedIn: 'root'
})
export class MovecourseService {

  private urlMove: string;

  constructor(private _HttpClient :HttpClient) {
    this.urlMove = `${environment.baseUrl}${environment.pickup}course/move`;
   }



   moveCourse(stageId:number , id: number): Observable<IResponseOf<ImoveCourseResult>> {


    return this._HttpClient.put<IResponseOf<ImoveCourseResult>>(`${this.urlMove}`,{
      id:id,
      stageId : stageId
    });
  }}
