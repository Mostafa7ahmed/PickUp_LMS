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
  ICompleteQuizCreationRequest,
  IQuizCreationProgress,
  QuestionType
} from '../interfaces/iquiz-api';

@Injectable({
  providedIn: 'root'
})
export class QuizApiService {
  private baseUrl = environment.baseUrl + environment.pickup;
  
  // API Endpoints
  private createQuizUrl = `${this.baseUrl}quiz/create`;
  private createQuizSectionUrl = `${this.baseUrl}quiz-section/create`;
  private createQuestionUrl = `${this.baseUrl}question/create`;

  // Progress tracking
  private progressSubject = new BehaviorSubject<IQuizCreationProgress>({ step: 'quiz' });
  public progress$ = this.progressSubject.asObservable();

  constructor(private http: HttpClient) {}

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

    return this.createQuiz({
      courseId: request.courseId,
      lessonIds: request.lessonIds,
      name: request.name,
      description: request.description,
      limited: request.limited,
      quizDuration: request.quizDuration
    }).pipe(
      switchMap((quizResponse) => {
        if (!quizResponse.success || !quizResponse.result) {
          throw new Error(quizResponse.message || 'Failed to create quiz');
        }

        console.log('✅ Step 1: Quiz created successfully', quizResponse);
        const quizId = quizResponse.result.id;
        this.updateProgress({ step: 'section', quizId });

        // Step 2: Create quiz section
        return this.createQuizSection({
          quizId: quizId,
          name: `${request.name} - Main Section`,
          description: 'Main section for quiz questions',
          order: 1
        }).pipe(
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

        // Step 3: Create questions
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
    console.log('📝 Creating quiz:', request);
    return this.http.post<ICreateQuizResponse>(this.createQuizUrl, request).pipe(
      tap(response => console.log('📝 Quiz creation response:', response)),
      catchError(error => {
        console.error('❌ Error creating quiz:', error);
        throw error;
      })
    );
  }

  /**
   * Step 2: Create Quiz Section
   */
  createQuizSection(request: ICreateQuizSectionRequest): Observable<ICreateQuizSectionResponse> {
    console.log('📂 Creating quiz section:', request);
    return this.http.post<ICreateQuizSectionResponse>(this.createQuizSectionUrl, request).pipe(
      tap(response => console.log('📂 Quiz section creation response:', response)),
      catchError(error => {
        console.error('❌ Error creating quiz section:', error);
        throw error;
      })
    );
  }

  /**
   * Step 3: Create Questions (batch)
   */
  createQuestions(questions: ICreateQuestionRequest[]): Observable<ICreateQuestionResponse[]> {
    console.log('❓ Creating questions:', questions);
    
    if (questions.length === 0) {
      return of([]);
    }

    const questionRequests = questions.map((question, index) => 
      this.createQuestion(question).pipe(
        tap(() => {
          this.updateProgress({ 
            step: 'questions', 
            completedQuestions: index + 1,
            totalQuestions: questions.length 
          });
        })
      )
    );

    return forkJoin(questionRequests).pipe(
      tap(responses => console.log('❓ All questions created:', responses)),
      catchError(error => {
        console.error('❌ Error creating questions:', error);
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
