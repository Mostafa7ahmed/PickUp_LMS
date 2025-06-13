import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ListCourse } from '../../../Courses/Core/interface/icourses';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService, Quiz } from '../../Core/services/quiz.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cardqiuz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cardqiuz.component.html',
  styleUrl: './cardqiuz.component.scss'
})
export class CardqiuzComponent implements OnInit, OnDestroy {

  private router = inject(Router);
  private quizService = inject(QuizService);

  // Search and filter properties
  searchTerm = '';

  // Delete confirmation dialog
  showDeleteDialog = false;
  quizToDelete: Quiz | null = null;

  // Quiz data
  sampleQuizzes: Quiz[] = [];
  private quizSubscription: Subscription = new Subscription();

  ngOnInit() {
    // Subscribe to quiz changes
    this.quizSubscription = this.quizService.getQuizzes().subscribe(quizzes => {
      this.sampleQuizzes = quizzes;
    });
  }

  ngOnDestroy() {
    this.quizSubscription.unsubscribe();
  }

  openPopup() {
    this.router.navigate([{ outlets: { dialog: ['addQuiz'] } }]);
  }

  deleteQuiz(quizId: number, event: Event) {
    event.stopPropagation();

    const quiz = this.sampleQuizzes.find(quiz => quiz.id === quizId);
    this.quizToDelete = quiz || null;
    this.showDeleteDialog = true;
  }

  confirmDelete() {
    if (this.quizToDelete) {
      const success = this.quizService.deleteQuiz(this.quizToDelete.id);

      if (success) {
        this.showSuccessMessage(`Quiz "${this.quizToDelete.title}" has been deleted successfully.`);
      }
    }

    this.cancelDelete();
  }

  // Cancel delete
  cancelDelete() {
    this.showDeleteDialog = false;
    this.quizToDelete = null;
  }

  // Edit quiz
  editQuiz(quizId: number, event: Event) {
    event.stopPropagation();
    console.log('Edit quiz:', quizId);
    // Navigate to edit page or open edit modal
    // this.router.navigate(['/quiz/edit', quizId]);
  }

  // Duplicate quiz
  duplicateQuiz(quiz: Quiz, event: Event) {
    event.stopPropagation();

    this.quizService.addQuiz({
      ...quiz,
      title: `${quiz.title} (Copy)`,
      status: 'draft' as const,
      attempts: 0
    });

    this.showSuccessMessage(`Quiz "${quiz.title}" has been duplicated successfully.`);
  }

  // Preview quiz
  previewQuiz(quizId: number, event: Event) {
    event.stopPropagation();
    console.log('Preview quiz:', quizId);
    // Open preview modal or navigate to preview page
  }

  // Start quiz
  startQuiz(quizId: number, event: Event) {
    event.stopPropagation();
    console.log('Start quiz:', quizId);
    // Navigate to quiz taking page
    // this.router.navigate(['/quiz/take', quizId]);
  }

  // Show success message (you can replace this with a toast service)
  private showSuccessMessage(message: string) {
    // Create a simple toast notification
    this.showToast(message, 'success');
  }

  // Simple toast notification
  private showToast(message: string, type: 'success' | 'error' | 'warning' = 'success') {
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
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

}
