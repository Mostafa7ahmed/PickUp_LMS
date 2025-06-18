import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../Environments/environment';

export interface IVideoResponse {
  success: boolean;
  result: {
    url: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = `${environment.baseUrl}${environment.pickup}video`;

  constructor(private http: HttpClient) {}

  /**
   * Get video URL by video ID
   * @param videoId - The ID of the video
   * @returns Observable<string> - The video URL
   */
  getVideoUrl(videoId: number): Observable<string> {
    console.log('🎥 VideoService: Fetching video URL for ID:', videoId);
    
    return this.http.get<IVideoResponse>(`${this.apiUrl}/get?id=${videoId}`).pipe(
      map(response => {
        if (response.success && response.result?.url) {
          const fullUrl = `${environment.baseUrlFiles}${response.result.url}`;
          console.log('✅ VideoService: Video URL fetched successfully:', fullUrl);
          return fullUrl;
        } else {
          console.error('❌ VideoService: Invalid response format:', response);
          throw new Error('Invalid video response format');
        }
      })
    );
  }
}
