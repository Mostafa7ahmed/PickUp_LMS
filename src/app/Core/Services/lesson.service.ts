import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';
import {
  ILessonListRequest,
  ILessonListResponse,
  ILessonDetailResponse,
  OrderDirection
} from '../Shared/Interface/lesson.interface';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private lessonUrl: string;

  constructor(private http: HttpClient) {
    this.lessonUrl = `${environment.baseUrl}${environment.pickup}lesson`;
  }

  /**
   * Get course lessons with pagination and ordering
   */
  getCourseLessons(request: ILessonListRequest): Observable<ILessonListResponse> {
    let params = new HttpParams()
      .set('courseId', request.courseId.toString())
      .set('pageNumber', request.pageNumber.toString())
      .set('pageSize', request.pageSize.toString())
      .set('orderBeforPagination', request.orderBeforPagination.toString())
      .set('orderDirection', request.orderDirection.toString());

    return this.http.get<ILessonListResponse>(`${this.lessonUrl}/course-lessons`, { params });
  }

  /**
   * Get course lessons with default parameters
   */
  getCourseLessonsDefault(
    courseId: number, 
    pageNumber: number = 1, 
    pageSize: number = 10,
    orderBeforPagination: boolean = true,
    orderDirection: OrderDirection = OrderDirection.Ascending
  ): Observable<ILessonListResponse> {
    const request: ILessonListRequest = {
      courseId,
      pageNumber,
      pageSize,
      orderBeforPagination,
      orderDirection
    };
    
    return this.getCourseLessons(request);
  }

  /**
   * Get all lessons for a course (without pagination)
   */
  getAllCourseLessons(
    courseId: number,
    orderDirection: OrderDirection = OrderDirection.Ascending
  ): Observable<ILessonListResponse> {
    const request: ILessonListRequest = {
      courseId,
      pageNumber: 1,
      pageSize: 1000, // Large page size to get all lessons
      orderBeforPagination: true,
      orderDirection
    };

    return this.getCourseLessons(request);
  }

  /**
   * Get lesson details by ID
   */
  getLessonById(lessonId: number): Observable<ILessonDetailResponse> {
    const params = new HttpParams().set('id', lessonId.toString());
    return this.http.get<ILessonDetailResponse>(`${this.lessonUrl}/get`, { params });
  }
}
