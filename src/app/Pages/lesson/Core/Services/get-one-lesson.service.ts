import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { ILessonRes } from '../Interface/ilesson-res';

@Injectable({
  providedIn: 'root'
})
export class GetOneLessonService {

 private urlLesson: string;

  constructor( private http: HttpClient  ){ 
    this.urlLesson = `${environment.baseUrl}${environment.pickup}lesson/get`
  }

  getLesson(id:number): Observable<IResponseOf<ILessonRes>>{
    return this.http.get<IResponseOf<ILessonRes>>(`${this.urlLesson}?id=${id} `)

  }


}
