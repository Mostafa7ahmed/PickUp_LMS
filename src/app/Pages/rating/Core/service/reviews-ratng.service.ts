import { Injectable } from '@angular/core';
import { ReviewsByDate } from '../interface/irating';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../Environments/environment';
import { IPaginationResponse, IResponseOf } from '../../../../Core/Shared/Interface/irespose';

@Injectable({
  providedIn: 'root'
})
export class ReviewsRatngService {




    private getRating: string;
  
    constructor(private _HttpClient :HttpClient) {
      this.getRating = `${environment.baseUrl}${environment.pickup}course-rating/list`;
     }
  
     courseRating(getRatingID: number): Observable<IPaginationResponse<ReviewsByDate>> {
        return this._HttpClient.get<IPaginationResponse<ReviewsByDate>>(`${this.getRating}?courseId=${getRatingID}`  )
    }

}
