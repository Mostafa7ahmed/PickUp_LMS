import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../Environments/environment';
import { IResponseOf } from '../../../../../Core/Shared/Interface/irespose';
import { IInstructorProfile, IUpdateInstructorProfile } from '../interfaces/instructor-profile.interface';
<<<<<<< HEAD
=======
import { IPaginationResponse } from '../../../../../Core/Shared/Interface/irespose';
import { ICoursePorfile, ListCourse } from '../../../../Courses/Core/interface/icourses';
>>>>>>> b201d866995093bf0c23ca0e9c49f2feb046eb6c

@Injectable({
  providedIn: 'root'
})
export class InstructorProfileService {
  private instructorUrl: string;
<<<<<<< HEAD

  constructor(private http: HttpClient) {
    this.instructorUrl = `${environment.baseUrl}${environment.pickup}instructor`;
=======
  private coursesUrl: string;

  constructor(private http: HttpClient) {
    this.instructorUrl = `${environment.baseUrl}${environment.pickup}instructor`;
    this.coursesUrl = `${environment.baseUrl}${environment.pickup}course/list`;
>>>>>>> b201d866995093bf0c23ca0e9c49f2feb046eb6c
  }

  getInstructorProfile(): Observable<IResponseOf<IInstructorProfile>> {
    return this.http.get<IResponseOf<IInstructorProfile>>(this.instructorUrl);
  }

  updateInstructorProfile(profile: IUpdateInstructorProfile): Observable<IResponseOf<IInstructorProfile>> {
    return this.http.put<IResponseOf<IInstructorProfile>>(this.instructorUrl, profile);
  }
<<<<<<< HEAD
=======

  getInstructorCourses(
    pageNumber: number = 1,
    pageSize: number = 100,
    orderBy: number = 2,
    orderDirection: number = 1
  ): Observable<IPaginationResponse<ICoursePorfile>> {
    const params: any = {
      orderBy: orderBy.toString(),
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      orderBeforPagination: 'true',
      orderDirection: orderDirection.toString(),
    };

    return this.http.get<IPaginationResponse<ICoursePorfile>>(this.coursesUrl, { params });
  }
>>>>>>> b201d866995093bf0c23ca0e9c49f2feb046eb6c
}
