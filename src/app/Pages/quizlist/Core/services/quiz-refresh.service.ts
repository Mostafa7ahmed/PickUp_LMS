import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizRefreshService {
  
  // Subject to notify when quiz data needs to be refreshed
  private quizRefreshSubject = new Subject<{ action: string, courseId?: number, quizId?: number }>();
  
  // Observable for components to subscribe to
  public quizRefresh$ = this.quizRefreshSubject.asObservable();
  
  /**
   * Notify that a quiz was added
   * @param courseId - ID of the course where quiz was added
   * @param quizId - ID of the newly created quiz
   */
  notifyQuizAdded(courseId: number, quizId?: number) {
    console.log('🔄 Quiz added notification sent for course:', courseId);
    this.quizRefreshSubject.next({ action: 'added', courseId, quizId });
  }
  
  /**
   * Notify that a quiz was updated
   * @param courseId - ID of the course containing the quiz
   * @param quizId - ID of the updated quiz
   */
  notifyQuizUpdated(courseId: number, quizId: number) {
    console.log('🔄 Quiz updated notification sent for course:', courseId, 'quiz:', quizId);
    this.quizRefreshSubject.next({ action: 'updated', courseId, quizId });
  }
  
  /**
   * Notify that a quiz was deleted
   * @param courseId - ID of the course containing the quiz
   * @param quizId - ID of the deleted quiz
   */
  notifyQuizDeleted(courseId: number, quizId: number) {
    console.log('🔄 Quiz deleted notification sent for course:', courseId, 'quiz:', quizId);
    this.quizRefreshSubject.next({ action: 'deleted', courseId, quizId });
  }
  
  /**
   * Notify general quiz refresh (for all quizzes)
   */
  notifyGeneralRefresh() {
    console.log('🔄 General quiz refresh notification sent');
    this.quizRefreshSubject.next({ action: 'refresh' });
  }
} 