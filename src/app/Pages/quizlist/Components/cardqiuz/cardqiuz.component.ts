import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../Core/services/quiz.service';
import { Quiz, QuizQuestion } from '../../Core/interfaces/iquiz-api';
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

    // Load quizzes from API
    this.loadQuizzesFromAPI();
  }

  // Load quizzes from API
  loadQuizzesFromAPI() {
    console.log('🔄 Loading quizzes from API...');
    this.quizService.refreshQuizzes().subscribe({
      next: (response) => {
        console.log('✅ Quizzes loaded from API:', response);
        if (!response.success) {
          console.warn('⚠️ API response indicates failure:', response.message);
        }
      },
      error: (error) => {
        console.error('❌ Error loading quizzes from API:', error);
        // No fallback to static data - only show real API data
        console.log('⚠️ No quizzes will be shown until API is available');
      }
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
      // Use API search if available, otherwise fallback to local search
      const searchLower = this.searchTerm.toLowerCase().trim();

      // Try API search first
      this.quizService.searchQuizzesFromAPI(searchLower).subscribe({
        next: (response) => {
          if (response.success) {
            console.log(`🔍 API Search results: ${response.result.length} quizzes found for "${this.searchTerm}"`);
            // The service will update the quizzes observable, so we don't need to do anything here
          } else {
            // Fallback to local search
            this.performLocalSearch(searchLower);
          }
        },
        error: (error) => {
          console.warn('⚠️ API search failed, using local search:', error);
          this.performLocalSearch(searchLower);
        }
      });
    }
  }

  // Local search fallback
  private performLocalSearch(searchLower: string) {
    this.filteredQuizzes = this.sampleQuizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(searchLower) ||
      quiz.description.toLowerCase().includes(searchLower) ||
      quiz.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      quiz.difficulty.toLowerCase().includes(searchLower) ||
      quiz.status.toLowerCase().includes(searchLower) ||
      (quiz.courseName && quiz.courseName.toLowerCase().includes(searchLower))
    );
    console.log(`🔍 Local search results: ${this.filteredQuizzes.length} quizzes found for "${this.searchTerm}"`);
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
      // Note: This only clears local storage, not the API data
      // In a real application, you would need a bulk delete API endpoint
      this.quizService.clearAllQuizzes();
      this.showToast('Local quiz cache cleared', 'warning');
      console.log('🗑️ All local quizzes cleared!');
    }
  }

  logStorageInfo() {
    const info = this.quizService.getStorageInfo();
    console.log('📊 Storage Info:', info);
    console.log('📋 All Quizzes:', this.sampleQuizzes);
  }

  // Test routing directly
  testRouting() {
    console.log('🧪 Testing routing directly...');
    this.router.navigate([{ outlets: { dialog: ['quizPreview', 1] } }], {
      queryParams: { mode: 'preview' }
    }).then(success => {
      console.log('🧪 Test routing result:', success);
    }).catch(error => {
      console.error('🧪 Test routing error:', error);
    });
  }



  // Removed createSampleQuiz - only using real API data

  openPopup() {
    this.router.navigate([{ outlets: { dialog: ['addQuiz'] } }]);
  }

  deleteQuiz(quizId: number, event: Event) {
    console.log('🗑️ deleteQuiz() called with ID:', quizId);
    event.stopPropagation();

    const quiz = this.sampleQuizzes.find(quiz => quiz.id === quizId);
    console.log('🔍 Found quiz for deletion:', quiz);

    if (!quiz) {
      console.error('❌ Quiz not found with ID:', quizId);
      this.showToast('Quiz not found', 'error');
      return;
    }

    this.quizToDelete = quiz;
    this.showDeleteDialog = true;
    console.log('✅ Delete dialog opened for quiz:', quiz.title);
  }

  confirmDelete() {
    console.log('🗑️ confirmDelete() called');

    if (!this.quizToDelete) {
      console.error('❌ No quiz selected for deletion');
      this.cancelDelete();
      return;
    }

    const quizTitle = this.quizToDelete.title;
    const quizId = this.quizToDelete.id;

    console.log(`🗑️ Attempting to delete quiz: "${quizTitle}" (ID: ${quizId})`);

    // Close dialog first to prevent multiple clicks
    this.cancelDelete();

    // Try API delete first
    this.quizService.deleteQuizFromAPI(quizId).subscribe({
      next: (response) => {
        console.log('🗑️ API delete response:', response);
        if (response.success) {
          this.showToast(`Quiz "${quizTitle}" has been deleted successfully.`, 'success');
          console.log('✅ Quiz deleted via API successfully');
        } else {
          this.showToast(`Failed to delete quiz: ${response.message}`, 'error');
          console.error('❌ API delete failed:', response);
        }
      },
      error: (error) => {
        console.error('❌ Error deleting quiz via API:', error);
        console.log('🔄 Falling back to local delete...');

        // Fallback to local delete
        const success = this.quizService.deleteQuiz(quizId);
        if (success) {
          this.showToast(`Quiz "${quizTitle}" deleted locally (API unavailable)`, 'warning');
          console.log('✅ Quiz deleted locally as fallback');
        } else {
          this.showToast('Failed to delete quiz', 'error');
          console.error('❌ Both API and local delete failed');
        }
      }
    });
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
    console.log('🔍 Preview quiz called with ID:', quizId);
    console.log('🔍 Current URL:', this.router.url);

    // Simple, direct navigation
    const navigationPromise = this.router.navigate([{ outlets: { dialog: ['quizPreview', quizId] } }], {
      queryParams: { mode: 'preview' }
    });

    navigationPromise.then(success => {
      console.log('🔍 Navigation success:', success);
      if (success) {
        console.log('✅ Quiz preview opened successfully');
      } else {
        console.error('❌ Navigation failed - route not found or blocked');
        this.showToast('Failed to open quiz preview', 'error');
      }
    }).catch(error => {
      console.error('❌ Navigation error:', error);
      this.showToast('Error opening quiz preview', 'error');
    });
  }

  // Start quiz
  startQuiz(quizId: number, event: Event) {
    event.stopPropagation();
    console.log('🚀 Start quiz called with ID:', quizId);

    // Simple, direct navigation to start mode
    this.router.navigate([{ outlets: { dialog: ['quizPreview', quizId] } }], {
      queryParams: { mode: 'start' }
    }).then(success => {
      console.log('🚀 Start quiz navigation success:', success);
      if (!success) {
        this.showToast('Failed to start quiz', 'error');
      }
    }).catch(error => {
      console.error('❌ Start quiz navigation error:', error);
      this.showToast('Error starting quiz', 'error');
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
