import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../Environments/environment';
import { IResponseOf } from '../../../../../Core/Shared/Interface/irespose';
import { IEnrollmentRequest, IEnrollmentResponse, ICourseEnrollmentInfo } from '../interfaces/enrollment.interface';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrollmentUrl: string;
  private courseUrl: string;

  constructor(private http: HttpClient) {
    this.enrollmentUrl = `${environment.baseUrl}${environment.pickup}enrollments/create`;
    this.courseUrl = `${environment.baseUrl}${environment.pickup}course/get`;
  }

  /**
   * Enroll student in a course
   */
  enrollInCourse(enrollmentData: IEnrollmentRequest): Observable<IResponseOf<IEnrollmentResponse>> {
    return this.http.post<IResponseOf<IEnrollmentResponse>>(this.enrollmentUrl, enrollmentData);
  }

  /**
   * Get course information for enrollment
   */
  getCourseForEnrollment(courseId: number): Observable<IResponseOf<ICourseEnrollmentInfo>> {
    return this.http.get<IResponseOf<ICourseEnrollmentInfo>>(`${this.courseUrl}?id=${courseId}`);
  }

  /**
   * Validate coupon code
   */
  validateCoupon(courseId: number, couponCode: string): Observable<IResponseOf<any>> {
    const couponUrl = `${environment.baseUrl}${environment.pickup}coupon/validate`;
    return this.http.post<IResponseOf<any>>(couponUrl, { courseId, couponCode });
  }
}
