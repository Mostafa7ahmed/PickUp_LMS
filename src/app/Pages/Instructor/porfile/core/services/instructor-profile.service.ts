import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../Environments/environment';
import { IResponseOf } from '../../../../../Core/Shared/Interface/irespose';
import { IInstructorProfile, IUpdateInstructorProfile } from '../interfaces/instructor-profile.interface';

@Injectable({
  providedIn: 'root'
})
export class InstructorProfileService {
  private instructorUrl: string;

  constructor(private http: HttpClient) {
    this.instructorUrl = `${environment.baseUrl}${environment.pickup}instructor`;
  }

  getInstructorProfile(): Observable<IResponseOf<IInstructorProfile>> {
    return this.http.get<IResponseOf<IInstructorProfile>>(this.instructorUrl);
  }

  updateInstructorProfile(profile: IUpdateInstructorProfile): Observable<IResponseOf<IInstructorProfile>> {
    return this.http.put<IResponseOf<IInstructorProfile>>(this.instructorUrl, profile);
  }
}
