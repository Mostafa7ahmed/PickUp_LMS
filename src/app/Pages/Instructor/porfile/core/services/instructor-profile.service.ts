import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../Environments/environment';
import { IResponseOf } from '../../../../../Core/Shared/Interface/irespose';
import { IInstructorProfile, IUpdateInstructorProfile } from '../interfaces/instructor-profile.interface';
import { IPaginationResponse } from '../../../../../Core/Shared/Interface/irespose';
import { ListCourse } from '../../../../Courses/Core/interface/icourses';

@Injectable({
  providedIn: 'root'
})
export class InstructorProfileService {
  private instructorUrl: string;
  private coursesUrl: string;

  constructor(private http: HttpClient) {
    this.instructorUrl = `${environment.baseUrl}${environment.pickup}instructor`;
    this.coursesUrl = `${environment.baseUrl}${environment.pickup}course/list`;
  }

  getInstructorProfile(): Observable<IResponseOf<IInstructorProfile>> {
    return this.http.get<IResponseOf<IInstructorProfile>>(this.instructorUrl);
  }

  updateInstructorProfile(profile: IUpdateInstructorProfile): Observable<IResponseOf<IInstructorProfile>> {
    return this.http.put<IResponseOf<IInstructorProfile>>(this.instructorUrl, profile);
  }

  getInstructorCourses(
    pageNumber: number = 1,
    pageSize: number = 100,
    orderBy: number = 2,
    orderDirection: number = 1
  ): Observable<IPaginationResponse<ListCourse>> {
    const params: any = {
      orderBy: orderBy.toString(),
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      orderBeforPagination: 'true',
      orderDirection: orderDirection.toString(),
    };

    return this.http.get<IPaginationResponse<ListCourse>>(this.coursesUrl, { params });
  }
}
