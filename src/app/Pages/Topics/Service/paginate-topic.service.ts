import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../Environments/environment';
import { IPaginationResponse } from '../../../Core/Shared/Interface/irespose';
import { ITopic, TopicResult } from '../Core/Interface/itopic';

@Injectable({
  providedIn: 'root'
})
export class PaginateTopicService {

  private urlPagination: string;

  constructor(private _HttpClient :HttpClient) {
    this.urlPagination = `${environment.baseUrl}${environment.pickup}topic/paginate?`;
   }



   getTopics(orderBy: number = 2, pageNumber: number = 1, pageSize: number = 5, orderBeforPagination: boolean = false, orderDirection: number = 1): Observable<IPaginationResponse<TopicResult>> {
  
    const params: any = {
      orderBy: orderBy.toString(),
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      orderBeforPagination: 'true',
      orderDirection: orderDirection.toString(),
    };
    return this._HttpClient.get<IPaginationResponse<TopicResult>>(`${this.urlPagination}?orderBy=${orderBy}&pageNumber=${pageNumber}&pageSize=${pageSize}&orderBeforPagination=${orderBeforPagination}&orderDirection=${orderDirection}`)


  }}
