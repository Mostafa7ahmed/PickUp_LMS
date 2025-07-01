import { Injectable } from '@angular/core';
import { ReviewsByDate } from '../interface/irating';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../Environments/environment';
import { IPaginationResponse, IResponseOf } from '../../../../Core/Shared/Interface/irespose';

export interface IRatingSubmission {
  courseId: number;
  value: number;
  note: string;
}

export interface IRatingUpdate {
  id: number;
  value: number;
  note: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsRatngService {

    private getRating: string;
    private submitRating: string;
    private updateRating: string;
  
    constructor(private _HttpClient: HttpClient) {
      this.getRating = `${environment.baseUrl}${environment.pickup}course-rating/list`;
      this.submitRating = `${environment.baseUrl}${environment.pickup}course-rating/rate`;
      this.updateRating = `${environment.baseUrl}${environment.pickup}course-rating/update`;
    }
  
    courseRating(getRatingID: number): Observable<IPaginationResponse<ReviewsByDate>> {
        return this._HttpClient.get<IPaginationResponse<ReviewsByDate>>(`${this.getRating}?courseId=${getRatingID}`)
    }

    /**
     * Submit a new rating for a course
     * @param ratingData - Object containing courseId, value (1-5), and note
     * @returns Observable of the API response
     */
    submitCourseRating(ratingData: IRatingSubmission): Observable<IResponseOf<any>> {
        return this._HttpClient.post<IResponseOf<any>>(this.submitRating, ratingData);
    }

    /**
     * Update an existing rating
     * @param ratingData - Object containing id, value (1-5), and note
     * @returns Observable of the API response
     */
    updateCourseRating(ratingData: IRatingUpdate): Observable<IResponseOf<any>> {
        return this._HttpClient.put<IResponseOf<any>>(this.updateRating, ratingData);
    }
}
