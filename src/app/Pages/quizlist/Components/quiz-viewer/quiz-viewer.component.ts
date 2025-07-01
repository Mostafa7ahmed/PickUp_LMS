import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { QuizDisplayService, QuizDisplayData, SectionDisplay, QuestionDisplay } from '../../Core/services/quiz-display.service';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";

@Component({
  selector: 'app-quiz-viewer',
  standalone: true,
  imports: [CommonModule, TopPopComponent],
  templateUrl: './quiz-viewer.component.html',
  styleUrl: './quiz-viewer.component.scss'
})
export class QuizViewerComponent implements OnInit, OnDestroy {
  @Input() quizId: number = 0;
  @Input() showAsPopup: boolean = false;

  private quizDisplayService = inject(QuizDisplayService);
  private subscription?: Subscription;

  quizData: QuizDisplayData | null = null;
  isLoading: boolean = false;
  error: string = '';

  ngOnInit(): void {
    if (this.quizId > 0) {
      this.loadQuiz();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadQuiz(): void {
    this.isLoading = true;
    this.error = '';
    
    this.subscription = this.quizDisplayService.getQuizForDisplay(this.quizId).subscribe({
      next: (data) => {
        this.quizData = data;
        this.isLoading = false;
        console.log('📋 Quiz data loaded for display:', data);
      },
      error: (error) => {
        this.error = 'Failed to load quiz data';
        this.isLoading = false;
        console.error('❌ Error loading quiz:', error);
      }
    });
  }

  closePopup(): void {
    // Emit close event or handle popup close
    console.log('Closing quiz viewer');
  }

  getSectionTypeClass(sectionType: string): string {
    switch (sectionType) {
      case 'Multiple Choice':
        return 'section-multiple-choice';
      case 'True/False':
        return 'section-true-false';
      case 'Short Answer':
        return 'section-short-answer';
      default:
        return 'section-default';
    }
  }

  getDifficultyClass(difficulty: string): string {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'difficulty-easy';
      case 'medium':
        return 'difficulty-medium';
      case 'hard':
        return 'difficulty-hard';
      default:
        return 'difficulty-medium';
    }
  }

  getQuestionTypeIcon(type: string): string {
    switch (type) {
      case 'multiple-choice':
        return 'fas fa-list';
      case 'true-false':
        return 'fas fa-check-circle';
      case 'short-answer':
        return 'fas fa-edit';
      default:
        return 'fas fa-question';
    }
  }

  formatCorrectAnswer(question: QuestionDisplay): string {
    if (question.type === 'multiple-choice' && typeof question.correctAnswer === 'string') {
      return question.correctAnswer;
    }
    if (question.type === 'true-false' && typeof question.correctAnswer === 'boolean') {
      return question.correctAnswer ? 'True' : 'False';
    }
    if (question.type === 'short-answer' && question.correctAnswer) {
      return question.correctAnswer.toString();
    }
    return 'Not specified';
  }

  isValidQuizData(): boolean {
    return this.quizData !== null && this.quizData.id > 0;
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index); // A, B, C, D, etc.
  }
} 