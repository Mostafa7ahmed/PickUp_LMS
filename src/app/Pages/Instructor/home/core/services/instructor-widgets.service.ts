import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../../Environments/environment';
import { 
  InstructorWidgetsResponse, 
  InstructorWidgets, 
  WidgetCard 
} from '../interfaces/instructor-widgets.interface';

@Injectable({
  providedIn: 'root'
})
export class InstructorWidgetsService {
  private readonly apiUrl = `${environment.baseUrl}${environment.pickup}homepage/instructor/widgets`;

  constructor(private http: HttpClient) {}

  getInstructorWidgets(): Observable<InstructorWidgets> {
    return this.http.get<InstructorWidgetsResponse>(this.apiUrl).pipe(
      map(response => response.result),
      catchError(error => {
        console.error('Error fetching instructor widgets:', error);
        // Return fallback data
        return of({
          totalStudents: 0,
          activeCourses: 0,
          totalRevenue: 0,
          averageRating: 0
        });
      })
    );
  }

  transformToWidgetCards(widgets: InstructorWidgets): WidgetCard[] {
    return [
      {
        title: 'Total Students',
        value: widgets.totalStudents,
        icon: 'fas fa-users',
        color: '#4F46E5'
      },
      {
        title: 'Active Courses',
        value: widgets.activeCourses,
        icon: 'fas fa-book-open',
        color: '#10B981'
      },
      {
        title: 'Total Revenue',
        value: `$${widgets.totalRevenue}`,
        icon: 'fas fa-dollar-sign',
        color: '#F59E0B'
      },
      {
        title: 'Average Rating',
        value: `${widgets.averageRating.toFixed(1)}`,
        icon: 'fas fa-star',
        color: '#EF4444'
      }
    ];
  }
} 