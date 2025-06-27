import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../../Environments/environment';
import { IDicoverCourse } from '../../my-course/core/interface/icourse-student';

interface ApiCourseResult {
  id: number;
  name: string;
  description: string;
  photo: string;
  instructorDto: {
    id: number;
    name: string;
    photo: string;
  };
  lessonsCount: number;
  totalDuration: number;
  rating: number;
  price: number;
  priceAfterDiscount: number;
  topicName: string;
  discount: { amount: number; type: number };
}

interface CourseApiResponse {
  success: boolean;
  result: ApiCourseResult[];
  pageIndex: number;
  totalPages: number;
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class DicoverCourseService {
  courses: IDicoverCourse[] = [];

  private readonly baseUrl = `${environment.baseUrl}${environment.pickup}student/courses`;

  constructor(private http: HttpClient) {}

  /**
   * Fetch courses from API and update internal array so any component
   * that injects this service (e.g. CourseCardComponent) picks up changes.
   */
  fetchCourses(topicId = 0, page = 1, pageSize = 12, orderDirection = 0): Observable<IDicoverCourse[]> {
    const params = new HttpParams()
      .set('topicId', topicId)
      .set('pageNumber', page)
      .set('pageSize', pageSize)
      .set('orderBeforPagination', true)
      .set('orderDirection', orderDirection);

    return this.http.get<CourseApiResponse>(this.baseUrl, { params }).pipe(
      tap(res => {
        if (res.success) {
          this.courses = res.result.map((c) => this.mapApiCourse(c));
        }
      }),
      map(() => this.courses)
    );
  }

  private mapApiCourse(api: ApiCourseResult): IDicoverCourse {
    const discountPercentage = api.priceAfterDiscount && api.priceAfterDiscount < api.price
      ? Math.round(((api.price - api.priceAfterDiscount) / api.price) * 100)
      : 0;
    return {
      id: api.id,
      title: api.name,
      description: api.description,
      image: api.photo,
      instructor: api.instructorDto?.name,
      instructorPhoto: api.instructorDto?.photo,
      totalLessons: api.lessonsCount,
      completedLessons: 0,
      duration: this.formatDuration(api.totalDuration),
      rating: api.rating,
      price: api.priceAfterDiscount || api.price,
      originalPrice: api.price,
      discount: discountPercentage,
      category: api.topicName,
      enrolledDate: new Date(),
      lastAccessed: new Date()
    } as IDicoverCourse;
  }

  private formatDuration(totalMinutes: number): string {
    if (!totalMinutes) return '0h';
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return `${hrs}h ${mins}m`;
  }
}
