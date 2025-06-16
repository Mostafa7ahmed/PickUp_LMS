import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../Environments/environment';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { CourseResult } from '../interface/icourses';
import { ICreateCourseRequest } from '../interface/icreate-course';

@Injectable({
  providedIn: 'root'
})
export class UpdateCourseService {

  private urlUpdateCourse: string;

  constructor(private http: HttpClient) {
    this.urlUpdateCourse = `${environment.baseUrl}${environment.pickup}course/update`;
  }

  updateCourse(courseData: IUpdateCourseRequest): Observable<IResponseOf<CourseResult>> {
    return this.http.put<IResponseOf<CourseResult>>(this.urlUpdateCourse, courseData);
  }
}

// Interface for update course request
export interface IUpdateCourseRequest extends ICreateCourseRequest {
  id: number;
}
