import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../Core/Services/lesson.service';
import { ILessonDetail, IApiError } from '../../Core/Shared/Interface/lesson.interface';

@Component({
  selector: 'app-lesson-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-view.component.html',
  styleUrl: './lesson-view.component.scss'
})
export class LessonViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private lessonService = inject(LessonService);

  lessonDetail: ILessonDetail | null = null;
  lessonId: number = 0;
  isLoading = false;
  error: string | null = null;
  apiError: IApiError | null = null;

  ngOnInit(): void {
    // Get lesson ID from route parameters
    this.route.params.subscribe(params => {
      this.lessonId = +params['id'] || 0;
      if (this.lessonId) {
        this.loadLessonDetail();
      } else {
        this.error = 'Invalid lesson ID';
      }
    });
  }

  loadLessonDetail(): void {
    if (!this.lessonId) {
      this.error = 'Lesson ID is required';
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.apiError = null;

    this.lessonService.getLessonById(this.lessonId).subscribe({
      next: (response) => {
        if (response.success && response.result) {
          this.lessonDetail = response.result;
        } else {
          this.error = response.message || 'Failed to load lesson details';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading lesson details:', error);
        
        // Handle API error response
        if (error.error && error.error.statusCode) {
          this.apiError = error.error;
          this.error = `Error ${error.error.statusCode}: ${error.error.message}`;
        } else {
          this.error = 'Error loading lesson details. Please try again.';
        }
        
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  editLesson(): void {
    // Navigate to edit lesson page (to be implemented)
    this.router.navigate(['/editLesson', this.lessonId]);
  }

  deleteLesson(): void {
    // Implement delete lesson functionality
    if (confirm('Are you sure you want to delete this lesson?')) {
      // TODO: Implement delete lesson API call
      console.log('Delete lesson:', this.lessonId);
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getErrorMessages(): string[] {
    if (!this.apiError?.errors) return [];
    
    const messages: string[] = [];
    Object.keys(this.apiError.errors).forEach(key => {
      this.apiError!.errors[key].forEach(message => {
        messages.push(`${key}: ${message}`);
      });
    });
    
    return messages;
  }

  retry(): void {
    this.loadLessonDetail();
  }
}
