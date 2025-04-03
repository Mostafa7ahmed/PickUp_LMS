import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../Environments/environment';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { ICouponRespone } from '../Interfaces/icoupon-respone';

@Injectable({
  providedIn: 'root'
})
export class ListCouponService {

 private urlPagination: string;

  constructor(private _HttpClient :HttpClient) {
    this.urlPagination = `${environment.baseUrl}${environment.pickup}coupon/list?`;
   }



   getCoupon(
    courseId : number, 
    pageNumber: number = 1, 
    pageSize: number = 100,
    from?: string, 
    to?: string, 
    orderBy: number = 2, 
    orderDirection: number = 1,

  ): Observable<IPaginationResponse<ICouponRespone>> {
  
    const params: any = {
      courseId : courseId .toString(),
      orderBy: orderBy.toString(),
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      orderBeforPagination: 'true',
      orderDirection: orderDirection.toString(),
    };

    if (from) params.from = from;
    if (to) params.to = to;

    return this._HttpClient.get<IPaginationResponse<ICouponRespone>>(`${this.urlPagination}`, { params });
  }}
