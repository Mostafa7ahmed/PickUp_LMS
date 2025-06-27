import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { IStudentProfile, IUpdateStudentProfile } from '../Interface/istudent-profile';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentProfileService {

  private studentUrl: string;

  constructor(private http: HttpClient) {
    this.studentUrl = `${environment.baseUrl}${environment.pickup}student`;
  }

  /**
   * Get current student profile
   * GET /pickup-lms/api/v1/student
   */
  getStudentProfile(): Observable<IResponseOf<IStudentProfile>> {
    return this.http.get<IResponseOf<IStudentProfile>>(this.studentUrl);
  }



    updateInstructorProfile(profile: IUpdateStudentProfile): Observable<IResponseOf<IUpdateStudentProfile>> {
      return this.http.put<IResponseOf<IUpdateStudentProfile>>(this.studentUrl, profile);
    }

}
