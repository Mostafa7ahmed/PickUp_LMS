import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../Environments/environment';

@Injectable({providedIn:'root'})
export class EnrollmentService{
 private readonly url=`${environment.baseUrl}${environment.pickup}enrollments/create`;
 constructor(private http:HttpClient){}
 enroll(courseId:number,couponCode:string='',method:number=0):Observable<any>{
  return this.http.post(this.url,{courseId, couponCode,enrollmentMethod:method});
 }
} 