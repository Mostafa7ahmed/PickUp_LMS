import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartSessionService {
  private UrlSession: string;
  private UserAuth = localStorage.getItem('UserAuth');
  constructor(private http: HttpClient) {
        this.UrlSession = `${environment.baseUrl}${environment.pickup}mega/start-session`
   }


   getSession(): Observable<any>{return this.http.post(this.UrlSession,{} )
    } 
}
