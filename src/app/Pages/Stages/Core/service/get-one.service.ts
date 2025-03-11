import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { IStage } from '../../../../Core/Interface/istage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetOneService {


  createStageurl: string = '';
  constructor(private _HttpClient: HttpClient)
   { this.createStageurl = `${environment.baseUrl}${environment.pickup}stage/get` }

  getStage(idStage:number): Observable<IResponseOf<IStage>> {
    return this._HttpClient.get<IResponseOf<IStage>>(`${this.createStageurl}?id=${idStage}`)
  }


}
