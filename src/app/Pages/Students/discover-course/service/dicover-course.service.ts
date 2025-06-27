import { Injectable } from '@angular/core';
import { IDicoverCourse } from '../intarface/idicover-course';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../Environments/environment';
import { Observable } from 'rxjs';
import { IPaginationResponse, IResponseOf } from '../../../../Core/Shared/Interface/irespose';

@Injectable({
  providedIn: 'root'
})
export class DicoverCourseService {

  private urlPagination: string;
  
    constructor(private _HttpClient :HttpClient) {
      this.urlPagination = `${environment.baseUrl}${environment.pickup}student/courses?`;
     }
  
  
  
     getDiscover(
      pageNumber: number = 1,
      pageSize: number = 100,

      orderBy: number = 2,
      orderDirection: number = 1,
  
    ): Observable<IPaginationResponse<IDicoverCourse>> {
  
      const params: any = {
        orderBy: orderBy.toString(),
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        orderBeforPagination: 'true',
        orderDirection: orderDirection.toString(),
      };
  

  
      return this._HttpClient.get<IPaginationResponse<IDicoverCourse>>(`${this.urlPagination}`, { params });
    }  
}
