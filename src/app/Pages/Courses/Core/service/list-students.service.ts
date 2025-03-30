import { environment } from './../../../../Environments/environment';
import { Observable } from 'rxjs';
import { IPagination, IPaginationResponse } from './../../../../Core/Shared/Interface/irespose';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStudent } from '../interface/istudent';

@Injectable({
  providedIn: 'root'
})
export class ListStudentsService {


  private urlStudent: string;

  constructor( private http: HttpClient  ){ 
    this.urlStudent = `${environment.baseUrl}${environment.pickup}user/list-students`
  }

  getStudents(
    pageNumber: number = 1, 
    pageSize: number = 100,
    orderBy: number = 2, 
    orderDirection: number = 1,

  ): Observable<IPaginationResponse<IStudent>> {
  
    const params: any = {
      orderBy: orderBy.toString(),
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      orderBeforPagination: 'true',
      orderDirection: orderDirection.toString(),
    };


    return this.http.get<IPaginationResponse<IStudent>>(`${this.urlStudent}`, { params });
  }


}
