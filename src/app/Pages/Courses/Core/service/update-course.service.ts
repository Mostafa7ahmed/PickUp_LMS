import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../Environments/environment';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { ICreateCourseRequest, ICreateCourseResponse } from '../interface/icreate-course';

@Injectable({
  providedIn: 'root'
})
export class UpdateCourseService {
  private urlUpdateCourse: string;

  constructor(private http: HttpClient) {
    this.urlUpdateCourse = `${environment.baseUrl}${environment.pickup}course/update`;
  }

  updateCourse(courseId: number, course: ICreateCourseRequest): Observable<IResponseOf<ICreateCourseResponse>> {
    return this.http.put<IResponseOf<ICreateCourseResponse>>(`${this.urlUpdateCourse}?id=${courseId}`, course);
  }
} 