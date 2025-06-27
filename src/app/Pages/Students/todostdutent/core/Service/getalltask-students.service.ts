import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ITaskStudent, TaskPriority, TaskType } from '../Interface/itask-instrctor';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../Environments/environment';
import { IPaginationResponse } from '../../../../../Core/Shared/Interface/irespose';

@Injectable({
  providedIn: 'root'
})
export class GetalltaskStudentsService {

  private urlTask: string;
    private readonly tasksSubject = new BehaviorSubject<ITaskStudent[]>([]);
  public tasks$ = this.tasksSubject.asObservable();
  constructor(private _HttpClient: HttpClient) {
    this.urlTask = `${environment.baseUrl}${environment.pickup}task/paginate?`
  }
  getTasks(
    pageNumber: number = 1,
    pageSize: number = 100,

    orderBy: number = 2,
    orderDirection: number = 1,

  ): Observable<IPaginationResponse<ITaskStudent>> {

    const params: any = {
      orderBy: orderBy.toString(),
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      orderBeforPagination: 'true',
      orderDirection: orderDirection.toString(),
    };



    return this._HttpClient.get<IPaginationResponse<ITaskStudent>>(`${this.urlTask}`, { params }).pipe(
      tap(res=>{
        if(res.success){
                    this.tasksSubject.next(res.result);

        }
      })
    );
  }
   loadTasks(): void {
    this.getTasks().subscribe({
      next: () => {
      },
      error: (error) => {
        console.error('❌ Error loading tasks:', error);
      }
    });
  }

  getTaskTypeLabel(type: number): string {
    switch (type) {
      case TaskType.Personal: return 'Personal';
      case TaskType.Exam: return 'Exam';
      case TaskType.Study: return 'Study';
      case TaskType.Meeting: return 'Meeting';
      case TaskType.Other: return 'Other';
      default: return 'Unknown';
    }
  }

  getTaskPriorityLabel(priority: number): string {
    switch (priority) {
      case TaskPriority.Low: return 'Low';
      case TaskPriority.Medium: return 'Medium';
      case TaskPriority.High: return 'High';
      case TaskPriority.Urgent: return 'Urgent';
      default: return 'Unknown';
    }
  }

  getTaskPriorityColor(priority: number): string {
    switch (priority) {
      case TaskPriority.Low: return '#10b981';
      case TaskPriority.Medium: return '#f59e0b';
      case TaskPriority.High: return '#ef4444';
      case TaskPriority.Urgent: return '#dc2626';
      default: return '#6b7280';
    }
  }

  getTaskTypeIcon(type: number): string {
    switch (type) {
      case TaskType.Personal: return 'fas fa-user';
      case TaskType.Exam: return 'fas fa-briefcase';
      case TaskType.Study: return 'fas fa-book';
      case TaskType.Meeting: return 'fas fa-users';
      case TaskType.Other: return 'fas fa-tasks';
      default: return 'fas fa-task';
    }
  }

  getPriorityIcon(priority: number): string {
    switch (priority) {
      case TaskPriority.Low: return 'fas fa-arrow-down';
      case TaskPriority.Medium: return 'fas fa-minus';
      case TaskPriority.High: return 'fas fa-arrow-up';
      case TaskPriority.Urgent: return 'fas fa-exclamation';
      default: return 'fas fa-question';
    }
  }


}
