import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LessonService } from '../../Core/Services/lesson.service';
import {
  ILesson,
  ILessonListRequest,
  IPaginationInfo,
  OrderDirection
} from '../../Core/Shared/Interface/lesson.interface';

@Component({
  selector: 'app-course-lessons',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-lessons.component.html',
  styleUrl: './course-lessons.component.scss'
})
export class CourseLessonsComponent implements OnInit, OnChanges {
  private lessonService = inject(LessonService);
  private router = inject(Router);

  @Input() courseId: number = 0;
  @Input() showPagination: boolean = true;
  @Input() pageSize: number = 10;
  @Input() autoLoad: boolean = true;

  lessons: ILesson[] = [];
  isLoading = false;
  error: string | null = null;
  
  // Pagination
  paginationInfo: IPaginationInfo = {
    pageSize: 10,
    pageIndex: 0,
    totalCount: 0,
    count: 0,
    totalPages: 0,
    moveNext: false,
    movePrevious: false
  };

  // Filters and sorting
  currentPage = 1;
  orderDirection = OrderDirection.Ascending;
  orderBeforePagination = true;

  // Enums for template
  OrderDirection = OrderDirection;

  // Math for template
  Math = Math;

  ngOnInit(): void {
    if (this.autoLoad && this.courseId) {
      this.loadLessons();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseId'] && this.courseId && this.autoLoad) {
      this.currentPage = 1;
      this.loadLessons();
    }
  }

  loadLessons(): void {
    if (!this.courseId) {
      this.error = 'Course ID is required';
      return;
    }

    this.isLoading = true;
    this.error = null;

    const request: ILessonListRequest = {
      courseId: this.courseId,
      pageNumber: this.currentPage,
      pageSize: this.pageSize,
      orderBeforPagination: this.orderBeforePagination,
      orderDirection: this.orderDirection
    };

    this.lessonService.getCourseLessons(request).subscribe({
      next: (response) => {
        if (response.success) {
          this.lessons = response.result || [];
          this.paginationInfo = {
            pageSize: response.pageSize,
            pageIndex: response.pageIndex,
            totalCount: response.totalCount,
            count: response.count,
            totalPages: response.totalPages,
            moveNext: response.moveNext,
            movePrevious: response.movePrevious
          };
        } else {
          this.error = response.message || 'Failed to load lessons';
          this.lessons = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading lessons:', error);
        this.error = 'Error loading lessons. Please try again.';
        this.lessons = [];
        this.isLoading = false;
      }
    });
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.paginationInfo.totalPages) {
      this.currentPage = page;
      this.loadLessons();
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.loadLessons();
  }

  onOrderDirectionChange(): void {
    this.currentPage = 1;
    this.loadLessons();
  }

  onOrderBeforePaginationChange(): void {
    this.currentPage = 1;
    this.loadLessons();
  }

  nextPage(): void {
    if (this.paginationInfo.moveNext) {
      this.onPageChange(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.paginationInfo.movePrevious) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  goToFirstPage(): void {
    this.onPageChange(1);
  }

  goToLastPage(): void {
    this.onPageChange(this.paginationInfo.totalPages);
  }

  formatDuration(minutes: number): string {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  }

  formatViews(views: number): string {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
  }

  getPageNumbers(): number[] {
    const totalPages = this.paginationInfo.totalPages;
    const currentPage = this.currentPage;
    const pages: number[] = [];
    
    // Show max 5 page numbers
    const maxPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  refresh(): void {
    this.loadLessons();
  }

  /**
   * Navigate to lesson view page
   */
  viewLesson(lesson: ILesson): void {
    this.router.navigate(['/viewLesson', lesson.id]);
  }

  /**
   * Navigate to lesson details/info page
   */
  viewLessonDetails(lesson: ILesson): void {
    // For now, navigate to the same lesson view page
    // In the future, this could navigate to a different details page
    this.router.navigate(['/viewLesson', lesson.id]);
  }

  /**
   * Play lesson (navigate to lesson view)
   */
  playLesson(lesson: ILesson): void {
    this.viewLesson(lesson);
  }
}
