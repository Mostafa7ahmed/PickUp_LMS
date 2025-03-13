import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  urlBase: string;
  userData: any = null;
  private readonly _router = inject(Router);
  constructor(private _HttpClient: HttpClient) {
    this.urlBase = `${environment.baseUrl}${environment.pickup}`;
  }


  upload(): Observable<any> {
    return this._HttpClient.post(`${this.urlBase}stream/upload/`, {

    })
  }
}
