import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { ICreateLessonRequest } from '../Interface/icreate-lesson';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddlessonService {

  private createLessonUrl: string;
  
  constructor(private _HttpClient: HttpClient) {
    this.createLessonUrl = `${environment.baseUrl}${environment.pickup}lesson/create`;
  }
  
  createLesson(lessonData: ICreateLessonRequest): Observable<any> {
    return this._HttpClient.post(this.createLessonUrl, lessonData);
  }
}
