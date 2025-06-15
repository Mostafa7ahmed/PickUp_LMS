import { Result } from './../../../../topic/Core/Interface/itopic';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Task {
  id?: number;
  name: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
  dueDate: string;
  isCompleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export enum TaskType {
  Personal = 0,
  Work = 1,
  Study = 2,
  Meeting = 3,
  Other = 4
}

export enum TaskPriority {
  Low = 0,
  Medium = 1,
  High = 2,
  Urgent = 3
}

export interface CreateTaskRequest {
  name: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
  dueDate: string;
}

export interface ApiResponse<T> {
  success: boolean;
  result: T;
  message: string;
  errors?: string[];
}

export interface PaginationParams {
  orderBy?: number;
  pageNumber?: number;
  pageSize?: number;
  orderBeforPagination?: boolean;
  orderDirection?: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  result: {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  message: string;
  errors?: string[];
}

/**
 * Task Service
 *
 * Handles all task-related API operations including:
 * - Creating, reading, updating, deleting tasks
 * - Pagination support
 * - Real-time task updates via BehaviorSubject
 *
 * Uses interceptor for authentication headers
 * API Base URL: https://pickup.runasp.net/pickup-lms/api/v1
 */
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly baseUrl = 'https://pickup.runasp.net/pickup-lms/api/v1';
  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  // Get token from localStorage or your auth service


  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  // Create new task
  createTask(taskData: CreateTaskRequest): Observable<ApiResponse<Task>> {
    const url = `${this.baseUrl}/task`;

    console.log('📝 Creating task:', taskData);

    return this.http.post<ApiResponse<Task>>(url, taskData).pipe(
      tap(response => {
        if (response.success) {
          console.log('✅ Task created successfully:', response.result);
          this.loadTasks(); // Refresh tasks list
        } else {
          console.error('❌ Failed to create task:', response.message);
        }
      })
    );
  }

  // Get all tasks
  getTasks(): Observable<ApiResponse<Task[]>> {
    const url = `${this.baseUrl}/task`;

    return this.http.get<ApiResponse<Task[]>>(url).pipe(
      tap(response => {
        if (response.success) {
          this.tasksSubject.next(response.result);
          console.log('📋 Tasks loaded:', response.result);
        }
      })
    );
  }

  // Get tasks with pagination
  getTasksPaginated(params?: PaginationParams): Observable<PaginatedResponse<Task>> {
    const url = `${this.baseUrl}/task/paginate`;

    // Default pagination parameters
    const defaultParams: PaginationParams = {
      orderBy: 2,
      pageNumber: 1,
      pageSize: 50,
      orderBeforPagination: true,
      orderDirection: 1
    };

    // Merge with provided params
    const finalParams = { ...defaultParams, ...params };

    // Build HTTP params
    let httpParams = new HttpParams();
    Object.entries(finalParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, value.toString());
      }
    });

    console.log('📋 Loading paginated tasks with params:', finalParams);

    return this.http.get<PaginatedResponse<Task>>(url, { params: httpParams }).pipe(
      tap(response => {
        if (response.success) {
          // Update the tasks subject with paginated items
          this.tasksSubject.next(response.data.items);
          console.log('📋 Paginated tasks loaded:', {
            items: response.data.items.length,
            totalCount: response.data.totalCount,
            pageNumber: response.data.pageNumber,
            totalPages: response.data.totalPages
          });
        }
      })
    );
  }

  // Get task by ID
  getTaskById(id: number): Observable<ApiResponse<Task>> {
    const url = `${this.baseUrl}/task/${id}`;

    return this.http.get<ApiResponse<Task>>(url);
  }

  // Update task
  updateTask(id: number, taskData: Partial<CreateTaskRequest>): Observable<ApiResponse<Task>> {
    const url = `${this.baseUrl}/task/${id}`;

    return this.http.put<ApiResponse<Task>>(url, taskData).pipe(
      tap(response => {
        if (response.success) {
          console.log('✅ Task updated successfully:', response.result);
          this.loadTasks(); // Refresh tasks list
        }
      })
    );
  }

  // Delete task
  deleteTask(id: number): Observable<ApiResponse<any>> {
    const url = `${this.baseUrl}/task/${id}`;

    return this.http.delete<ApiResponse<any>>(url).pipe(
      tap(response => {
        if (response.success) {
          console.log('✅ Task deleted successfully');
          this.loadTasks(); // Refresh tasks list
        }
      })
    );
  }

  // Mark task as completed
  markTaskCompleted(id: number): Observable<ApiResponse<Task>> {
    const url = `${this.baseUrl}/task/${id}/complete`;

    return this.http.patch<ApiResponse<Task>>(url, {}).pipe(
      tap(response => {
        if (response.success) {
          console.log('✅ Task marked as completed');
          this.loadTasks(); // Refresh tasks list
        }
      })
    );
  }

  // Load tasks and update subject
  private loadTasks(): void {
    this.getTasksPaginated().subscribe({
      next: () => {
        // Tasks already updated in getTasksPaginated() tap operator
      },
      error: (error) => {
        console.error('❌ Error loading tasks:', error);
      }
    });
  }

  // Get current tasks array
  getCurrentTasks(): Task[] {
    return this.tasksSubject.value;
  }

  // Helper methods for UI
  getTaskTypeLabel(type: TaskType): string {
    switch (type) {
      case TaskType.Personal: return 'Personal';
      case TaskType.Work: return 'Work';
      case TaskType.Study: return 'Study';
      case TaskType.Meeting: return 'Meeting';
      case TaskType.Other: return 'Other';
      default: return 'Unknown';
    }
  }

  getTaskPriorityLabel(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.Low: return 'Low';
      case TaskPriority.Medium: return 'Medium';
      case TaskPriority.High: return 'High';
      case TaskPriority.Urgent: return 'Urgent';
      default: return 'Unknown';
    }
  }

  getTaskPriorityColor(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.Low: return '#10b981';
      case TaskPriority.Medium: return '#f59e0b';
      case TaskPriority.High: return '#ef4444';
      case TaskPriority.Urgent: return '#dc2626';
      default: return '#6b7280';
    }
  }

  getTaskTypeIcon(type: TaskType): string {
    switch (type) {
      case TaskType.Personal: return 'fas fa-user';
      case TaskType.Work: return 'fas fa-briefcase';
      case TaskType.Study: return 'fas fa-book';
      case TaskType.Meeting: return 'fas fa-users';
      case TaskType.Other: return 'fas fa-tasks';
      default: return 'fas fa-task';
    }
  }
}
