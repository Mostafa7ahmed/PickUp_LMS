import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { Observable } from 'rxjs';
import { UpdateStage } from '../interface/update-stage';

@Injectable({
  providedIn: 'root'
})
export class UpdateStageService {

  updateStageurl: string = '';
  constructor(private _HttpClient: HttpClient)
   { this.updateStageurl = 
    `${environment.baseUrl}${environment.pickup}stage/update` }

  updateStage(Stage: UpdateStage): Observable<UpdateStage> {
    return this._HttpClient.put<UpdateStage>(`${this.updateStageurl}`, Stage)
  }
}
