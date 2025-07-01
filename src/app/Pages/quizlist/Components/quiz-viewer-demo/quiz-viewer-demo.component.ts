import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizViewerComponent } from '../quiz-viewer/quiz-viewer.component';

@Component({
  selector: 'app-quiz-viewer-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, QuizViewerComponent],
  template: `
    <div class="quiz-viewer-demo">
      <div class="demo-header">
        <h2>Quiz Viewer Demo</h2>
        <p>Enter a quiz ID to view its details and questions</p>
        
        <div class="quiz-input-section">
          <label for="quizId">Quiz ID:</label>
          <input 
            id="quizId" 
            type="number" 
            [(ngModel)]="selectedQuizId" 
            placeholder="Enter quiz ID (e.g. 101)"
            class="quiz-id-input">
          <button 
            (click)="loadQuiz()" 
            [disabled]="!selectedQuizId || selectedQuizId <= 0"
            class="load-btn">
            <i class="fas fa-search"></i>
            Load Quiz
          </button>
        </div>
        
        <div class="example-note">
          <p><strong>Example:</strong> Try quiz ID <code>101</code> to see the demo quiz with questions</p>
        </div>
      </div>

      <!-- Quiz Viewer Component -->
      <div class="viewer-container" *ngIf="currentQuizId > 0">
        <app-quiz-viewer [quizId]="currentQuizId" [showAsPopup]="false"></app-quiz-viewer>
      </div>

      <!-- Initial State -->
      <div class="initial-state" *ngIf="currentQuizId <= 0">
        <div class="initial-content">
          <i class="fas fa-clipboard-list"></i>
          <h3>Ready to View Quiz</h3>
          <p>Enter a quiz ID above to load and display the quiz details</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .quiz-viewer-demo {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .demo-header {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;

      h2 {
        margin: 0 0 0.5rem;
        color: #1f2937;
        font-size: 1.75rem;
      }

      p {
        margin: 0 0 1.5rem;
        color: #6b7280;
      }
    }

    .quiz-input-section {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;

      label {
        font-weight: 600;
        color: #374151;
        min-width: 80px;
      }

      .quiz-id-input {
        padding: 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 1rem;
        min-width: 200px;
        transition: border-color 0.2s;

        &:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      }

      .load-btn {
        background: #3b82f6;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        transition: background-color 0.2s;

        &:hover:not(:disabled) {
          background: #2563eb;
        }

        &:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        i {
          font-size: 0.9rem;
        }
      }
    }

    .example-note {
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 8px;
      padding: 1rem;

      p {
        margin: 0;
        color: #0369a1;
        font-size: 0.9rem;
      }

      code {
        background: #1e40af;
        color: white;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-weight: 600;
      }
    }

    .viewer-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .initial-state {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 4rem 2rem;
      text-align: center;

      .initial-content {
        color: #6b7280;

        i {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          opacity: 0.3;
        }

        h3 {
          margin: 0 0 0.5rem;
          color: #374151;
          font-size: 1.5rem;
        }

        p {
          margin: 0;
          font-size: 1.1rem;
        }
      }
    }

    @media (max-width: 768px) {
      .quiz-viewer-demo {
        padding: 1rem;
      }

      .demo-header {
        padding: 1.5rem;
      }

      .quiz-input-section {
        flex-direction: column;
        align-items: stretch;

        .quiz-id-input {
          min-width: auto;
        }

        .load-btn {
          justify-content: center;
        }
      }
    }
  `]
})
export class QuizViewerDemoComponent implements OnInit {
  selectedQuizId: number = 101; // Default to the example quiz ID
  currentQuizId: number = 0;

  ngOnInit(): void {
    // Auto-load the example quiz on component init
    this.loadQuiz();
  }

  loadQuiz(): void {
    if (this.selectedQuizId && this.selectedQuizId > 0) {
      this.currentQuizId = this.selectedQuizId;
      console.log('🔍 Loading quiz with ID:', this.currentQuizId);
    }
  }
} 