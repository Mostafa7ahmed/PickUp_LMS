import { Injectable } from '@angular/core';
import { IcourseStudent } from '../interface/icourse-student';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../Environments/environment';
import { IPaginationResponse } from '../../../../../Core/Shared/Interface/irespose';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private urlPagination: string;
  
    constructor(private _HttpClient :HttpClient) {
      this.urlPagination = `${environment.baseUrl}${environment.pickup}student/enrollment-courses?`;
     }
  
  
  
     getCourse(
      pageNumber: number = 1,
      pageSize: number = 100,

      orderBy: number = 2,
      orderDirection: number = 1,
  
    ): Observable<IPaginationResponse<IcourseStudent>> {
  
      const params: any = {
        orderBy: orderBy.toString(),
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        orderBeforPagination: 'true',
        orderDirection: orderDirection.toString(),
      };
  

  
      return this._HttpClient.get<IPaginationResponse<IcourseStudent>>(`${this.urlPagination}`, { params });
    } 
}
