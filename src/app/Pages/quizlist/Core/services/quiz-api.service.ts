// This file will be replaced with new quiz API service implementation

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../Environments/environment';
import {
  ICreateQuizRequest,
  ICreateQuizResponse,
  ICreateQuestionRequest,
  ICreateQuestionResponse,
  IBulkCreateQuestionsRequest,
  IBulkCreateQuestionsResponse,
  IQuizCreationProgress,
  ICompleteQuizCreationRequest,
  ICreateQuizSectionRequest,
  ICreateQuizSectionResponse,
  QuizSectionType,
  IGetQuizResponse,
  IQuizPaginationRequest,
  IQuizPaginationResponse,
  IQuizWidgetResponse,
  IDeleteQuizResponse
} from '../interfaces/iquiz-api';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizApiService {
  private baseUrl = environment.baseUrl + environment.pickup;

  // API Endpoints
  private createQuizUrl = `${this.baseUrl}quiz/create`;
  private createQuizSectionUrl = `${this.baseUrl}quiz-section/create`;
  private createQuestionUrl = `${this.baseUrl}question/create`;
  private bulkCreateQuestionsUrl = `${this.baseUrl}question/bulk`;
  private getQuizUrl = `${this.baseUrl}quiz/get`;
  private paginateQuizzesUrl = `${this.baseUrl}quiz/paginate`;
  private quizWidgetUrl = `${this.baseUrl}quiz/widget`;
  private deleteQuizUrl = `${this.baseUrl}quiz/delete`;

  // Progress tracking
  private progressSubject = new BehaviorSubject<IQuizCreationProgress>({ step: 'quiz' });
  public progress$ = this.progressSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Create a new quiz
   */
  createQuiz(request: ICreateQuizRequest): Observable<ICreateQuizResponse> {
    console.log('📝 Creating quiz:', request);
    this.updateProgress({ step: 'quiz' });

    return this.http.post<ICreateQuizResponse>(this.createQuizUrl, request).pipe(
      tap(response => {
        console.log('📝 Quiz creation response:', response);
        if (response.success && response.result) {
          this.updateProgress({
            step: 'questions',
            quizId: response.result.id,
            totalQuestions: 0
          });
        }
      }),
      catchError(error => {
        console.error('❌ Error creating quiz:', error);
        this.updateProgress({
          step: 'quiz',
          error: error.message || 'Quiz creation failed'
        });
        throw error;
      })
    );
  }

  /**
   * Create a quiz section
   */
  createQuizSection(request: ICreateQuizSectionRequest): Observable<ICreateQuizSectionResponse> {
    console.log('📂 Creating quiz section:', request);
    this.updateProgress({ step: 'section' });

    return this.http.post<ICreateQuizSectionResponse>(this.createQuizSectionUrl, request).pipe(
      tap(response => {
        console.log('📂 Quiz section creation response:', response);
        if (response.success && response.result) {
          this.updateProgress({
            step: 'questions',
            sectionId: response.result.id,
            totalQuestions: 0
          });
        }
      }),
      catchError(error => {
        console.error('❌ Error creating quiz section:', error);
        this.updateProgress({
          step: 'section',
          error: error.message || 'Quiz section creation failed'
        });
        throw error;
      })
    );
  }

  /**
   * Create a single question
   */
  createQuestion(request: ICreateQuestionRequest): Observable<ICreateQuestionResponse> {
    console.log('❓ Creating single question:', request);
    return this.http.post<ICreateQuestionResponse>(this.createQuestionUrl, request).pipe(
      tap(response => {
        console.log('❓ Question creation response:', response);
        const currentProgress = this.progressSubject.value;
        if (currentProgress.completedQuestions !== undefined && currentProgress.totalQuestions !== undefined) {
          this.updateProgress({
            completedQuestions: currentProgress.completedQuestions + 1
          });
        }
      }),
      catchError(error => {
        console.error('❌ Error creating question:', error);
        throw error;
      })
    );
  }

  /**
   * Create multiple questions in bulk
   */
  createQuestionsBulk(request: IBulkCreateQuestionsRequest): Observable<IBulkCreateQuestionsResponse> {
    console.log('❓ Creating questions in bulk:', request);
    this.updateProgress({
      step: 'questions',
      totalQuestions: request.questions.length,
      completedQuestions: 0
    });

    return this.http.post<IBulkCreateQuestionsResponse>(this.bulkCreateQuestionsUrl, request).pipe(
      tap(response => {
        console.log('❓ Bulk questions creation response:', response);
        this.updateProgress({ step: 'completed' });
      }),
      catchError(error => {
        console.error('❌ Error creating questions in bulk:', error);
        this.updateProgress({
          step: 'questions',
          error: error.message || 'Questions creation failed'
        });
        throw error;
      })
    );
  }

  /**
   * Reset progress tracking
   */
  resetProgress(): void {
    this.progressSubject.next({ step: 'quiz' });
  }

  /**
   * Update progress tracking
   */
  private updateProgress(progress: Partial<IQuizCreationProgress>): void {
    const currentProgress = this.progressSubject.value;
    this.progressSubject.next({ ...currentProgress, ...progress });
  }

  /**
   * Create multiple quiz sections (for the 3 types)
   */
  createQuizSections(quizId: number, quizName: string): Observable<ICreateQuizSectionResponse[]> {
    const sections: ICreateQuizSectionRequest[] = [
      {
        quizId: quizId,
        name: `${quizName} - Introduction`,
        description: 'Introductory questions to warm up',
        order: 1,
        type: QuizSectionType.Introduction
      },
      {
        quizId: quizId,
        name: `${quizName} - Main Content`,
        description: 'Main quiz content and questions',
        order: 2,
        type: QuizSectionType.Main
      },
      {
        quizId: quizId,
        name: `${quizName} - Assessment`,
        description: 'Final assessment and evaluation',
        order: 3,
        type: QuizSectionType.Assessment
      }
    ];

    // Create all sections sequentially
    const sectionObservables = sections.map(section => this.createQuizSection(section));

    // You can use forkJoin to create all sections in parallel
    // or use concat to create them sequentially
    return new Observable(observer => {
      const results: ICreateQuizSectionResponse[] = [];
      let currentIndex = 0;

      const createNext = () => {
        if (currentIndex >= sectionObservables.length) {
          observer.next(results);
          observer.complete();
          return;
        }

        sectionObservables[currentIndex].subscribe({
          next: (response) => {
            results.push(response);
            currentIndex++;
            createNext();
          },
          error: (error) => observer.error(error)
        });
      };

      createNext();
    });
  }

  /**
   * Convert form questions to API format
   */
  convertFormQuestionsToApiFormat(questions: any[], courseId: number): ICreateQuestionRequest[] {
    return questions.map((question, index) => {
      const apiQuestion: ICreateQuestionRequest = {
        courseId: courseId,
        quizId: 0, // Will be set when quiz is created
        quizSectionId: 0, // Will be set when section is created
        order: question.order || index + 1,
        hint: question.hint || '',
        text: question.text
      };

      // Add question type specific data
      if (question.trueAndFalse) {
        apiQuestion.trueAndFalse = question.trueAndFalse;
      }

      if (question.shortAnswer) {
        apiQuestion.shortAnswer = question.shortAnswer;
      }

      if (question.multipleChoise) {
        apiQuestion.multipleChoise = question.multipleChoise;
      }

      return apiQuestion;
    });
  }

  /**
   * Create complete quiz with questions using the proper 3-step API workflow
   */
  createCompleteQuiz(request: ICompleteQuizCreationRequest): Observable<any> {
    console.log('🚀 Creating complete quiz with 3-step workflow:', request);

    // Step 1: Create the quiz
    return this.createQuiz({
      courseId: request.courseId,
      lessonIds: request.lessonIds,
      name: request.name,
      description: request.description,
      limited: request.limited,
      quizDuration: request.quizDuration,
      difficulty: request.difficulty
    }).pipe(
      tap(response => {
        console.log('📝 Step 1 completed - Quiz created, now creating section...');
        if (response.success && response.result) {
          const quizId = response.result.id;

          // Step 2: Create quiz section
          const sectionRequest: ICreateQuizSectionRequest = {
            quizId: quizId,
            name: `${request.name} - Main Section`,
            description: `Main section for ${request.name}`,
            order: 1,
            type: QuizSectionType.Main
          };

          this.createQuizSection(sectionRequest).subscribe({
            next: (sectionResponse) => {
              console.log('📂 Step 2 completed - Section created, now creating questions...');
              if (sectionResponse.success && sectionResponse.result) {
                const sectionId = sectionResponse.result.id;

                // Step 3: Update questions with quiz ID and section ID, then create them
                const questionsWithIds = request.questions.map(q => ({
                  ...q,
                  quizId: quizId,
                  quizSectionId: sectionId
                }));

                this.createQuestionsBulk({ questions: questionsWithIds }).subscribe({
                  next: (questionsResponse) => {
                    console.log('✅ Step 3 completed - Questions created successfully:', questionsResponse);
                    this.updateProgress({ step: 'completed' });
                  },
                  error: (error) => {
                    console.error('❌ Error in step 3 - creating questions:', error);
                    this.updateProgress({
                      step: 'questions',
                      error: error.message || 'Failed to create questions'
                    });
                  }
                });
              }
            },
            error: (error) => {
              console.error('❌ Error in step 2 - creating section:', error);
              this.updateProgress({
                step: 'section',
                error: error.message || 'Failed to create quiz section'
              });
            }
          });
        }
      }),
      catchError(error => {
        console.error('❌ Error in step 1 - creating quiz:', error);
        this.updateProgress({
          step: 'quiz',
          error: error.message || 'Failed to create quiz'
        });
        throw error;
      })
    );
  }

  /**
   * Get a single quiz by ID
   */
  getQuiz(id: number): Observable<IGetQuizResponse> {
    console.log('🔍 Getting quiz by ID:', id);
    const url = `${this.getQuizUrl}?id=${id}`;

    return this.http.get<IGetQuizResponse>(url).pipe(
      tap(response => {
        console.log('🔍 Quiz get response:', response);
      }),
      catchError(error => {
        console.error('❌ Error getting quiz:', error);
        throw error;
      })
    );
  }

  /**
   * Get paginated list of quizzes
   */
  getPaginatedQuizzes(params: IQuizPaginationRequest = {}): Observable<IQuizPaginationResponse> {
    console.log('📋 Getting paginated quizzes:', params);

    // Build query parameters
    const queryParams: any = {
      pageNumber: params.pageNumber || 1,
      pageSize: params.pageSize || 10,
      orderBeforPagination: params.orderBeforPagination !== undefined ? params.orderBeforPagination : true,
      orderDirection: params.orderDirection || 0
    };

    // Add courseId if provided
    if (params.courseId) {
      queryParams.courseId = params.courseId;
    }

    // Build query string
    const queryString = Object.keys(queryParams)
      .map(key => `${key}=${queryParams[key]}`)
      .join('&');

    const url = `${this.paginateQuizzesUrl}?${queryString}`;

    return this.http.get<IQuizPaginationResponse>(url).pipe(
      tap(response => {
        console.log('📋 Paginated quizzes response:', response);
      }),
      catchError(error => {
        console.error('❌ Error getting paginated quizzes:', error);
        throw error;
      })
    );
  }

  /**
   * Get quiz widget data
   */
  getQuizWidget(): Observable<IQuizWidgetResponse> {
    console.log('📊 Getting quiz widget data');

    return this.http.get<IQuizWidgetResponse>(this.quizWidgetUrl).pipe(
      tap(response => {
        console.log('📊 Quiz widget response:', response);
      }),
      catchError(error => {
        console.error('❌ Error getting quiz widget:', error);
        throw error;
      })
    );
  }

  /**
   * Get quizzes for a specific course
   */
  getQuizzesForCourse(courseId: number, pageSize: number = 100): Observable<IQuizPaginationResponse> {
    console.log('📚 Getting quizzes for course:', courseId);

    return this.getPaginatedQuizzes({
      courseId: courseId,
      pageNumber: 1,
      pageSize: pageSize,
      orderBeforPagination: true,
      orderDirection: 0
    });
  }

  /**
   * Search quizzes by name (client-side filtering for now)
   */
  searchQuizzes(searchTerm: string, courseId?: number): Observable<IQuizPaginationResponse> {
    console.log('🔍 Searching quizzes:', searchTerm);

    // For now, get all quizzes and filter client-side
    // In a real implementation, the backend should support search
    return this.getPaginatedQuizzes({
      courseId: courseId,
      pageNumber: 1,
      pageSize: 100,
      orderBeforPagination: true,
      orderDirection: 0
    }).pipe(
      tap(response => {
        if (response.success && response.result) {
          // Filter results by search term
          const filteredResults = response.result.filter(quiz =>
            quiz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
          response.result = filteredResults;
          response.count = filteredResults.length;
          response.totalCount = filteredResults.length;
        }
      })
    );
  }

  /**
   * Delete a quiz by ID
   */
  deleteQuiz(id: number): Observable<IDeleteQuizResponse> {
    console.log('🗑️ QuizApiService.deleteQuiz() called with ID:', id);
    console.log('🌐 Delete URL:', this.deleteQuizUrl);

    // Create headers with the quiz ID as required by the API
    const headers = new HttpHeaders({
      'id': id.toString()
    });

    console.log('📋 Request headers:', headers.keys());
    console.log('🔑 ID header value:', headers.get('id'));

    return this.http.delete<IDeleteQuizResponse>(this.deleteQuizUrl, { headers }).pipe(
      tap(response => {
        console.log('🗑️ Raw API delete response:', response);
        if (response && response.success) {
          console.log('✅ API confirmed quiz deleted successfully');
        } else {
          console.warn('⚠️ API deletion failed or returned false:', response);
        }
      }),
      catchError(error => {
        console.error('❌ HTTP error during quiz deletion:', error);
        console.error('❌ Error status:', error.status);
        console.error('❌ Error message:', error.message);
        console.error('❌ Full error object:', error);
        throw error;
      })
    );
  }
}
