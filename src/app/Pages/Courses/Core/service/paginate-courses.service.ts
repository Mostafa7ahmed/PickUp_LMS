import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginateCoursesService {
  private urlPagination: string;

  constructor(private _HttpClient :HttpClient) {
    this.urlPagination = `${environment.baseUrl}${environment.pickup}course/paginate?`;
   }



   getCourses(topicId: number , pageNumber: number = 1, pageSize: number = 2, orderBy: number = 2, orderDirection: number = 1): Observable<any> {
    const params = {
      topicId: topicId.toString(),
      courseListViewType: '0',
      orderBy: orderBy.toString(),
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      orderBeforPagination: 'true',
      orderDirection: orderDirection.toString()
    };

    return this._HttpClient.get<any>(this.urlPagination, { params });
  }
}
