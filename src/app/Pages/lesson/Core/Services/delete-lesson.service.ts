import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface IDeleteLessonResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class DeleteLessonService {

  private deleteLessonUrl: string;
  
  constructor(private _HttpClient: HttpClient) {
    this.deleteLessonUrl = `${environment.baseUrl}${environment.pickup}lesson/delete`;
  }
  
  /**
   * Delete a lesson by ID
   */
  deleteLesson(id: number): Observable<IDeleteLessonResponse> {
    console.log('🗑️ DeleteLessonService.deleteLesson() called with ID:', id);
    console.log('🌐 Delete URL:', this.deleteLessonUrl);
    
    // Create headers with the lesson ID as required by the API
    const headers = new HttpHeaders({
      'id': id.toString()
    });
    
    console.log('📋 Request headers:', headers.keys());
    console.log('🔑 ID header value:', headers.get('id'));
    
    return this._HttpClient.delete<IDeleteLessonResponse>(this.deleteLessonUrl, { headers }).pipe(
      tap(response => {
        console.log('🗑️ Raw API delete response:', response);
        if (response && response.success) {
          console.log('✅ API confirmed lesson deleted successfully');
        } else {
          console.warn('⚠️ API deletion failed or returned false:', response);
        }
      }),
      catchError(error => {
        console.error('❌ HTTP error during lesson deletion:', error);
        console.error('❌ Error status:', error.status);
        console.error('❌ Error message:', error.message);
        console.error('❌ Full error object:', error);
        throw error;
      })
    );
  }
}
