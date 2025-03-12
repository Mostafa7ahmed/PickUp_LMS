import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { Observable } from 'rxjs';
import { ICreateCourse } from '../interface/icreate-course';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';

@Injectable({
  providedIn: 'root'
})
export class AddCoursesService {



  private urlAddCourse: string;

  constructor( private http: HttpClient  ){ 
    this.urlAddCourse = `${environment.baseUrl}${environment.pickup}course/create`
  }

  addCourse(course: ICreateCourse): Observable<IResponseOf<ICreateCourse>>{
    return this.http.post<IResponseOf<ICreateCourse>>(this.urlAddCourse, course);
  }
}
