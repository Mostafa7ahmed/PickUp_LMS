import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { IPagination, IPaginationResponse, IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { Observable } from 'rxjs';
import { ListCourse } from '../interface/icourses';

@Injectable({
  providedIn: 'root'
})
export class ListCourseService {

  private urlCourse: string;

  constructor( private http: HttpClient  ){ 
    this.urlCourse = `${environment.baseUrl}${environment.pickup}course/list`
  }

  getCourses(
    pageNumber: number = 1, 
    pageSize: number = 100,
    orderBy: number = 2, 
    orderDirection: number = 1,

  ): Observable<IPaginationResponse<ListCourse>> {
  
    const params: any = {
      orderBy: orderBy.toString(),
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      orderBeforPagination: 'true',
      orderDirection: orderDirection.toString(),
    };


    return this.http.get<IPaginationResponse<ListCourse>>(`${this.urlCourse}`, { params });
  }
}
