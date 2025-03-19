import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { Observable } from 'rxjs';
import { ICreateCourseRequest, ICreateCourseResponse } from '../interface/icreate-course';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';

@Injectable({
  providedIn: 'root'
})
export class AddCoursesService {



  private urlAddCourse: string;

  constructor(private http: HttpClient) {
    this.urlAddCourse = `${environment.baseUrl}${environment.pickup}course/create`
  }

  addCourse(course: ICreateCourseRequest): Observable<IResponseOf<ICreateCourseResponse>> {
    return this.http.post<IResponseOf<ICreateCourseResponse>>(this.urlAddCourse, course);
  }
}
