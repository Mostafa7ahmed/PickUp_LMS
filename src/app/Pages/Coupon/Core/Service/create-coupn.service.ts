import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { Observable } from 'rxjs';
import { ICreateCoupon } from '../Interfaces/icreate-coupon';

@Injectable({
  providedIn: 'root'
})
export class CreateCoupnService {



  private urlAddcoupan: string;

  constructor(private http: HttpClient) {
    this.urlAddcoupan = `${environment.baseUrl}${environment.pickup}coupon/create `
  }

  addCoupan(coupan: ICreateCoupon): Observable<IResponseOf<ICreateCoupon>> {
    return this.http.post<IResponseOf<ICreateCoupon>>(this.urlAddcoupan, coupan);
  }  
}
