import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../Environments/environment';
import { ITopRatedInstructorsResponse } from '../interfaces/top-rated-instructors.interface';

@Injectable({
  providedIn: 'root'
})
export class TopRatedInstructorsService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.baseUrl}${environment.pickup}homepage/instructor/top-rated-instructors`;
  }

  getTopRatedInstructors(): Observable<ITopRatedInstructorsResponse> {
    return this.http.get<ITopRatedInstructorsResponse>(this.apiUrl);
  }
} 