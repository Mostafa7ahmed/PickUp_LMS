import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin, of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../Environments/environment';
import {
  ICreateQuizRequest,
  ICreateQuizResponse,
  ICreateQuizSectionRequest,
  ICreateQuizSectionResponse,
  ICreateQuestionRequest,
  ICreateQuestionResponse,
  IBulkQuestionRequest,
  IBulkQuestionResponse,
  IDeleteQuestionResponse,
  ICompleteQuizCreationRequest,
  IQuizCreationProgress,

  QuestionType,
  IQuizPaginationResponse,
  IQuizDetailResponse,
  IQuizWidgetResponse
} from '../interfaces/iquiz-api';

@Injectable({
  providedIn: 'root'
})
export class QuizApiService {
  private baseUrl = environment.baseUrl + environment.pickup;

  // Feature flags
  private readonly DIFFICULTY_FIELD_SUPPORTED = true; // Difficulty field is supported (1=Easy, 2=Medium, 3=Hard)

  // API Endpoints
  private createQuizUrl = `${this.baseUrl}quiz/create`;
  private createQuizSectionUrl = `${this.baseUrl}quiz-section/create`;
  private createQuestionUrl = `${this.baseUrl}question/create`;
  private bulkCreateQuestionUrl = `${this.baseUrl}question/bulk`;
  private deleteQuestionUrl = `${this.baseUrl}question/delete`;

  // New endpoints
  private quizByIdUrl = `${this.baseUrl}quiz/get`;
  private quizPaginateUrl = `${this.baseUrl}quiz/paginate`;
  private quizWidgetUrl = `${this.baseUrl}quiz/widget`;

  // Progress tracking
  private progressSubject = new BehaviorSubject<IQuizCreationProgress>({ step: 'quiz' });
  public progress$ = this.progressSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Get quiz by ID
   */
  getQuizById(id: number): Observable<IQuizDetailResponse> {
    console.log(`🔍 Fetching quiz with ID: ${id}`);
    return this.http.get<IQuizDetailResponse>(`${this.quizByIdUrl}?id=${id}`).pipe(
      tap(response => console.log('📋 Quiz detail response:', response)),
      catchError(error => {
        console.error('❌ Error fetching quiz:', error);
        throw error;
      })
    );
  }

  /**
   * Get paginated quizzes
   */
  getPaginatedQuizzes(
    courseId: number = 0,
    pageNumber: number = 1,
    pageSize: number = 10,
    orderBeforPagination: boolean = true,
    orderDirection: number = 0
  ): Observable<IQuizPaginationResponse> {
    const url = `${this.quizPaginateUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}&orderBeforPagination=${orderBeforPagination}&orderDirection=${orderDirection}`;

    console.log(`🔍 Fetching paginated quizzes: ${url}`);

    return this.http.get<IQuizPaginationResponse>(url).pipe(
      tap(response => {
        console.log('📋 Quiz pagination response:', response);
        console.log(`📊 Retrieved ${response.result?.length || 0} quizzes (Page ${response.pageIndex} of ${response.totalPages})`);
      }),
      catchError(error => {
        console.error('❌ Error fetching paginated quizzes:', error);
        throw error;
      })
    );
  }

  /**
   * Get quiz widget data
   */
  getQuizWidget(): Observable<IQuizWidgetResponse> {
    console.log('📊 Fetching quiz widget data');
    return this.http.get<IQuizWidgetResponse>(this.quizWidgetUrl).pipe(
      tap(response => console.log('📊 Quiz widget response:', response)),
      catchError(error => {
        console.error('❌ Error fetching quiz widget data:', error);
        throw error;
      })
    );
  }

  /**
   * Complete quiz creation workflow (3 steps)
   * 1. Create Quiz
   * 2. Create Quiz Section
   * 3. Create Questions
   */
  createCompleteQuiz(request: ICompleteQuizCreationRequest): Observable<ICreateQuizResponse> {
    console.log('🚀 Starting complete quiz creation workflow...');
    console.log('📝 Request:', request);

    this.updateProgress({ step: 'quiz' });

    // Create quiz request - conditionally include difficulty field
    const quizCreateRequest: any = {
      courseId: request.courseId,
      lessonIds: request.lessonIds,
      name: request.name,
      description: request.description,
      limited: request.limited,
      quizDuration: request.quizDuration
    };

    // Add difficulty field only if API supports it
    if (this.DIFFICULTY_FIELD_SUPPORTED && request.difficulty !== undefined) {
      quizCreateRequest.difficulty = request.difficulty;
      console.log('📝 Including difficulty field:', request.difficulty);
    } else {
      console.log('📝 Difficulty field not supported by API yet - excluding from request');
    }

    console.log('📝 Final quiz create request:', quizCreateRequest);

    return this.createQuiz(quizCreateRequest).pipe(
      switchMap((quizResponse) => {
        if (!quizResponse.success || !quizResponse.result) {
          throw new Error(quizResponse.message || 'Failed to create quiz');
        }

        console.log('✅ Step 1: Quiz created successfully', quizResponse);
        const quizId = quizResponse.result.id;
        this.updateProgress({ step: 'section', quizId });

        // Step 2: Create quiz section with correct format
        const sectionRequest: ICreateQuizSectionRequest = {
          quizId: quizId,
          order: 1,
          name: `${request.name} - Main Section`,
          type: 0 // Default section type
        };

        console.log('📂 Creating quiz section with correct format:', sectionRequest);
        return this.createQuizSection(sectionRequest).pipe(
          map(sectionResponse => ({ quizResponse, sectionResponse, quizId }))
        );
      }),
      switchMap(({ quizResponse, sectionResponse, quizId }) => {
        if (!sectionResponse.success || !sectionResponse.result) {
          throw new Error(sectionResponse.message || 'Failed to create quiz section');
        }

        console.log('✅ Step 2: Quiz section created successfully', sectionResponse);
        const sectionId = sectionResponse.result.id;
        this.updateProgress({
          step: 'questions',
          quizId,
          sectionId,
          totalQuestions: request.questions.length
        });

        // Step 3: Create questions using bulk endpoint
        const questionRequests = request.questions.map((question, index) => ({
          ...question,
          quizId: quizId,
          quizSectionId: sectionId,
          order: index + 1
        }));

        return this.createQuestions(questionRequests).pipe(
          map(() => quizResponse)
        );
      }),
      tap(() => {
        this.updateProgress({ step: 'completed' });
        console.log('🎉 Complete quiz creation workflow finished successfully!');
      }),
      catchError((error) => {
        console.error('❌ Quiz creation workflow failed:', error);
        this.updateProgress({
          step: 'quiz',
          error: error.message || 'Quiz creation failed'
        });
        throw error;
      })
    );
  }

  /**
   * Step 1: Create Quiz
   */
  createQuiz(request: ICreateQuizRequest): Observable<ICreateQuizResponse> {
    console.log('📝 Creating quiz with request:', request);
    console.log('📝 Quiz creation URL:', this.createQuizUrl);
    console.log('📝 Quiz request body:', JSON.stringify(request, null, 2));

    return this.http.post<ICreateQuizResponse>(this.createQuizUrl, request).pipe(
      tap(response => {
        console.log('📝 Quiz creation response:', response);
        console.log('📝 Response status:', response.statusCode);
        console.log('📝 Response success:', response.success);
      }),
      catchError(error => {
        console.error('❌ Error creating quiz:', error);
        console.error('❌ Error status:', error.status);
        console.error('❌ Error message:', error.message);
        console.error('❌ Error body:', error.error);
        console.error('❌ Full error object:', JSON.stringify(error, null, 2));

        // Provide more specific error message
        let errorMessage = 'Failed to create quiz';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        } else if (error.status === 400) {
          errorMessage = 'Bad request: Please check the quiz data format. ' + (error.error?.message || '');
        }

        throw new Error(errorMessage);
      })
    );
  }

  /**
   * Step 2: Create Quiz Section
   */
  createQuizSection(request: ICreateQuizSectionRequest): Observable<ICreateQuizSectionResponse> {
    console.log('📂 Creating quiz section with correct API format:', request);
    console.log('📂 Quiz section URL:', this.createQuizSectionUrl);
    console.log('📂 Quiz section request body:', JSON.stringify(request, null, 2));

    return this.http.post<ICreateQuizSectionResponse>(this.createQuizSectionUrl, request).pipe(
      tap(response => {
        console.log('📂 Quiz section creation response:', response);
        console.log('📂 Response status:', response.statusCode);
        console.log('📂 Response success:', response.success);
      }),
      catchError(error => {
        console.error('❌ Error creating quiz section:', error);
        console.error('❌ Error status:', error.status);
        console.error('❌ Error message:', error.message);
        console.error('❌ Error body:', error.error);

        // Provide more specific error message
        let errorMessage = 'Failed to create quiz section';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        } else if (error.status === 500) {
          errorMessage = 'Server error occurred while creating quiz section. Please try again.';
        }

        throw new Error(errorMessage);
      })
    );
  }

  /**
   * Step 3: Create Questions (using bulk endpoint for better performance)
   */
  createQuestions(questions: ICreateQuestionRequest[]): Observable<IBulkQuestionResponse> {
    console.log('❓ Creating questions using bulk endpoint:', questions);

    if (questions.length === 0) {
      return of({ success: true, statusCode: 200, message: 'No questions to create', result: [] });
    }

    const bulkRequest: IBulkQuestionRequest = { questions };

    this.updateProgress({
      step: 'questions',
      completedQuestions: 0,
      totalQuestions: questions.length
    });

    return this.http.post<IBulkQuestionResponse>(this.bulkCreateQuestionUrl, bulkRequest).pipe(
      tap(response => {
        console.log('❓ Bulk questions created:', response);
        this.updateProgress({
          step: 'questions',
          completedQuestions: questions.length,
          totalQuestions: questions.length
        });
      }),
      catchError(error => {
        console.error('❌ Error creating questions in bulk:', error);
        throw error;
      })
    );
  }

  /**
   * Create single question
   */
  createQuestion(request: ICreateQuestionRequest): Observable<ICreateQuestionResponse> {
    console.log('❓ Creating single question:', request);
    return this.http.post<ICreateQuestionResponse>(this.createQuestionUrl, request).pipe(
      tap(response => console.log('❓ Question creation response:', response)),
      catchError(error => {
        console.error('❌ Error creating question:', error);
        throw error;
      })
    );
  }

  /**
   * Delete question by ID
   */
  deleteQuestion(questionId: number): Observable<IDeleteQuestionResponse> {
    console.log('🗑️ Deleting question with ID:', questionId);

    const headers = { 'id': questionId.toString() };

    return this.http.delete<IDeleteQuestionResponse>(this.deleteQuestionUrl, { headers }).pipe(
      tap(response => console.log('🗑️ Question deletion response:', response)),
      catchError(error => {
        console.error('❌ Error deleting question:', error);
        throw error;
      })
    );
  }

  /**
   * Helper method to convert form questions to API format
   */
  convertFormQuestionsToApiFormat(
    formQuestions: any[], 
    courseId: number
  ): ICreateQuestionRequest[] {
    const apiQuestions: ICreateQuestionRequest[] = [];

    // Convert True/False questions
    formQuestions.forEach((question, index) => {
      if (question.trueAndFalse) {
        apiQuestions.push({
          courseId: courseId,
          quizId: 0, // Will be set later
          quizSectionId: 0, // Will be set later
          order: index + 1,
          hint: question.hint || '',
          text: question.text,
          type: QuestionType.TrueFalse,
          trueAndFalse: {
            answer: question.trueAndFalse.answer
          }
        });
      } else if (question.shortAnswer) {
        apiQuestions.push({
          courseId: courseId,
          quizId: 0, // Will be set later
          quizSectionId: 0, // Will be set later
          order: index + 1,
          hint: question.hint || '',
          text: question.text,
          type: QuestionType.ShortAnswer,
          shortAnswer: {
            answer: question.shortAnswer.answer
          }
        });
      } else if (question.multipleChoise) {
        apiQuestions.push({
          courseId: courseId,
          quizId: 0, // Will be set later
          quizSectionId: 0, // Will be set later
          order: index + 1,
          hint: question.hint || '',
          text: question.text,
          type: QuestionType.MultipleChoice,
          multipleChoise: question.multipleChoise.filter((choice: any) => 
            choice.answer && choice.answer.trim()
          )
        });
      }
    });

    return apiQuestions;
  }

  /**
   * Update progress
   */
  private updateProgress(progress: Partial<IQuizCreationProgress>) {
    const currentProgress = this.progressSubject.value;
    this.progressSubject.next({ ...currentProgress, ...progress });
  }

  /**
   * Reset progress
   */
  resetProgress() {
    this.progressSubject.next({ step: 'quiz' });
  }

  /**
   * Get current progress
   */
  getCurrentProgress(): IQuizCreationProgress {
    return this.progressSubject.value;
  }
}
