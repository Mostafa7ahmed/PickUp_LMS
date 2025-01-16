import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
import { Observable } from 'rxjs';
import { User } from '../Interface/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private urlRegister: string;

  constructor(private _http:HttpClient) { 
    this.urlRegister =`${environment.baseUrl}${environment.pickup}user/register`
  }

  setRegiterForm(data: User): Observable<any> {
    const headers = new HttpHeaders({
      redirectUrl: 'https://pick-up-lms.vercel.app/'
    });
    return this._http.post(this.urlRegister,data, {headers}
    );
  }
}
