import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { Observable } from 'rxjs';
import { ICustomField } from '../interface/icustom-field';

@Injectable({
  providedIn: 'root'
})
export class CustomFildsService {

  private url: string;
  private urlPagination: string;
  private urlCreate: string;

  constructor(private _HttpClient: HttpClient) {
    this.url = `${environment.baseUrl}${environment.pickup}`;
    this.urlPagination = `${this.url}custom-field/paginate?`;
    this.urlCreate = `${this.url}custom-field/create`;

  }


  getCustomField(pageNumber: number = 1, pageSize: number = 100, orderBy: number = 2, orderDirection: number = 1,): Observable<IPaginationResponse<ICustomField>> {
    const params: any = {
      orderBy: orderBy.toString(),
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      orderBeforPagination: 'true',
      orderDirection: orderDirection.toString(),
    };


    return this._HttpClient.get<IPaginationResponse<ICustomField>>(`${this.urlPagination}`, { params });
  }
}
