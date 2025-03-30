import { Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  private urlStage: string;



  private UserAuth = localStorage.getItem('UserAuth');

  constructor(private _HttpClient: HttpClient) {
    this.urlStage = `${environment.baseUrl}${environment.pickup}`;
  }

  addStage(stage: any): Observable<any> {
    return this._HttpClient.post(`${this.urlStage}stage/create`, stage,
      {
        headers: {
          'Authorization': `Bearer ${this.UserAuth}`
        }
      }
    )
  }
  

    deleteStage(id: number, isMove: boolean): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.UserAuth}`,
        'id': id,
        'move': isMove.toString()
      });
    
      return this._HttpClient.delete(`${environment.baseUrl}${environment.pickup}stage/delete`, { headers });
    }
    



}
