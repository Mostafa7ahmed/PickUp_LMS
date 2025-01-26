import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private urlCountry: string;

  constructor(private _HttpClient:HttpClient) { 
    this.urlCountry =`${environment.baseUrl}${environment.pickup}`
  }


  getAllCountry():Observable<any>{
   return this._HttpClient.get(`${this.urlCountry}country/get-all`)
  }
}
