import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ListCourse } from '../../../Courses/Core/interface/icourses';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cardqiuz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cardqiuz.component.html',
  styleUrl: './cardqiuz.component.scss'
})
export class CardqiuzComponent {

  private router = inject(Router);

  // Search and filter properties
  searchTerm = '';

  // Delete confirmation dialog
  showDeleteDialog = false;
  quizToDelete: any = null;

  // Sample quiz data
  sampleQuizzes = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics including variables, functions, and DOM manipulation.',
      questionsCount: 25,
      duration: 30,
      attempts: 156,
      status: 'published',
      difficulty: 'easy',
      tags: ['JavaScript', 'Programming', 'Web Dev'],
      createdDate: 'Jan 15, 2024'
    },
    {
      id: 2,
      title: 'React Advanced Concepts',
      description: 'Advanced React concepts including hooks, context, and performance optimization techniques.',
      questionsCount: 40,
      duration: 45,
      attempts: 89,
      status: 'draft',
      difficulty: 'hard',
      tags: ['React', 'Frontend', 'Advanced'],
      createdDate: 'Jan 20, 2024'
    },
    {
      id: 3,
      title: 'CSS Grid & Flexbox',
      description: 'Master modern CSS layout techniques with Grid and Flexbox for responsive design.',
      questionsCount: 18,
      duration: 25,
      attempts: 234,
      status: 'published',
      difficulty: 'medium',
      tags: ['CSS', 'Layout', 'Design'],
      createdDate: 'Jan 10, 2024'
    },
    {
      id: 4,
      title: 'Node.js Backend Development',
      description: 'Learn server-side development with Node.js, Express, and database integration.',
      questionsCount: 35,
      duration: 50,
      attempts: 67,
      status: 'scheduled',
      difficulty: 'hard',
      tags: ['Node.js', 'Backend', 'API'],
      createdDate: 'Jan 25, 2024'
    },
    {
      id: 5,
      title: 'HTML5 & Semantic Web',
      description: 'Understanding HTML5 features, semantic elements, and accessibility best practices.',
      questionsCount: 20,
      duration: 20,
      attempts: 312,
      status: 'published',
      difficulty: 'easy',
      tags: ['HTML', 'Semantic', 'Accessibility'],
      createdDate: 'Jan 5, 2024'
    },
    {
      id: 6,
      title: 'TypeScript Deep Dive',
      description: 'Advanced TypeScript features including generics, decorators, and type manipulation.',
      questionsCount: 30,
      duration: 40,
      attempts: 45,
      status: 'draft',
      difficulty: 'hard',
      tags: ['TypeScript', 'Advanced', 'Types'],
      createdDate: 'Jan 30, 2024'
    }
  ];

  openPopup() {
    this.router.navigate([{ outlets: { dialog: ['addQuiz'] } }]);
  }

  deleteQuiz(quizId: number, event: Event) {
    event.stopPropagation(); 

    this.quizToDelete = this.sampleQuizzes.find(quiz => quiz.id === quizId);
    this.showDeleteDialog = true;
  }

  confirmDelete() {
    if (this.quizToDelete) {
      this.sampleQuizzes = this.sampleQuizzes.filter(quiz => quiz.id !== this.quizToDelete.id);

      this.showSuccessMessage(`Quiz "${this.quizToDelete.title}" has been deleted successfully.`);


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
  duplicateQuiz(quiz: any, event: Event) {
    event.stopPropagation();

    const duplicatedQuiz = {
      ...quiz,
      id: Math.max(...this.sampleQuizzes.map(q => q.id)) + 1,
      title: `${quiz.title} (Copy)`,
      status: 'draft',
      attempts: 0,
      createdDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    };

    this.sampleQuizzes.unshift(duplicatedQuiz);
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
