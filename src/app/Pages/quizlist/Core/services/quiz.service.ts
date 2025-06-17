// This file will be replaced with new quiz service implementation

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { QuizApiService } from './quiz-api.service';
import {
  ICreateQuizRequest,
  ICreateQuizResponse,
  ICreateQuestionRequest,
  ICreateQuestionResponse,
  IBulkCreateQuestionsRequest,
  IBulkCreateQuestionsResponse,
  QuizDifficulty,
  QuizDurationType,
  Quiz,
  QuizQuestion,
  IQuizPaginationRequest,
  IQuizPaginationResponse,
  IQuizDetails,
  IGetQuizResponse,
  IQuizWidgetResponse,
  IDeleteQuizResponse
} from '../interfaces/iquiz-api';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizzesSubject = new BehaviorSubject<Quiz[]>([]);
  public quizzes$ = this.quizzesSubject.asObservable();

  constructor(private quizApiService: QuizApiService) {
    // Initialize with empty array
    this.quizzesSubject.next([]);
  }

  /**
   * Get all quizzes
   */
  getQuizzes(): Observable<Quiz[]> {
    return this.quizzes$;
  }

  /**
   * Get current quizzes array
   */
  getCurrentQuizzes(): Quiz[] {
    return this.quizzesSubject.value;
  }

  /**
   * Get quiz by id
   */
  getQuizById(id: number): Quiz | undefined {
    return this.getCurrentQuizzes().find(q => q.id === id);
  }

  /**
   * Create a new quiz
   */
  createQuiz(
    courseId: number,
    lessonIds: number[],
    name: string,
    description: string,
    limited: boolean,
    duration: number,
    durationType: QuizDurationType,
    difficulty: QuizDifficulty
  ): Observable<ICreateQuizResponse> {
    const request: ICreateQuizRequest = {
      courseId,
      lessonIds,
      name,
      description,
      limited,
      quizDuration: {
        duration,
        type: durationType
      },
      difficulty
    };

    return this.quizApiService.createQuiz(request);
  }

  /**
   * Create a single question
   */
  createQuestion(question: ICreateQuestionRequest): Observable<ICreateQuestionResponse> {
    return this.quizApiService.createQuestion(question);
  }

  /**
   * Create multiple questions in bulk
   */
  createQuestionsBulk(questions: ICreateQuestionRequest[]): Observable<IBulkCreateQuestionsResponse> {
    const request: IBulkCreateQuestionsRequest = { questions };
    return this.quizApiService.createQuestionsBulk(request);
  }

  /**
   * Search quizzes
   */
  searchQuizzes(searchTerm: string): Quiz[] {
    const currentQuizzes = this.getCurrentQuizzes();
    if (!searchTerm.trim()) {
      return currentQuizzes;
    }
    
    const term = searchTerm.toLowerCase();
    return currentQuizzes.filter(quiz => 
      quiz.title.toLowerCase().includes(term) ||
      quiz.description.toLowerCase().includes(term) ||
      quiz.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }

  /**
   * Filter by status
   */
  filterByStatus(status: string): Quiz[] {
    if (!status || status === 'all') {
      return this.getCurrentQuizzes();
    }
    return this.getCurrentQuizzes().filter(quiz => quiz.status === status);
  }

  /**
   * Filter by difficulty
   */
  filterByDifficulty(difficulty: string): Quiz[] {
    if (!difficulty || difficulty === 'all') {
      return this.getCurrentQuizzes();
    }
    return this.getCurrentQuizzes().filter(quiz => quiz.difficulty === difficulty);
  }

  /**
   * Add a quiz with questions (for testing/demo purposes)
   */
  addQuizWithQuestions(quizData: Partial<Quiz>, questions: QuizQuestion[]): Quiz {
    const currentQuizzes = this.getCurrentQuizzes();
    const newId = currentQuizzes.length > 0 ? Math.max(...currentQuizzes.map(q => q.id)) + 1 : 1;

    const newQuiz: Quiz = {
      id: newId,
      title: quizData.title || 'Untitled Quiz',
      description: quizData.description || '',
      questionsCount: questions.length,
      duration: quizData.duration || 30,
      attempts: quizData.attempts || 0,
      status: quizData.status || 'draft',
      difficulty: quizData.difficulty || 'medium',
      tags: quizData.tags || [],
      createdDate: quizData.createdDate || new Date().toLocaleDateString(),
      courseId: quizData.courseId,
      courseName: quizData.courseName,
      lessonId: quizData.lessonId,
      lessonName: quizData.lessonName,
      questions: questions
    };

    const updatedQuizzes = [...currentQuizzes, newQuiz];
    this.quizzesSubject.next(updatedQuizzes);

    return newQuiz;
  }

  /**
   * Delete a quiz by ID (local only - for backward compatibility)
   */
  deleteQuiz(id: number): boolean {
    const currentQuizzes = this.getCurrentQuizzes();
    const filteredQuizzes = currentQuizzes.filter(quiz => quiz.id !== id);

    if (filteredQuizzes.length < currentQuizzes.length) {
      this.quizzesSubject.next(filteredQuizzes);
      return true;
    }

    return false;
  }

  /**
   * Delete a quiz by ID using API
   */
  deleteQuizFromAPI(id: number): Observable<IDeleteQuizResponse> {
    console.log('🗑️ QuizService.deleteQuizFromAPI() called with ID:', id);

    return this.quizApiService.deleteQuiz(id).pipe(
      tap(response => {
        console.log('🗑️ QuizService received API response:', response);
        if (response.success) {
          // Remove from local state after successful API deletion
          const currentQuizzes = this.getCurrentQuizzes();
          const filteredQuizzes = currentQuizzes.filter(quiz => quiz.id !== id);
          this.quizzesSubject.next(filteredQuizzes);
          console.log('✅ Quiz removed from local state after API deletion');
          console.log('📊 Updated quiz count:', filteredQuizzes.length);
        } else {
          console.warn('⚠️ API deletion was not successful:', response.message);
        }
      }),
      catchError(error => {
        console.error('❌ QuizService.deleteQuizFromAPI() error:', error);
        throw error;
      })
    );
  }

  /**
   * Clear all quizzes
   */
  clearAllQuizzes(): void {
    this.quizzesSubject.next([]);
  }

  /**
   * Get storage information
   */
  getStorageInfo(): { count: number; size: string } {
    const quizzes = this.getCurrentQuizzes();
    const sizeInBytes = JSON.stringify(quizzes).length;
    const sizeInKB = (sizeInBytes / 1024).toFixed(2);

    return {
      count: quizzes.length,
      size: `${sizeInKB} KB`
    };
  }

  // ===== NEW API INTEGRATION METHODS =====

  /**
   * Load quizzes from API and update local state
   */
  loadQuizzesFromAPI(params: IQuizPaginationRequest = {}): Observable<IQuizPaginationResponse> {
    return this.quizApiService.getPaginatedQuizzes(params).pipe(
      tap(response => {
        if (response.success && response.result) {
          // Convert API quiz details to local Quiz format
          const quizzes = this.convertApiQuizzesToLocal(response.result);
          this.quizzesSubject.next(quizzes);
        }
      })
    );
  }

  /**
   * Get quiz by ID from API
   */
  getQuizByIdFromAPI(id: number): Observable<IGetQuizResponse> {
    return this.quizApiService.getQuiz(id);
  }

  /**
   * Get quiz widget data from API
   */
  getQuizWidgetFromAPI(): Observable<IQuizWidgetResponse> {
    return this.quizApiService.getQuizWidget();
  }

  /**
   * Load quizzes for a specific course
   */
  loadQuizzesForCourse(courseId: number): Observable<IQuizPaginationResponse> {
    return this.quizApiService.getQuizzesForCourse(courseId).pipe(
      tap(response => {
        if (response.success && response.result) {
          const quizzes = this.convertApiQuizzesToLocal(response.result);
          this.quizzesSubject.next(quizzes);
        }
      })
    );
  }

  /**
   * Search quizzes using API
   */
  searchQuizzesFromAPI(searchTerm: string, courseId?: number): Observable<IQuizPaginationResponse> {
    return this.quizApiService.searchQuizzes(searchTerm, courseId).pipe(
      tap(response => {
        if (response.success && response.result) {
          const quizzes = this.convertApiQuizzesToLocal(response.result);
          this.quizzesSubject.next(quizzes);
        }
      })
    );
  }

  /**
   * Convert API quiz details to local Quiz format
   */
  private convertApiQuizzesToLocal(apiQuizzes: IQuizDetails[]): Quiz[] {
    return apiQuizzes.map(apiQuiz => ({
      id: apiQuiz.id,
      title: apiQuiz.name,
      description: apiQuiz.description,
      questionsCount: apiQuiz.questionsCount,
      duration: apiQuiz.duration,
      attempts: apiQuiz.submissions,
      status: 'published', // API doesn't provide status, assume published
      difficulty: this.getDifficultyString(apiQuiz.difficulty),
      tags: apiQuiz.lessonsNames || [],
      createdDate: new Date(apiQuiz.createdOn).toLocaleDateString(),
      courseId: apiQuiz.courseId,
      courseName: apiQuiz.courseName,
      lessonId: undefined, // API doesn't provide single lesson ID
      lessonName: apiQuiz.lessonsNames?.join(', '),
      questions: [] // Questions would need to be loaded separately
    }));
  }

  /**
   * Convert difficulty enum to string
   */
  private getDifficultyString(difficulty: QuizDifficulty): 'easy' | 'medium' | 'hard' {
    switch (difficulty) {
      case QuizDifficulty.Easy: return 'easy';
      case QuizDifficulty.Hard: return 'hard';
      case QuizDifficulty.Medium:
      default: return 'medium';
    }
  }

  /**
   * Refresh quizzes from API
   */
  refreshQuizzes(courseId?: number): Observable<IQuizPaginationResponse> {
    const params: IQuizPaginationRequest = {
      pageNumber: 1,
      pageSize: 100,
      orderBeforPagination: true,
      orderDirection: 0
    };

    if (courseId) {
      params.courseId = courseId;
    }

    return this.loadQuizzesFromAPI(params);
  }
}
