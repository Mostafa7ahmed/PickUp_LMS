import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteCouponService {

  constructor(private _HttpClient:HttpClient) { 
    
  }


  deleteCoupon(id: number)
  : Observable<any> {
    let headers = new HttpHeaders({
      'id': id.toString(),
    });
  

    return this._HttpClient.delete(`${environment.baseUrl}${environment.pickup}coupon/delete`, { headers });
  }

}
