import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

 
    private urlSave: string;
    private UserAuth = localStorage.getItem('UserAuth');
    constructor(private http: HttpClient) {
          this.urlSave = `${environment.baseUrl}${environment.pickup}stream/save`
     }
  
  
     getSave(nodeId: string): Observable<any> {
      const body = {
        nodeId: nodeId, // استخدام الـ nodeId هنا
      };
    
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.UserAuth}`,
        'Content-Type': 'application/json',
      });
    
      return this.http.post(this.urlSave, body, { headers });
    }
}
