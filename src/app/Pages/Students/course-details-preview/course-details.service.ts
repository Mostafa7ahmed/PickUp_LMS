import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../Environments/environment';
import { map } from 'rxjs/operators';

export interface InstructorDto {
  id: number;
  userId: number;
  name: string;
  bio: string;
  photo: string;
  rating: number;
}

export interface RatingDto {
  id: number;
  value: number;
  note: string;
  createdOn: string;
  student: InstructorDto; // same shape
}

export interface CourseDetailsApi {
  id: number;
  introductionVideo: string;
  photo: string;
  description: string;
  rating: number;
  updatedOn: string;
  enrolledCount: number;
  instructor: InstructorDto;
  ratings: RatingDto[];
}

interface CourseDetailsResponse {
  success: boolean;
  result: CourseDetailsApi;
  statusCode: number;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class CourseDetailsService {
  private readonly url = `${environment.baseUrl}${environment.pickup}student/course-details`;
  constructor(private http: HttpClient) {}

  getCourseDetails(id: number): Observable<CourseDetailsApi> {
    const params = new HttpParams().set('courseId', id);
    return this.http.get<CourseDetailsResponse>(this.url, { params }).pipe(
      map((res) => {
        if (!res.success) {
          throw new Error(res.message || 'Failed to load course');
        }
        return res.result;
      })
    );
  }
} 