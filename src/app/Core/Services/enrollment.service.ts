import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
import { IResponseOf } from '../Shared/Interface/irespose';
import { Observable } from 'rxjs';
import { IEnrollmentRequest, IEnrollmentResponse, ICoupon } from '../Interface/ienrollment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private enrollmentUrl: string;
  private couponUrl: string;

  constructor(private http: HttpClient) {
    this.enrollmentUrl = `${environment.baseUrl}${environment.pickup}enrollments`;
    this.couponUrl = `${environment.baseUrl}${environment.pickup}coupons`;
  }

  createEnrollment(request: IEnrollmentRequest): Observable<IResponseOf<IEnrollmentResponse>> {
    return this.http.post<IResponseOf<IEnrollmentResponse>>(`${this.enrollmentUrl}/create`, request);
  }

  getUserCoupons(): Observable<IResponseOf<ICoupon[]>> {
    return this.http.get<IResponseOf<ICoupon[]>>(`${this.couponUrl}/user-coupons`);
  }

  validateCoupon(couponCode: string, courseId: number): Observable<IResponseOf<ICoupon>> {
    return this.http.get<IResponseOf<ICoupon>>(`${this.couponUrl}/validate/${couponCode}/${courseId}`);
  }
} 