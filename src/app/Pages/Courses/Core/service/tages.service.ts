import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPaginationResponse, IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { ITags, TagsResult } from '../interface/itags';

@Injectable({
  providedIn: 'root'
})
export class TagesService {

  private url: string;
  private urlPagination: string;
  private urlCreate: string;

  constructor(private _HttpClient: HttpClient) {
    this.url = `${environment.baseUrl}${environment.pickup}`;
    this.urlPagination = `${this.url}tag/paginate?`;
    this.urlCreate = `${this.url}tag/create`;

  }


  getTags(  pageNumber: number = 1,   pageSize: number = 100,orderBy: number = 2,orderDirection: number = 1,): Observable<IPaginationResponse<TagsResult>> {
    const params: any = {
      orderBy: orderBy.toString(),
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      orderBeforPagination: 'true',
      orderDirection: orderDirection.toString(),
    };


    return this._HttpClient.get<IPaginationResponse<TagsResult>>(`${this.urlPagination}`, { params });
  }


  createTag(name: string): Observable<IResponseOf<TagsResult>> {
    const url = `${this.urlCreate}`;


    const body = { name };

    return this._HttpClient.post<IResponseOf<TagsResult>>(url, body);
  }


}
