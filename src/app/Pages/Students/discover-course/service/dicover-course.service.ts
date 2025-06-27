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
    roleId: number;
    name: string;
    userName: string;
    email: string;
    phoneNumber: string;
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
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  count: number;
  totalPages: number;
  moveNext: boolean;
  movePrevious: boolean;
}

@Injectable({ providedIn: 'root' })
export class DicoverCourseService {
  courses: IDicoverCourse[] = [];
  pageIndex = 1;
  totalPages = 1;

  private readonly baseUrl = `${environment.baseUrl}${environment.pickup}student/courses`;

  constructor(private http: HttpClient) {}

  /**
   * Fetch courses from API.
   * When no topicId is supplied the param is omitted so the backend returns ALL courses.
   */
  fetchCourses(topicId?: number, page = 1, pageSize = 12, orderDirection = 0, search?: string): Observable<IDicoverCourse[]> {
    let params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', pageSize.toString())
      .set('orderBeforPagination', 'true')
      .set('orderDirection', orderDirection.toString());

    if (topicId && topicId > 0) {
      params = params.set('topicId', topicId.toString());
    }

    if (search && search.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http.get<CourseApiResponse>(this.baseUrl, { params }).pipe(
      tap(res => {
        console.log('API Response:', res);
        if (res.success) {
          if (res.result.length === 0) {
            console.warn('No courses returned from API');
            this.courses = [];
            return;
          }
          
          if (res.result[0]?.name === 'string') {
            console.warn('API returned placeholder data - likely missing auth token');
            this.courses = [];
            return;
          }
          
          this.courses = res.result.map((c) => this.mapApiCourse(c));
          console.log('Mapped courses:', this.courses);
          this.pageIndex = res.pageIndex;
          this.totalPages = res.totalPages;
        }
      }),
      map(() => this.courses)
    );
  }

  private mapApiCourse(api: ApiCourseResult): IDicoverCourse {
    console.log('Mapping course:', api);
    console.log('Course photo URL:', api.photo);
    const discountPercentage = api.priceAfterDiscount && api.priceAfterDiscount < api.price
      ? Math.round(((api.price - api.priceAfterDiscount) / api.price) * 100)
      : 0;
    const mapped = {
      id: api.id,
      title: api.name || '',
      description: api.description || '',
      image: api.photo ? `${environment.baseUrlFiles}${api.photo}` : '',
      instructor: api.instructorDto?.name || '',
      instructorPhoto: api.instructorDto?.photo ? `${environment.baseUrlFiles}${api.instructorDto.photo}` : '',
      totalLessons: api.lessonsCount || 0,
      completedLessons: 0,
      duration: this.formatDuration(api.totalDuration || 0),
      rating: api.rating || 0,
      price: api.priceAfterDiscount || api.price || 0,
      originalPrice: api.price || 0,
      discount: discountPercentage,
      category: api.topicName || '',
      enrolledDate: new Date(),
      lastAccessed: new Date()
    } as IDicoverCourse;
    console.log('Mapped image:', mapped.image);
    return mapped;
  }

  private formatDuration(totalMinutes: number): string {
    if (!totalMinutes) return '0h';
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return `${hrs}h ${mins}m`;
  }
}
