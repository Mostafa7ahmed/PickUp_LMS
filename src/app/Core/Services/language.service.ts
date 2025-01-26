import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

 private allLanguage: string;

  constructor(private _HttpClient:HttpClient) { 
    this.allLanguage =`${environment.baseUrl}${environment.pickup}language/paginate`
  }


  getAllLanguage(orderBy :number =1 ,pageNumber:number=1 , pageSize:number = 50 ,orderBeforPagination:boolean = true , orderDirection:number=0):Observable<any>{
   return this._HttpClient.get(`${this.allLanguage}?orderBy=${orderBy}&pageNumber=${pageNumber}&pageSize=${pageSize}&orderBeforPagination=${orderBeforPagination}&orderDirection=${orderDirection}`)
  }}
