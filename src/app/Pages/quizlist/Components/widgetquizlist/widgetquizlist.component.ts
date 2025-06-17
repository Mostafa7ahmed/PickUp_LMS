import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { QuizService, Quiz } from '../../Core/services/quiz.service';
import { QuizApiService } from '../../Core/services/quiz-api.service';
import { Subscription, of, catchError } from 'rxjs';

interface QuizAnalytics {
  totalQuizzes: number;
  publishedQuizzes: number;
  draftQuizzes: number;
  scheduledQuizzes: number;
  totalQuestions: number;
  averageDuration: number;
  difficultyBreakdown: {
    easy: number;
    medium: number;
    hard: number;
  };
}

@Component({
  selector: 'app-widgetquizlist',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './widgetquizlist.component.html',
  styleUrls: ['./widgetquizlist.component.scss' ]
})
export class WidgetquizlistComponent implements OnInit, OnDestroy {
  @Input() showInfo = true;

  private quizService = inject(QuizService);
  private quizApiService = inject(QuizApiService);
  private quizSubscription?: Subscription;
  private apiSubscription?: Subscription;

  loading = true;
  error = false;
  errorMessage = '';

  analytics: QuizAnalytics = {
    totalQuizzes: 0,
    publishedQuizzes: 0,
    draftQuizzes: 0,
    scheduledQuizzes: 0,
    totalQuestions: 0,
    averageDuration: 0,
    difficultyBreakdown: {
      easy: 0,
      medium: 0,
      hard: 0
    }
  };

  ngOnInit() {
    // Get widget data from API
    this.loadWidgetData();

    // Keep the existing local storage data subscription for backup
    this.quizSubscription = this.quizService.getQuizzes().subscribe(quizzes => {
      if (!this.analytics.totalQuizzes) {
        this.calculateAnalyticsFromLocalData(quizzes);
      }
    });
  }

  ngOnDestroy() {
    if (this.quizSubscription) {
      this.quizSubscription.unsubscribe();
    }
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
  }

  loadWidgetData() {
    this.loading = true;
    this.error = false;

    this.apiSubscription = this.quizApiService.getQuizWidget()
      .pipe(
        catchError(error => {
          console.error('❌ Error loading quiz widget data:', error);
          this.error = true;
          this.errorMessage = error.message || 'Failed to load quiz statistics';
          this.loading = false;
          return of(null);
        })
      )
      .subscribe(response => {
        this.loading = false;

        if (response && response.success && response.result) {
          this.updateAnalyticsFromApiData(response.result);
        } else if (!this.error) {
          this.error = true;
          this.errorMessage = response?.message || 'Failed to load quiz statistics';
        }
      });
  }

  private updateAnalyticsFromApiData(apiData: any) {
    this.analytics.totalQuizzes = apiData.totalQuizzes || 0;
    this.analytics.totalQuestions = apiData.totalQuestions || 0;

    // Format average duration to 2 decimal places
    this.analytics.averageDuration = Number((apiData.avgDuration || 0).toFixed(2));

    // Update difficulty breakdown
    this.analytics.difficultyBreakdown = {
      easy: apiData.easyCount || 0,
      medium: apiData.mediumCount || 0,
      hard: apiData.hardCount || 0
    };

    // For the status breakdown, we'll use estimated values based on total quizzes
    // since the API doesn't provide this data yet
    const totalQuizzes = this.analytics.totalQuizzes;
    this.analytics.publishedQuizzes = Math.round(totalQuizzes * 0.7); // Estimate 70% published
    this.analytics.draftQuizzes = Math.round(totalQuizzes * 0.2); // Estimate 20% draft
    this.analytics.scheduledQuizzes = totalQuizzes - this.analytics.publishedQuizzes - this.analytics.draftQuizzes;

    console.log('📊 Quiz Analytics Updated from API:', this.analytics);
  }

  private calculateAnalyticsFromLocalData(quizzes: Quiz[]): void {
    if (quizzes.length === 0) {
      this.resetAnalytics();
      return;
    }

    this.analytics.totalQuizzes = quizzes.length;
    this.analytics.publishedQuizzes = quizzes.filter(q => q.status === 'published').length;
    this.analytics.draftQuizzes = quizzes.filter(q => q.status === 'draft').length;
    this.analytics.scheduledQuizzes = quizzes.filter(q => q.status === 'scheduled').length;

    this.analytics.totalQuestions = quizzes.reduce((sum, quiz) => sum + quiz.questionsCount, 0);

    // Format average duration to 2 decimal places
    const totalDuration = quizzes.reduce((sum, quiz) => sum + quiz.duration, 0);
    this.analytics.averageDuration = Number((totalDuration / quizzes.length).toFixed(2));
    this.analytics.difficultyBreakdown = {
      easy: quizzes.filter(q => q.difficulty === 'easy').length,
      medium: quizzes.filter(q => q.difficulty === 'medium').length,
      hard: quizzes.filter(q => q.difficulty === 'hard').length
    };

    console.log('📊 Quiz Analytics Updated from local data:', this.analytics);
  }

  private resetAnalytics(): void {
    this.analytics = {
      totalQuizzes: 0,
      publishedQuizzes: 0,
      draftQuizzes: 0,
      scheduledQuizzes: 0,
      totalQuestions: 0,
      averageDuration: 0,
      difficultyBreakdown: {
        easy: 0,
        medium: 0,
        hard: 0
      }
    };
  }

  // Format average duration as a string with 2 decimal places
  getFormattedAverageDuration(): string {
    return this.analytics.averageDuration.toFixed(2) + 'min';
  }

  getDifficultyPercentage(difficulty: 'easy' | 'medium' | 'hard'): number {
    if (this.analytics.totalQuizzes === 0) return 0;
    return Math.round((this.analytics.difficultyBreakdown[difficulty] / this.analytics.totalQuizzes) * 100);
  }

  getAverageQuestionsPerQuiz(): number {
    if (this.analytics.totalQuizzes === 0) return 0;
    return Math.round(this.analytics.totalQuestions / this.analytics.totalQuizzes);
  }

  getCompletionRate(): number {
    if (this.analytics.totalQuizzes === 0) return 0;
    return Math.round((this.analytics.publishedQuizzes / this.analytics.totalQuizzes) * 100);
  }

  getMostCommonDifficulty(): string {
    const { easy, medium, hard } = this.analytics.difficultyBreakdown;
    if (easy >= medium && easy >= hard) return 'Easy';
    if (medium >= hard) return 'Medium';
    return 'Hard';
  }

  getQuizHealthScore(): number {
    if (this.analytics.totalQuizzes === 0) return 0;
    const publishedRatio = this.analytics.publishedQuizzes / this.analytics.totalQuizzes;
    const questionsRatio = Math.min(this.analytics.totalQuestions / (this.analytics.totalQuizzes * 10), 1);
    return Math.round((publishedRatio * 0.6 + questionsRatio * 0.4) * 100);
  }

  // Add a retry function for error state
  retryLoading() {
    this.loadWidgetData();
  }
}
