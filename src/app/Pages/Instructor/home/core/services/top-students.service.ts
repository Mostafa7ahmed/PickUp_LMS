import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../Environments/environment';
import { ITopStudentsResponse } from '../interfaces/top-students.interface';

@Injectable({
  providedIn: 'root'
})
export class TopStudentsService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.baseUrl}${environment.pickup}homepage/instructor/top-students`;
  }

  getTopStudents(): Observable<ITopStudentsResponse> {
    return this.http.get<ITopStudentsResponse>(this.apiUrl);
  }
} 