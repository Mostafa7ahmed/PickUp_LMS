import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StreamType } from '../Interface/stream-type';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  urlBase: string;
  private readonly _router = inject(Router);
  constructor(private _HttpClient: HttpClient) {
    this.urlBase = `${environment.baseUrl}${environment.pickup}`;
  }


  upload(file: File, type: number): Observable<any> {
    const formData = new FormData();
    formData.append('formFile', file, file.name);
    formData.append('type', type.toString());
    return this._HttpClient.post(`${this.urlBase}stream/upload`, formData, {
      reportProgress: true,
      observe: 'response'
    });
  }
}
