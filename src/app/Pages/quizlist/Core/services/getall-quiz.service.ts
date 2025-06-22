import { Injectable } from '@angular/core';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { IQuiz } from '../Interface/iquiz';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetallQuizService {

  private urlPagination: string;
  
    constructor(private _HttpClient :HttpClient) {
      this.urlPagination = `${environment.baseUrl}${environment.pickup}quiz/paginate?`;
     }
  
  
  
     getQuizs(
      pageNumber: number = 1,
      pageSize: number = 100,

      orderBy: number = 2,
      orderDirection: number = 1,
  
    ): Observable<IPaginationResponse<IQuiz>> {
  
      const params: any = {
        orderBy: orderBy.toString(),
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        orderBeforPagination: 'true',
        orderDirection: orderDirection.toString(),
      };
  

  
      return this._HttpClient.get<IPaginationResponse<IQuiz>>(`${this.urlPagination}`, { params });
    }
  
}
