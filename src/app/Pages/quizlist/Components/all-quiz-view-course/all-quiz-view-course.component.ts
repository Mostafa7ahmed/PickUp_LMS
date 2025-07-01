import { Component, inject, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { IQuiz } from '../../Core/Interface/iquiz';
import { GetallQuizbyCourseService } from '../../Core/services/getall-quizby-course.service';
import { QuizRefreshService } from '../../Core/services/quiz-refresh.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-quiz-view-course',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-quiz-view-course.component.html',
  styleUrl: './all-quiz-view-course.component.scss'
})
export class AllQuizViewCourseComponent implements OnInit, OnDestroy, OnChanges {

  @Input() courseId: number = 0;
  quizData: IPaginationResponse<IQuiz> = {} as IPaginationResponse<IQuiz>;
  private quizService = inject(GetallQuizbyCourseService);
  private quizRefreshService = inject(QuizRefreshService);
  private router = inject(Router);
  private quizSubscription?: Subscription;
  private refreshSubscription?: Subscription;
  isLoading: boolean = false;

  ngOnInit(): void {
    if (this.courseId) {
      this.loadQuizzes();
    }
    
    // Subscribe to quiz refresh notifications
    this.refreshSubscription = this.quizRefreshService.quizRefresh$.subscribe({
      next: (notification) => {
        console.log('🔄 Received quiz refresh notification:', notification);
        
        // Refresh if it's for this course or a general refresh
        if (!notification.courseId || notification.courseId === this.courseId || notification.action === 'refresh') {
          console.log('🔄 Refreshing quiz data for course:', this.courseId);
          this.loadQuizzes();
        }
      },
      error: (error) => {
        console.error('❌ Error in refresh subscription:', error);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseId'] && !changes['courseId'].firstChange && this.courseId) {
      this.loadQuizzes();
    }
  }

  ngOnDestroy(): void {
    this.quizSubscription?.unsubscribe();
    this.refreshSubscription?.unsubscribe();
  }

  loadQuizzes(): void {
    this.isLoading = true;
    this.quizSubscription = this.quizService.getQuizByCourse(this.courseId).subscribe({
      next: (response) => {
        this.quizData = response;
        this.isLoading = false;
        console.log('Quiz data loaded:', response);
      },
      error: (error) => {
        console.error('Error loading quizzes:', error);
        this.isLoading = false;
      }
    });
  }

  getDifficultyClass(difficulty: number): string {
    return `difficulty-${difficulty}`;
  }

  getDifficultyText(difficulty: number): string {
    switch (difficulty) {
      case 0: return 'Easy';
      case 1: return 'Medium';
      case 2: return 'Hard';
      default: return 'Unknown';
    }
  }

  getTotalQuestions(): number {
    if (!this.quizData.result) return 0;
    return this.quizData.result.reduce((total, quiz) => total + quiz.questionsCount, 0);
  }

  getTotalDuration(): number {
    if (!this.quizData.result) return 0;
    return this.quizData.result.reduce((total, quiz) => total + quiz.duration, 0);
  }

  previewQuiz(quiz: IQuiz): void {
    // Use creatorId as the quiz identifier since IQuiz doesn't have id property
    this.router.navigate([{ outlets: { dialog: ['quizPreview', quiz.creatorId] } }]);
  }

  startQuiz(quiz: IQuiz): void {
    // Navigate to quiz preview in start mode
    this.router.navigate([{ outlets: { dialog: ['quizPreview', quiz.creatorId] } }], {
      queryParams: { mode: 'start' }
    });
  }

  createQuiz(): void {
    this.router.navigate([{ outlets: { dialog: ['addQuiz'] } }]);
  }
}
