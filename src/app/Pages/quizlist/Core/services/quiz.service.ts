import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizzesSubject = new BehaviorSubject<Quiz[]>([
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics including variables, functions, and DOM manipulation.',
      questionsCount: 25,
      duration: 30,
      attempts: 156,
      status: 'published',
      difficulty: 'easy',
      tags: ['JavaScript', 'Programming', 'Web Dev'],
      createdDate: 'Jan 15, 2024'
    },
    {
      id: 2,
      title: 'React Advanced Concepts',
      description: 'Advanced React concepts including hooks, context, and performance optimization techniques.',
      questionsCount: 40,
      duration: 45,
      attempts: 89,
      status: 'draft',
      difficulty: 'hard',
      tags: ['React', 'Frontend', 'Advanced'],
      createdDate: 'Jan 20, 2024'
    },
    {
      id: 3,
      title: 'CSS Grid & Flexbox',
      description: 'Master modern CSS layout techniques with Grid and Flexbox for responsive design.',
      questionsCount: 18,
      duration: 25,
      attempts: 234,
      status: 'published',
      difficulty: 'medium',
      tags: ['CSS', 'Layout', 'Design'],
      createdDate: 'Jan 10, 2024'
    },
    {
      id: 4,
      title: 'Node.js Backend Development',
      description: 'Learn server-side development with Node.js, Express, and database integration.',
      questionsCount: 35,
      duration: 50,
      attempts: 67,
      status: 'scheduled',
      difficulty: 'hard',
      tags: ['Node.js', 'Backend', 'API'],
      createdDate: 'Jan 25, 2024'
    },
    {
      id: 5,
      title: 'HTML5 & Semantic Web',
      description: 'Understanding HTML5 features, semantic elements, and accessibility best practices.',
      questionsCount: 20,
      duration: 20,
      attempts: 312,
      status: 'published',
      difficulty: 'easy',
      tags: ['HTML', 'Semantic', 'Accessibility'],
      createdDate: 'Jan 5, 2024'
    },
    {
      id: 6,
      title: 'TypeScript Deep Dive',
      description: 'Advanced TypeScript features including generics, decorators, and type manipulation.',
      questionsCount: 30,
      duration: 40,
      attempts: 45,
      status: 'draft',
      difficulty: 'hard',
      tags: ['TypeScript', 'Advanced', 'Types'],
      createdDate: 'Jan 30, 2024'
    }
  ]);

  public quizzes$ = this.quizzesSubject.asObservable();

  constructor() { }

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
    return newQuiz;
  }

  // Update quiz
  updateQuiz(id: number, updates: Partial<Quiz>): boolean {
    const currentQuizzes = this.getCurrentQuizzes();
    const index = currentQuizzes.findIndex(q => q.id === id);
    
    if (index !== -1) {
      currentQuizzes[index] = { ...currentQuizzes[index], ...updates };
      this.quizzesSubject.next([...currentQuizzes]);
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
}
