import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';
import { IResponseOf } from '../Shared/Interface/irespose';
import { IStudentProfile, IUpdateStudentProfile } from '../Interface/istudent-profile';

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

  /**
   * Update student profile
   * PUT /pickup-lms/api/v1/student
   */
  updateStudentProfile(profile: IUpdateStudentProfile): Observable<IResponseOf<IStudentProfile>> {
    console.log('StudentProfileService: Updating profile with data:', profile);
    console.log('StudentProfileService: Making PUT request to:', this.studentUrl);
    return this.http.put<IResponseOf<IStudentProfile>>(this.studentUrl, profile);
  }
} 