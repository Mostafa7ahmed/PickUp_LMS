import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../../../Environments/environment';
import {
  ICreateQuizRequest,
  ICreateQuizResponse,
  IGetQuizResponse,
  IBulkCreateQuestionsRequest,
  IBulkCreateQuestionsResponse,
  IQuizCreationProgress,
  IQuizFormData,
  IQuestionFormData,
  ICreateQuestionRequest,
  QuizSectionType,
  QuizDurationType,
  QuizDifficulty
} from '../Interface/iquiz-api.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizApiV2Service {
  private baseUrl = `${environment.baseUrl}${environment.pickup}`;
  
  // API Endpoints
  private createQuizUrl = `${this.baseUrl}quiz/create`;
  private getQuizUrl = `${this.baseUrl}quiz/get`;
  private bulkCreateQuestionsUrl = `${this.baseUrl}question/bulk`;
  
  // Progress tracking
  private progressSubject = new BehaviorSubject<IQuizCreationProgress>({ step: 'quiz' });
  public progress$ = this.progressSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Create a new quiz
   */
  createQuiz(formData: IQuizFormData): Observable<ICreateQuizResponse> {
    console.log('🎯 Creating quiz with form data:', formData);
    
    const request: ICreateQuizRequest = {
      courseId: formData.courseId,
      lessonIds: formData.lessonIds,
      name: formData.name,
      description: formData.description,
      limited: formData.limited,
      quizDuration: {
        duration: formData.duration,
        type: formData.durationType
      },
      difficulty: formData.difficulty
    };

    this.updateProgress({ step: 'quiz' });

    return this.http.post<ICreateQuizResponse>(this.createQuizUrl, request).pipe(
      tap(response => {
        console.log('📝 Quiz creation response:', response);
        if (response.success && response.result) {
          this.updateProgress({
            step: 'sections',
            quizId: response.result.id
          });
        }
      }),
      catchError(error => {
        console.error('❌ Error creating quiz:', error);
        this.updateProgress({
          step: 'quiz',
          error: error.message || 'Quiz creation failed'
        });
        return throwError(() => error);
      })
    );
  }

  /**
   * Get quiz details with sections
   */
  getQuiz(id: number): Observable<IGetQuizResponse> {
    console.log('📋 Getting quiz details for ID:', id);
    
    return this.http.get<IGetQuizResponse>(`${this.getQuizUrl}?id=${id}`).pipe(
      tap(response => {
        console.log('📋 Quiz details response:', response);
      }),
      catchError(error => {
        console.error('❌ Error getting quiz:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Create questions in bulk for all three sections
   */
  createQuestionsBulk(
    quizId: number,
    courseId: number,
    sectionIds: { multipleChoice: number; trueFalse: number; shortAnswer: number },
    questions: IQuestionFormData[]
  ): Observable<IBulkCreateQuestionsResponse> {
    console.log('❓ Creating questions in bulk:', { quizId, courseId, sectionIds, questions });
    
    this.updateProgress({
      step: 'questions',
      totalQuestions: questions.length,
      completedQuestions: 0
    });

    const apiQuestions: ICreateQuestionRequest[] = questions.map((question, index) => {
      const baseQuestion: ICreateQuestionRequest = {
        courseId: courseId,
        quizId: quizId,
        quizSectionId: this.getSectionId(question.type, sectionIds),
        order: question.order || index + 1,
        hint: question.hint || '',
        text: question.text,
        multipleChoise: null,
        shortAnswer: null,
        trueAndFalse: null
      };

      // Set the appropriate answer type based on question type
      switch (question.type) {
        case QuizSectionType.MultipleChoice:
          if (question.options && question.options.length > 0) {
            baseQuestion.multipleChoise = question.options.map((option, optionIndex) => ({
              answer: option,
              correct: optionIndex === question.correctAnswer
            }));
          }
          break;
          
        case QuizSectionType.TrueFalse:
          baseQuestion.trueAndFalse = {
            answer: question.correctAnswer === true || question.correctAnswer === 'true'
          };
          break;
          
        case QuizSectionType.ShortAnswer:
          baseQuestion.shortAnswer = {
            answer: question.correctAnswer?.toString() || ''
          };
          break;
      }

      return baseQuestion;
    });

    const request: IBulkCreateQuestionsRequest = {
      questions: apiQuestions
    };

    return this.http.post<IBulkCreateQuestionsResponse>(this.bulkCreateQuestionsUrl, request).pipe(
      tap(response => {
        console.log('❓ Bulk questions creation response:', response);
        if (response.success) {
          this.updateProgress({ step: 'completed' });
        }
      }),
      catchError(error => {
        console.error('❌ Error creating questions in bulk:', error);
        this.updateProgress({
          step: 'questions',
          error: error.message || 'Questions creation failed'
        });
        return throwError(() => error);
      })
    );
  }

  /**
   * Complete quiz creation workflow
   */
  createCompleteQuiz(
    formData: IQuizFormData,
    questions: IQuestionFormData[]
  ): Observable<{ quiz: ICreateQuizResponse; questionsResult?: IBulkCreateQuestionsResponse }> {
    console.log('🎯 Starting complete quiz creation workflow');

    return this.createQuiz(formData).pipe(
      tap(() => this.updateProgress({ step: 'sections' })),
      map(quizResponse => {
        if (!quizResponse.success || !quizResponse.result) {
          throw new Error('Quiz creation failed');
        }
        return { quiz: quizResponse };
      }),
      // After quiz creation, get the quiz to retrieve section IDs
      map(result => {
        this.getQuiz(result.quiz.result.id).subscribe({
          next: (quizDetails) => {
            if (quizDetails.success && quizDetails.result.quizSections.length >= 3) {
              const sections = quizDetails.result.quizSections;
              const sectionIds = {
                multipleChoice: sections.find(s => s.type === QuizSectionType.MultipleChoice)?.id || 0,
                trueFalse: sections.find(s => s.type === QuizSectionType.TrueFalse)?.id || 0,
                shortAnswer: sections.find(s => s.type === QuizSectionType.ShortAnswer)?.id || 0
              };

              if (questions.length > 0) {
                this.createQuestionsBulk(
                  result.quiz.result.id,
                  formData.courseId,
                  sectionIds,
                  questions
                ).subscribe({
                  next: (questionsResponse) => {
                    console.log('✅ Complete quiz creation finished successfully');
                  },
                  error: (error) => {
                    console.error('❌ Error creating questions:', error);
                  }
                });
              }
            }
          },
          error: (error) => {
            console.error('❌ Error getting quiz sections:', error);
          }
        });
        
        return result;
      }),
      catchError(error => {
        console.error('❌ Error in complete quiz creation:', error);
        this.updateProgress({
          step: 'quiz',
          error: error.message || 'Complete quiz creation failed'
        });
        return throwError(() => error);
      })
    );
  }

  /**
   * Get section ID based on question type
   */
  private getSectionId(
    type: QuizSectionType,
    sectionIds: { multipleChoice: number; trueFalse: number; shortAnswer: number }
  ): number {
    switch (type) {
      case QuizSectionType.MultipleChoice:
        return sectionIds.multipleChoice;
      case QuizSectionType.TrueFalse:
        return sectionIds.trueFalse;
      case QuizSectionType.ShortAnswer:
        return sectionIds.shortAnswer;
      default:
        return sectionIds.multipleChoice;
    }
  }

  /**
   * Update progress tracking
   */
  private updateProgress(progress: Partial<IQuizCreationProgress>): void {
    const currentProgress = this.progressSubject.value;
    const newProgress = { ...currentProgress, ...progress };
    this.progressSubject.next(newProgress);
    console.log('📊 Progress updated:', newProgress);
  }

  /**
   * Reset progress tracking
   */
  resetProgress(): void {
    this.progressSubject.next({ step: 'quiz' });
    console.log('🔄 Progress reset');
  }

  /**
   * Helper methods for form validation and transformation
   */
  validateQuizForm(formData: IQuizFormData): string[] {
    const errors: string[] = [];
    
    if (!formData.name?.trim()) {
      errors.push('Quiz name is required');
    }
    if (!formData.description?.trim()) {
      errors.push('Quiz description is required');
    }
    if (!formData.courseId || formData.courseId <= 0) {
      errors.push('Valid course selection is required');
    }
    if (!formData.lessonIds || formData.lessonIds.length === 0) {
      errors.push('At least one lesson must be selected');
    }
    if (!formData.duration || formData.duration <= 0) {
      errors.push('Quiz duration must be greater than 0');
    }
    
    return errors;
  }

  validateQuestions(questions: IQuestionFormData[]): string[] {
    const errors: string[] = [];
    
    if (questions.length === 0) {
      errors.push('At least one question is required');
    }
    
    questions.forEach((question, index) => {
      if (!question.text?.trim()) {
        errors.push(`Question ${index + 1}: Question text is required`);
      }
      
      if (question.type === QuizSectionType.MultipleChoice) {
        if (!question.options || question.options.length < 2) {
          errors.push(`Question ${index + 1}: Multiple choice questions need at least 2 options`);
        }
        if (question.correctAnswer === undefined || question.correctAnswer < 0) {
          errors.push(`Question ${index + 1}: A correct answer must be selected`);
        }
      }
      
      if (question.type === QuizSectionType.ShortAnswer && !question.correctAnswer?.trim()) {
        errors.push(`Question ${index + 1}: Short answer questions need a correct answer`);
      }
      
      if (question.type === QuizSectionType.TrueFalse && question.correctAnswer === undefined) {
        errors.push(`Question ${index + 1}: True/False questions need a correct answer`);
      }
    });
    
    return errors;
  }

  /**
   * Transform difficulty enum to human readable text
   */
  getDifficultyText(difficulty: QuizDifficulty): string {
    switch (difficulty) {
      case QuizDifficulty.Easy:
        return 'Easy';
      case QuizDifficulty.Medium:
        return 'Medium';
      case QuizDifficulty.Hard:
        return 'Hard';
      default:
        return 'Medium';
    }
  }

  /**
   * Transform duration type enum to human readable text
   */
  getDurationTypeText(type: QuizDurationType): string {
    switch (type) {
      case QuizDurationType.Minutes:
        return 'Minutes';
      case QuizDurationType.Hours:
        return 'Hours';
      default:
        return 'Minutes';
    }
  }
} 