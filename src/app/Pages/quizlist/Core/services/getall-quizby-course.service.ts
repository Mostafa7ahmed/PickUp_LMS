import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { Observable } from 'rxjs';
import { IQuiz } from '../Interface/iquiz';

@Injectable({
  providedIn: 'root'
})
export class GetallQuizbyCourseService {


 private urlPagination: string;

  constructor(private _HttpClient :HttpClient) {
    this.urlPagination = `${environment.baseUrl}${environment.pickup}quiz/paginate?`;
   }



   getQuizByCourse(
    courseId : number,
    pageNumber: number = 1,
    pageSize: number = 100,

    orderBy: number = 2,
    orderDirection: number = 1,

  ): Observable<IPaginationResponse<IQuiz>> {

    const params: any = {
      courseId : courseId .toString(),
      orderBy: orderBy.toString(),
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      orderBeforPagination: 'true',
      orderDirection: orderDirection.toString(),
    };



    return this._HttpClient.get<IPaginationResponse<IQuiz>>(`${this.urlPagination}`, { params });
  }



}
