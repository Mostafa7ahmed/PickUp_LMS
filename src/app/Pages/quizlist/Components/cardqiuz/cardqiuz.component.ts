import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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
      console.log('📋 Updated quiz list:', quizzes);

      // Check for quizzes with questions
      quizzes.forEach(quiz => {
        if (quiz.questions && quiz.questions.length > 0) {
          console.log(`Quiz "${quiz.title}" has ${quiz.questions.length} questions:`, quiz.questions);
        }
      });
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

  }

  // Duplicate quiz

  // Preview quiz
  previewQuiz(quizId: number, event: Event) {
    event.stopPropagation();
    console.log('Preview quiz:', quizId);
    // Open preview modal
    this.router.navigate([{ outlets: { dialog: ['quizPreview', quizId] } }], {
      queryParams: { mode: 'preview' }
    });
  }

  // Start quiz
  startQuiz(quizId: number, event: Event) {
    event.stopPropagation();
    console.log('Start quiz:', quizId);
    // Open quiz in start mode
    this.router.navigate([{ outlets: { dialog: ['quizPreview', quizId] } }], {
      queryParams: { mode: 'start' }
    });
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
