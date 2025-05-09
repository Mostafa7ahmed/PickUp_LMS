import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { ICouponResult } from '../Interfaces/icoupon-result';

@Injectable({
  providedIn: 'root'
})
export class GetCouponService {

  private urlCoupon: string;

  constructor( private http: HttpClient  ){ 
    this.urlCoupon = `${environment.baseUrl}${environment.pickup}coupon/get`
  }

  getCourse(id:number): Observable<IResponseOf<ICouponResult>>{
    return this.http.get<IResponseOf<ICouponResult>>(`${this.urlCoupon}?id=${id} `)

  }
}
