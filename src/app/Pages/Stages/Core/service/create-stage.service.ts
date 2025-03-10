import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { IcreateStage } from '../interface/icreate-stage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateStageService {

  createStageurl: string = '';
  constructor(private _HttpClient: HttpClient)
   { this.createStageurl = 
    `${environment.baseUrl}${environment.pickup}stage/create` }

  createStage(Stage: IcreateStage): Observable<IcreateStage> {
    return this._HttpClient.post<IcreateStage>(`${this.createStageurl}`, Stage)
  }
}
