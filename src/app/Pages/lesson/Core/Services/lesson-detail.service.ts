import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { Observable } from 'rxjs';
import { ILessonDetailResponse } from '../Interface/ilesson-detail';

@Injectable({
  providedIn: 'root'
})
export class LessonDetailService {

  private getLessonDetailUrl: string;
  
  constructor(private _HttpClient: HttpClient) {
    this.getLessonDetailUrl = `${environment.baseUrl}${environment.pickup}lesson/get`;
  }
  
  /**
   * Get lesson details by ID
   */
  getLessonDetail(id: number): Observable<ILessonDetailResponse> {
    console.log('📚 LessonDetailService.getLessonDetail() called with ID:', id);
    console.log('🌐 Get URL:', this.getLessonDetailUrl);
    
    return this._HttpClient.get<ILessonDetailResponse>(`${this.getLessonDetailUrl}?id=${id}`);
  }
}
