import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  private apiUrl = `${environment.baseUrl}${environment.pickup}user`;

  constructor(private http: HttpClient) {}

  forgetPassword(email: string): Observable<any> {
    const body = {
      email: email
    };
 

    return this.http.post(`${this.apiUrl}/forget-password`, body , {
      headers: {
        'Content-Type': 'application/json',
        redirectUrl: 'http://localhost:4200/changepassword',
      },
    });
  }

  changePassword(data: any): Observable<any> {
    const body = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmedNewPassword: data.confirmedNewPassword
    };
    return this.http.post(`${this.apiUrl}/change-password`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

}
