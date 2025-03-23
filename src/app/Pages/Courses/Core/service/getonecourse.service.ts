import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { CourseResult, Icourses } from '../interface/icourses';

@Injectable({
  providedIn: 'root'
})
export class GetonecourseService {


  private urlCourse: string;

  constructor( private http: HttpClient  ){ 
    this.urlCourse = `${environment.baseUrl}${environment.pickup}course/get`
  }

  getCourse(id:number): Observable<IResponseOf<CourseResult>>{
    return this.http.get<IResponseOf<CourseResult>>(`${this.urlCourse}?id=${id} `)

  }



}
