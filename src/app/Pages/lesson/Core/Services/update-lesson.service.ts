import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../Environments/environment';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { ICreateLessonRequest } from '../Interface/icreate-lesson';

@Injectable({
  providedIn: 'root'
})
export class UpdateLessonService {
  private updateLessonUrl: string;

  constructor(private _http: HttpClient) {
    this.updateLessonUrl = `${environment.baseUrl}${environment.pickup}lesson/update`;
  }

  updateLesson(lessonId: number, lessonData: ICreateLessonRequest): Observable<IResponseOf<any>> {
    return this._http.put<IResponseOf<any>>(`${this.updateLessonUrl}?id=${lessonId}`, lessonData);
  }
} 