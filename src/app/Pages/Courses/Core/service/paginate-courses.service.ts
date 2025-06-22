import { Topic } from './../interface/view-course';
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


  getCourses(
    topicId: number, 
    stageId?: number,
    pageNumber: number = 1, 
    pageSize: number = 100, 
    courseListViewType: number = 0, 
    from?: string, 
    to?: string, 
    orderBy: number = 2, 
    orderDirection: number = 1,
    search?: string,
  ): Observable<any> {
    const params: any = {
      topicId: topicId.toString(),
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      courseListViewType: courseListViewType.toString(),
      orderBy: orderBy.toString(),
      orderDirection: orderDirection.toString(),
      orderBeforPagination: 'true',
    };

    if (stageId) {
      params.stageId = stageId.toString();
    }
    if (from) params.from = from;
    if (to) params.to = to;
    if (search) params.search = search;
  
    return this._HttpClient.get<any>(`${this.urlPagination}`, { params });
  }
}
