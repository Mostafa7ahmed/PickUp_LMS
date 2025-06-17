import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteCoursesService {

  constructor(private _HttpClient:HttpClient) { 
    
  }


  deleteCourse(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'id': id.toString(),
    });

    const url = `${environment.baseUrl}${environment.pickup}course/delete`;
    console.log('🗑️ DeleteCoursesService: Making DELETE request to:', url);
    console.log('🗑️ DeleteCoursesService: Headers:', headers.keys());
    console.log('🗑️ DeleteCoursesService: Course ID:', id);

    return this._HttpClient.delete(url, { headers });
  }
      
}
