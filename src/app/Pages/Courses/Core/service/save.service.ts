import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

 
    private urlSave: string;
    constructor(private http: HttpClient) {
          this.urlSave = `${environment.baseUrl}${environment.pickup}stream/save`
     }
  
  
     getSave(nodeId: string): Observable<any> {
      const body = {
        nodeId: nodeId
      };
      return this.http.post(this.urlSave, body);
    }
}
