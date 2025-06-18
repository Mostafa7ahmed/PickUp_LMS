import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateCouponPayload } from '../Interfaces/update-coupon-payload';
import { environment } from '../../../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateCouponService {



  private urlCoupon: string;

  constructor( private http: HttpClient  ){ 
    this.urlCoupon = `${environment.baseUrl}${environment.pickup}coupon`
  }
  updateCoupon(data: UpdateCouponPayload): Observable<any> {
    return this.http.put(`${this.urlCoupon}/update`, data);
  }



}
