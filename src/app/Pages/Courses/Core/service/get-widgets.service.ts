import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetWidgetsService {

  private urlWidgets: string;

  constructor( private http: HttpClient  ){ 
    this.urlWidgets = `${environment.baseUrl}${environment.pickup}course/get-widgets`
  }

  getWidgets(): Observable<any>{
    return this.http.get(this.urlWidgets
)
  }
}
