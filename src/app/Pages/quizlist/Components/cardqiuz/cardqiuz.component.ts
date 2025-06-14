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
  filteredQuizzes: Quiz[] = [];
  private quizSubscription: Subscription = new Subscription();

  ngOnInit() {
    // Subscribe to quiz changes
    this.quizSubscription = this.quizService.getQuizzes().subscribe(quizzes => {
      this.sampleQuizzes = quizzes;
      this.applySearch(); // Apply search filter
      console.log('📋 Updated quiz list:', quizzes);

      // Storage info
      const storageInfo = this.quizService.getStorageInfo();
      console.log(`📊 Quiz Storage: ${storageInfo.count} quizzes, ${storageInfo.size}`);

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

  // Search functionality
  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.applySearch();
  }

  // Handle keyboard shortcuts
  onSearchKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.clearSearch();
      (event.target as HTMLInputElement).blur();
    }
  }

  applySearch() {
    if (!this.searchTerm.trim()) {
      this.filteredQuizzes = [...this.sampleQuizzes];
    } else {
      const searchLower = this.searchTerm.toLowerCase().trim();
      this.filteredQuizzes = this.sampleQuizzes.filter(quiz =>
        quiz.title.toLowerCase().includes(searchLower) ||
        quiz.description.toLowerCase().includes(searchLower) ||
        quiz.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        quiz.difficulty.toLowerCase().includes(searchLower) ||
        quiz.status.toLowerCase().includes(searchLower) ||
        (quiz.courseName && quiz.courseName.toLowerCase().includes(searchLower))
      );
    }
    console.log(`🔍 Search results: ${this.filteredQuizzes.length} quizzes found for "${this.searchTerm}"`);
  }

  clearSearch() {
    this.searchTerm = '';
    this.applySearch();
  }

  // Highlight search terms in text
  highlightSearchTerm(text: string): string {
    if (!this.searchTerm.trim()) {
      return text;
    }

    const searchRegex = new RegExp(`(${this.searchTerm.trim()})`, 'gi');
    return text.replace(searchRegex, '<mark class="search-highlight">$1</mark>');
  }

  // Get search placeholder based on results
  getSearchPlaceholder(): string {
    if (this.sampleQuizzes.length === 0) {
      return 'No quizzes to search...';
    }
    return `Search ${this.sampleQuizzes.length} quizzes...`;
  }

  // Debug methods (for development)
  clearAllQuizzes() {
    if (confirm('Are you sure you want to clear all quizzes? This cannot be undone.')) {
      this.quizService.clearAllQuizzes();
      console.log('🗑️ All quizzes cleared!');
    }
  }

  logStorageInfo() {
    const info = this.quizService.getStorageInfo();
    console.log('📊 Storage Info:', info);
    console.log('📋 All Quizzes:', this.sampleQuizzes);
  }

  // Create sample quiz for testing
  createSampleQuiz() {
    const sampleQuestions = [
      {
        courseId: 1,
        quizId: 0,
        quizSectionId: 0,
        order: 1,
        hint: 'Think about JavaScript basics',
        text: 'JavaScript is a compiled programming language.',
        trueAndFalse: {
          answer: false
        }
      },
      {
        courseId: 1,
        quizId: 0,
        quizSectionId: 0,
        order: 2,
        hint: 'Consider modern web development',
        text: 'React is a JavaScript library for building user interfaces.',
        trueAndFalse: {
          answer: true
        }
      },
      {
        courseId: 1,
        quizId: 0,
        quizSectionId: 0,
        order: 3,
        hint: 'Think about array methods',
        text: 'Which method adds an element to the end of an array?',
        multipleChoise: [
          { answer: 'push()', correct: true },
          { answer: 'pop()', correct: false },
          { answer: 'shift()', correct: false },
          { answer: 'unshift()', correct: false }
        ]
      }
    ];

    const newQuiz = this.quizService.addQuizWithQuestions({
      title: 'Sample JavaScript Quiz',
      description: 'A sample quiz to test the localStorage functionality',
      questionsCount: sampleQuestions.length,
      duration: 15,
      difficulty: 'medium',
      status: 'published' as const,
      tags: ['JavaScript', 'Sample', 'Test'],
      courseId: 1,
      courseName: 'JavaScript Fundamentals',
      attempts: 0,
      createdDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }, sampleQuestions);

    console.log('✅ Sample quiz created:', newQuiz);
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
