import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface QuizQuestion {
  id: number;
  type: 'true-false' | 'multiple-choice' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: any;
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  order: number;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  questionsCount: number;
  duration: number;
  attempts: number;
  status: 'published' | 'draft' | 'scheduled';
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  createdDate: string;
  courseId?: number;
  courseName?: string;
  lessonId?: number;
  lessonName?: string;
  questions?: QuizQuestion[];
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly STORAGE_KEY = 'quizzes_data';
  private quizzesSubject = new BehaviorSubject<Quiz[]>([]);
  public quizzes$ = this.quizzesSubject.asObservable();

  constructor() {
    this.loadQuizzesFromStorage();
  }

  // Load quizzes from localStorage
  private loadQuizzesFromStorage(): void {
    try {
      const storedQuizzes = localStorage.getItem(this.STORAGE_KEY);
      if (storedQuizzes) {
        const quizzes = JSON.parse(storedQuizzes);
        this.quizzesSubject.next(quizzes);
        console.log('📂 Loaded quizzes from localStorage:', quizzes);
      } else {
        // Initialize with empty array
        this.quizzesSubject.next([]);
        console.log('📂 No quizzes found in localStorage, starting fresh');
      }
    } catch (error) {
      console.error('❌ Error loading quizzes from localStorage:', error);
      this.quizzesSubject.next([]);
    }
  }

  // Save quizzes to localStorage
  private saveQuizzesToStorage(quizzes: Quiz[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(quizzes));
      console.log('💾 Saved quizzes to localStorage:', quizzes);
    } catch (error) {
      console.error('❌ Error saving quizzes to localStorage:', error);
    }
  }

  // Get all quizzes
  getQuizzes(): Observable<Quiz[]> {
    return this.quizzes$;
  }

  // Get current quizzes array
  getCurrentQuizzes(): Quiz[] {
    return this.quizzesSubject.value;
  }

  // Add new quiz
  addQuiz(quiz: Omit<Quiz, 'id'>): Quiz {
    const currentQuizzes = this.getCurrentQuizzes();
    const newQuiz: Quiz = {
      ...quiz,
      id: Math.max(...currentQuizzes.map(q => q.id), 0) + 1,
      attempts: 0,
      createdDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    };

    const updatedQuizzes = [newQuiz, ...currentQuizzes];
    this.quizzesSubject.next(updatedQuizzes);
    this.saveQuizzesToStorage(updatedQuizzes);
    return newQuiz;
  }

  // Add quiz with questions
  addQuizWithQuestions(quizData: Omit<Quiz, 'id'>, questions: any[]): Quiz {
    const quiz = this.addQuiz(quizData);

    // Convert questions to QuizQuestion format
    const formattedQuestions: QuizQuestion[] = questions.map((q, index) => {
      const questionType = this.getQuestionType(q);
      const correctAnswer = this.getCorrectAnswer(q);

      console.log(`🔄 Converting question ${index + 1}:`, {
        original: q,
        type: questionType,
        correctAnswer: correctAnswer
      });

      return {
        id: index + 1,
        type: questionType,
        question: q.text || q.question || '',
        options: q.multipleChoise ? q.multipleChoise.map((choice: any) => choice.answer) : undefined,
        correctAnswer: correctAnswer,
        explanation: q.explanation || '',
        difficulty: q.difficulty || 'medium',
        order: q.order || index + 1
      };
    });

    // Update quiz with questions
    this.updateQuiz(quiz.id, { questions: formattedQuestions });

    return { ...quiz, questions: formattedQuestions };
  }

  // Helper methods for question conversion
  private getQuestionType(question: any): 'true-false' | 'multiple-choice' | 'short-answer' {
    if (question.trueAndFalse !== undefined) return 'true-false';
    if (question.multipleChoise && question.multipleChoise.length > 0) return 'multiple-choice';
    return 'short-answer';
  }

  private getCorrectAnswer(question: any): any {
    if (question.trueAndFalse !== undefined) {
      return question.trueAndFalse.answer;
    }
    if (question.multipleChoise && question.multipleChoise.length > 0) {
      const correctIndex = question.multipleChoise.findIndex((choice: any) => choice.correct);
      return correctIndex >= 0 ? correctIndex : 0;
    }
    return question.shortAnswer?.answer || '';
  }

  // Update quiz
  updateQuiz(id: number, updates: Partial<Quiz>): boolean {
    const currentQuizzes = this.getCurrentQuizzes();
    const index = currentQuizzes.findIndex(q => q.id === id);

    if (index !== -1) {
      currentQuizzes[index] = { ...currentQuizzes[index], ...updates };
      const updatedQuizzes = [...currentQuizzes];
      this.quizzesSubject.next(updatedQuizzes);
      this.saveQuizzesToStorage(updatedQuizzes);
      return true;
    }
    return false;
  }

  // Delete quiz
  deleteQuiz(id: number): boolean {
    const currentQuizzes = this.getCurrentQuizzes();
    const filteredQuizzes = currentQuizzes.filter(q => q.id !== id);

    if (filteredQuizzes.length !== currentQuizzes.length) {
      this.quizzesSubject.next(filteredQuizzes);
      this.saveQuizzesToStorage(filteredQuizzes);
      return true;
    }
    return false;
  }

  // Get quiz by id
  getQuizById(id: number): Quiz | undefined {
    return this.getCurrentQuizzes().find(q => q.id === id);
  }

  // Search quizzes
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

  // Filter by status
  filterByStatus(status: string): Quiz[] {
    if (!status || status === 'all') {
      return this.getCurrentQuizzes();
    }
    return this.getCurrentQuizzes().filter(quiz => quiz.status === status);
  }

  filterByDifficulty(difficulty: string): Quiz[] {
    if (!difficulty || difficulty === 'all') {
      return this.getCurrentQuizzes();
    }
    return this.getCurrentQuizzes().filter(quiz => quiz.difficulty === difficulty);
  }

  // Clear all quizzes (for testing/reset)
  clearAllQuizzes(): void {
    this.quizzesSubject.next([]);
    this.saveQuizzesToStorage([]);
    console.log('🗑️ All quizzes cleared from localStorage');
  }

  // Get storage info (for debugging)
  getStorageInfo(): { count: number, size: string } {
    const quizzes = this.getCurrentQuizzes();
    const dataString = JSON.stringify(quizzes);
    return {
      count: quizzes.length,
      size: `${(dataString.length / 1024).toFixed(2)} KB`
    };
  }
}
