import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CourseService } from '../../../my-course/core/service/course.service';
import { IcourseStudent } from '../../../my-course/core/interface/icourse-student';
import { environment } from '../../../../../Environments/environment';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.scss'
})
export class MyCoursesComponent implements OnInit, OnDestroy {
  courses: IcourseStudent[] = [];
  isLoading: boolean = false;
  baseUrl: string = environment.baseUrlFiles;
  
  private destroy$ = new Subject<void>();
  private _courseService = inject(CourseService);

  ngOnInit(): void {
    this.loadCourses();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCourses(): void {
    this.isLoading = true;
    this._courseService.getCourse(1, 6) // Get first 6 courses for homepage
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.courses = response.result || [];
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading courses:', error);
          this.isLoading = false;
        }
      });
  }

  getProgressColor(progress: number): string {
    if (progress >= 80) return '#10b981'; // Green
    if (progress >= 60) return '#f59e0b'; // Yellow
    if (progress >= 40) return '#ef4444'; // Orange
    return '#dc2626'; // Red
  }

  getCourseIcon(topicName: string): string {
    const topic = topicName?.toLowerCase() || '';
    if (topic.includes('data') || topic.includes('algorithm')) return '↩️';
    if (topic.includes('database') || topic.includes('sql')) return '📗';
    if (topic.includes('ai') || topic.includes('artificial') || topic.includes('intelligence')) return '🔮';
    if (topic.includes('security') || topic.includes('cyber')) return '🛡️';
    if (topic.includes('web') || topic.includes('frontend')) return '🌐';
    if (topic.includes('mobile') || topic.includes('app')) return '📱';
    if (topic.includes('design') || topic.includes('ui')) return '🎨';
    return '📚'; // Default icon
  }

  getCourseColor(index: number): string {
    const colors = ['#E6F0FF', '#E6FFF2', '#F3E6FF', '#FFEDED', '#FFF7E6', '#F0FFF4'];
    return colors[index % colors.length];
  }

  getDurationText(totalDuration: number): string {
    if (!totalDuration) return 'N/A';
    const hours = Math.floor(totalDuration / 60);
    const minutes = totalDuration % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }
}
