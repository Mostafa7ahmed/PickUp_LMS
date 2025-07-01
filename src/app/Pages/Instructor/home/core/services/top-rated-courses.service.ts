import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../Environments/environment';
import { ITopRatedCoursesResponse } from '../interfaces/top-rated-courses.interface';

@Injectable({
  providedIn: 'root'
})
export class TopRatedCoursesService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.baseUrl}${environment.pickup}homepage/instructor/top-rated-courses`;
  }

  getTopRatedCourses(): Observable<ITopRatedCoursesResponse> {
    return this.http.get<ITopRatedCoursesResponse>(this.apiUrl);
  }
} 