import { Injectable } from '@angular/core';
import { IcourseStudent, CourseProgressStatus } from '../interface/icourse-student';
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
      courseProgressStatus?: CourseProgressStatus,  // IN_PROGRESS = 0, COMPLETED = 1
      searchTerm?: string  // Search by course name, description, etc.
    ): Observable<IPaginationResponse<IcourseStudent>> {
  
      const params: any = {
        orderBy: orderBy.toString(),
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        orderBeforPagination: 'true',
        orderDirection: orderDirection.toString(),
      };

      // Add courseProgressStatus to params if provided
      if (courseProgressStatus !== undefined && courseProgressStatus !== null) {
        params.courseProgressStatus = courseProgressStatus.toString();
      }

      // Add search term to params if provided
      if (searchTerm && searchTerm.trim() !== '') {
        params.search = searchTerm.trim();
      }
  
      return this._HttpClient.get<IPaginationResponse<IcourseStudent>>(`${this.urlPagination}`, { params });
    } 
}
