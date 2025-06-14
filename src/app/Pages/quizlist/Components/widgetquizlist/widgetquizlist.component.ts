import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { QuizService, Quiz } from '../../Core/services/quiz.service';
import { Subscription } from 'rxjs';

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
  @Input() showInfo = false;

  private quizService = inject(QuizService);
  private quizSubscription?: Subscription;

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
    this.quizSubscription = this.quizService.getQuizzes().subscribe(quizzes => {
      this.calculateAnalytics(quizzes);
    });
  }

  ngOnDestroy() {
    if (this.quizSubscription) {
      this.quizSubscription.unsubscribe();
    }
  }

  private calculateAnalytics(quizzes: Quiz[]): void {
    if (quizzes.length === 0) {
      this.resetAnalytics();
      return;
    }

    this.analytics.totalQuizzes = quizzes.length;
    this.analytics.publishedQuizzes = quizzes.filter(q => q.status === 'published').length;
    this.analytics.draftQuizzes = quizzes.filter(q => q.status === 'draft').length;
    this.analytics.scheduledQuizzes = quizzes.filter(q => q.status === 'scheduled').length;

    this.analytics.totalQuestions = quizzes.reduce((sum, quiz) => sum + quiz.questionsCount, 0);

    this.analytics.averageDuration = Math.round(
      quizzes.reduce((sum, quiz) => sum + quiz.duration, 0) / quizzes.length
    );

    this.analytics.difficultyBreakdown = {
      easy: quizzes.filter(q => q.difficulty === 'easy').length,
      medium: quizzes.filter(q => q.difficulty === 'medium').length,
      hard: quizzes.filter(q => q.difficulty === 'hard').length
    };



    console.log('📊 Quiz Analytics Updated:', this.analytics);
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
}
