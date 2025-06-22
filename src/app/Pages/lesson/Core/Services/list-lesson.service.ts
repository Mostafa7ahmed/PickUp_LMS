import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { Observable } from 'rxjs';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { ILessonList } from '../Interface/ilesson-list';

@Injectable({
  providedIn: 'root'
})
export class ListLessonService {

    private getRating: string;
  
    constructor(private _HttpClient :HttpClient) {
      this.getRating = `${environment.baseUrl}${environment.pickup}lesson/course-lessons`;
     }
     getLessons(
      courseId : number, 
      pageNumber: number = 1, 
      pageSize: number = 100, 
      orderDirection: number = 1,
    ): Observable<IPaginationResponse<ILessonList>> {
    
      const params: any = {
        courseId : courseId .toString(),
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        orderDirection: orderDirection.toString(),
        orderBeforPagination: 'true',
      };
    

    
        return this._HttpClient.get<IPaginationResponse<ILessonList>>(`${this.getRating}?courseId=${courseId}`  )
    }
}
