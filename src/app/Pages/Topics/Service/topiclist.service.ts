import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopiclistService {

  constructor( private _HttpClient :HttpClient) { }



  getAlllits(orderBy: number = 2, pageNumber: number = 1, pageSize: number = 100, orderBeforPagination: boolean = false, orderDirection: number = 1): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}${environment.pickup}topic/list?orderBy=${orderBy}&pageNumber=${pageNumber}&pageSize=${pageSize}&orderBeforPagination=${orderBeforPagination}&orderDirection=${orderDirection}`,
 )
  }
    
}
