import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
import { Observable } from 'rxjs';
import { User, validate } from '../Interface/user';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private urlBase: string;

  constructor(private _http: HttpClient) {
    this.urlBase = `${environment.baseUrl}${environment.pickup}`;
  }
  setRegiterForm(data: User): Observable<any> {
    return this._http.post(`${this.urlBase}user/register`, data, {
      headers: {
        'Content-Type': 'application/json',
        redirectUrl: 'https://pick-up-lms-lyart.vercel.app/',
      },
    });
  }

  validateRegistration(type: number, value: string): Observable<any> {
    const body = { type, value };
    return this._http.post(`${this.urlBase}user/validate-registration`, body, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
}
