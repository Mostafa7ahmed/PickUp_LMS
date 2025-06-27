import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { IWidgetStudent } from '../Interface/iwidget-student';
import { environment } from '../../../../Environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WidgetStudentsService {

  private studentUrl: string;

  constructor(private http: HttpClient) {
    this.studentUrl = `${environment.baseUrl}${environment.pickup}student/profile-widgets`;
  }


    getStudentWidget(): Observable<IResponseOf<IWidgetStudent>> {
      return this.http.get<IResponseOf<IWidgetStudent>>(this.studentUrl);
    }
  
}
