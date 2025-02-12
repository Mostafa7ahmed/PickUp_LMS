import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { Decode } from '../Interface/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  urlBase: string;
  userData: any = null;
  private readonly _router = inject(Router);

  constructor(private _HttpClient: HttpClient) {
    this.urlBase = `${environment.baseUrl}${environment.pickup}`;
  }

  
  saveUserAuth(): Decode {
    if (localStorage.getItem('UserAuth') != null) {
      this.userData = jwtDecode(localStorage.getItem('UserAuth')!);
      return this.userData
    }
    
    return this.userData
    // return user Data ==>userData userType ==> route pages
  }
  SignOut() {
    localStorage.removeItem('UserAuth');
    localStorage.removeItem('refreshToken');
    this._router.navigate(['/login']);
    

    return ;


 
  }
  setLoginForm(data: any): Observable<any> {
    return this._HttpClient.post(`${this.urlBase}user/login`, data);
  }


  setRefreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');  
    return this._HttpClient.post(`${this.urlBase}user/refresh-token`,{refreshToken});
  }
  saveToken(refreshToken: string , UserAuth :string) {
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('UserAuth', UserAuth);


  }

}
