import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../Environments/environment';
import { IResponseOf } from '../../../../../Core/Shared/Interface/irespose';
import { Observable } from 'rxjs';
import { IResCourseDetailsDiscover } from '../Interface/ires-course-details-discover';

@Injectable({
  providedIn: 'root'
})
export class DetailsDiscoverCourseService {

  private studentUrl: string;

  constructor(private http: HttpClient) {
    this.studentUrl = `${environment.baseUrl}${environment.pickup}student/course-details?`;
  }


    getStudentDetailsCourseDiscover(courseId:number): Observable<IResponseOf<IResCourseDetailsDiscover>> {
      return this.http.get<IResponseOf<IResCourseDetailsDiscover>>(`${this.studentUrl}courseId=${courseId}`);
    }}
