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
  const token = localStorage.getItem('UserAuth');

  if (token) {
    this.userData = jwtDecode<Decode>(token);

    if (this.userData?.role) {
      localStorage.setItem('roles', this.userData.role); 
    }

    return this.userData;
  }

  return this.userData;
}

  SignOut() {
    localStorage.removeItem('UserAuth');
    localStorage.removeItem('refreshToken');
    this._router.navigateByUrl('/login');
    



 
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
