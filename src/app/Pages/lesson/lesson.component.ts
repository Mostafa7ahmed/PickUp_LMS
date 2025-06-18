import { Component, Input, OnInit } from '@angular/core';
import { IPaginationResponse } from '../../Core/Shared/Interface/irespose';
import { ILessonList } from './Core/Interface/ilesson-list';
import { ListLessonService } from './Core/Services/list-lesson.service';
import { DeleteLessonService } from './Core/Services/delete-lesson.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss'
})
export class LessonComponent implements OnInit {
  ListLessonData: IPaginationResponse<ILessonList> = {} as  IPaginationResponse<ILessonList>;
  @Input() courseId: number = 0;

  // Delete dialog properties
  showDeleteDialog = false;
  lessonToDelete: ILessonList | null = null;
  isDeletingLesson = false;

  constructor(
    private _listLessonService: ListLessonService,
    private _deleteLessonService: DeleteLessonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLessons();
  }

  // Load lessons for the course
  loadLessons(): void {
    this._listLessonService.getLessons(this.courseId).subscribe((res) => {
      this.ListLessonData = res;
      console.log('📚 Lessons loaded:', res);
    });
  }

  // Edit lesson method (temporary implementation)
  editLesson(lessonId: number): void {
    console.log('✏️ Edit lesson clicked for lesson ID:', lessonId);
    alert(`Edit lesson functionality will be implemented soon!\nLesson ID: ${lessonId}`);
    // TODO: Implement edit lesson popup
    // this.router.navigate([{ outlets: { dialog: ['editLesson', lessonId] } }]);
  }

  // Open delete confirmation dialog
  deleteLesson(lesson: ILessonList, event: Event): void {
    console.log('🗑️ Delete lesson clicked:', lesson);
    event.stopPropagation(); // Prevent navigation to lesson details

    this.lessonToDelete = lesson;
    this.showDeleteDialog = true;
  }

  // Cancel delete operation
  cancelDelete(): void {
    console.log('❌ Delete operation cancelled');
    this.showDeleteDialog = false;
    this.lessonToDelete = null;
  }

  // Confirm delete operation
  confirmDelete(): void {
    console.log('🗑️ confirmDelete() called');

    if (!this.lessonToDelete) {
      console.error('❌ No lesson selected for deletion');
      this.cancelDelete();
      return;
    }

    const lessonName = this.lessonToDelete.name;
    const lessonId = this.lessonToDelete.id;

    console.log(`🗑️ Attempting to delete lesson: "${lessonName}" (ID: ${lessonId})`);

    // Close dialog first to prevent multiple clicks
    this.cancelDelete();
    this.isDeletingLesson = true;

    // Call API to delete lesson
    this._deleteLessonService.deleteLesson(lessonId).subscribe({
      next: (response) => {
        console.log('🗑️ API delete response:', response);
        this.isDeletingLesson = false;

        if (response.success) {
          console.log('✅ Lesson deleted successfully');
          this.showToast(`Lesson "${lessonName}" has been deleted successfully.`, 'success');

          // Reload lessons to reflect the deletion
          this.loadLessons();
        } else {
          console.error('❌ API delete failed:', response);
          this.showToast(`Failed to delete lesson: ${response.message || 'Unknown error'}`, 'error');
        }
      },
      error: (error) => {
        console.error('❌ Error deleting lesson:', error);
        this.isDeletingLesson = false;

        // Check if it's actually a success disguised as an error
        if (error.status === 200 || error.status === 201) {
          console.log('✅ Request succeeded despite error handler (status 200/201)');
          this.showToast(`Lesson "${lessonName}" deleted successfully!`, 'success');
          this.loadLessons();
        } else {
          this.showToast(`Failed to delete lesson (${error.status}). Please try again.`, 'error');
        }
      }
    });
  }

  // Show toast notification
  private showToast(message: string, type: 'success' | 'error' | 'warning' = 'success'): void {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-exclamation-triangle'}"></i>
        <span>${message}</span>
      </div>
    `;

    // Add styles
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#f59e0b'};
      color: white;
      padding: 16px 20px;
      border-radius: 12px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      z-index: 1001;
      animation: slideInRight 0.3s ease-out;
      max-width: 400px;
      font-size: 14px;
      font-weight: 500;
    `;

    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
}
