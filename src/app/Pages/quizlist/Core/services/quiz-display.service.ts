import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuizApiV2Service } from './quiz-api-v2.service';
import { 
  IGetQuizResponse, 
  IQuizDetails, 
  IQuizSection, 
  IQuizQuestion,
  QuizSectionType 
} from '../Interface/iquiz-api.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizDisplayService {

  constructor(private quizApiV2Service: QuizApiV2Service) {}

  /**
   * Get quiz for display with formatted data
   */
  getQuizForDisplay(quizId: number): Observable<QuizDisplayData> {
    return this.quizApiV2Service.getQuiz(quizId).pipe(
      map(response => this.transformQuizForDisplay(response))
    );
  }

  /**
   * Transform quiz data for UI display
   */
  private transformQuizForDisplay(response: IGetQuizResponse): QuizDisplayData {
    if (!response.success || !response.result) {
      return {
        id: 0,
        name: '',
        description: '',
        difficulty: 'Medium',
        duration: '',
        sections: [],
        totalQuestions: 0,
        hasQuestions: false
      };
    }

    const quiz = response.result;
    const sections = this.groupQuestionsBySection(quiz.quizSections);
    
    return {
      id: quiz.id,
      name: quiz.name,
      description: quiz.description,
      difficulty: this.formatDifficulty(quiz.difficulty),
      duration: this.formatDuration(quiz.quizDuration),
      sections: sections,
      totalQuestions: sections.reduce((total, section) => total + section.questions.length, 0),
      hasQuestions: sections.some(section => section.questions.length > 0)
    };
  }

  /**
   * Group questions by section type
   */
  private groupQuestionsBySection(sections: IQuizSection[]): SectionDisplay[] {
    const sectionDisplays: SectionDisplay[] = [];

    // Group by section type
    const multipleChoiceSection = sections.find(s => s.type === QuizSectionType.MultipleChoice);
    const trueFalseSection = sections.find(s => s.type === QuizSectionType.TrueFalse);
    const shortAnswerSection = sections.find(s => s.type === QuizSectionType.ShortAnswer);

    if (multipleChoiceSection) {
      sectionDisplays.push({
        type: 'Multiple Choice',
        icon: 'fas fa-list',
        questions: this.formatQuestions(multipleChoiceSection.questions, 'multiple-choice')
      });
    }

    if (trueFalseSection) {
      sectionDisplays.push({
        type: 'True/False',
        icon: 'fas fa-check-circle',
        questions: this.formatQuestions(trueFalseSection.questions, 'true-false')
      });
    }

    if (shortAnswerSection) {
      sectionDisplays.push({
        type: 'Short Answer',
        icon: 'fas fa-edit',
        questions: this.formatQuestions(shortAnswerSection.questions, 'short-answer')
      });
    }

    return sectionDisplays;
  }

  /**
   * Format questions for display
   */
  private formatQuestions(questions: IQuizQuestion[], type: string): QuestionDisplay[] {
    return questions.map((q, index) => ({
      id: q.quizSectionId * 1000 + index, // Generate a unique ID
      text: q.text,
      hint: q.hint,
      type: type,
      order: q.order,
      options: this.getQuestionOptions(q),
      correctAnswer: this.getCorrectAnswer(q)
    }));
  }

  /**
   * Get question options for display
   */
  private getQuestionOptions(question: IQuizQuestion): string[] {
    if (question.multipleChoiceQuestionAnswers && question.multipleChoiceQuestionAnswers.length > 0) {
      return question.multipleChoiceQuestionAnswers.map(choice => choice.answer);
    }
    if (question.trueAndFalseAnswer) {
      return ['True', 'False'];
    }
    return [];
  }

  /**
   * Get correct answer for display
   */
  private getCorrectAnswer(question: IQuizQuestion): any {
    if (question.multipleChoiceQuestionAnswers && question.multipleChoiceQuestionAnswers.length > 0) {
      // Return the index of the correct answer, not the text
      const correctIndex = question.multipleChoiceQuestionAnswers.findIndex(choice => choice.correct);
      return correctIndex !== -1 ? correctIndex : null;
    }
    if (question.trueAndFalseAnswer) {
      return question.trueAndFalseAnswer.answer;
    }
    if (question.shortQuestionAnswer) {
      return question.shortQuestionAnswer.answer;
    }
    return null;
  }

  /**
   * Format difficulty number to text
   */
  private formatDifficulty(difficulty: number): string {
    switch (difficulty) {
      case 0: return 'Hard';
      case 1: return 'Medium';
      case 2: return 'Easy';
      default: return 'Medium';
    }
  }

  /**
   * Format duration for display
   */
  private formatDuration(duration: { duration: number; type: number }): string {
    const typeText = duration.type === 1 ? 'hours' : 'minutes';
    return `${duration.duration} ${typeText}`;
  }
}

// Display interfaces
export interface QuizDisplayData {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  duration: string;
  sections: SectionDisplay[];
  totalQuestions: number;
  hasQuestions: boolean;
}

export interface SectionDisplay {
  type: string;
  icon: string;
  questions: QuestionDisplay[];
}

export interface QuestionDisplay {
  id: number;
  text: string;
  hint: string;
  type: string;
  order: number;
  options: string[];
  correctAnswer: any;
} 