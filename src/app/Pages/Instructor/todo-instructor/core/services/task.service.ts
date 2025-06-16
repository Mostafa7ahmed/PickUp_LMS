import { Result } from './../../../../topic/Core/Interface/itopic';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

// Task interface matching the exact API response structure
export interface Task {
  id: number;
  userId: number;
  name: string;
  description: string;
  type: number;
  completed: boolean;
  priority: number;
  dueDate?: string; // Added dueDate field for UI compatibility
  createdOn: string;
  updatedOn: string;
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

// Request interface for creating tasks (matches API request structure)
export interface CreateTaskRequest {
  name: string;
  description: string;
  type: number;
  priority: number;
  dueDate: string;
}

// Request interface for updating tasks (matches API request structure)
export interface UpdateTaskRequest {
  id: number;
  name: string;
  description: string;
  type: number;
  priority: number;
  dueDate: string;
  completed: boolean;
}

// API Response interface matching the exact API response structure
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  result?: T;
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
  statusCode: number;
  message: string;
  result: T[];
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  count: number;
  totalPages: number;
  moveNext: boolean;
  movePrevious: boolean;
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

  // Create new task (POST /pickup-lms/api/v1/task)
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

  // Get all tasks (paginated, with optional search)
  getTasksPaginated(params?: PaginationParams & { search?: string }): Observable<PaginatedResponse<Task>> {
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
          this.tasksSubject.next(response.result);
          console.log('📋 Paginated tasks loaded:', {
            items: response.result.length,
            totalCount: response.totalCount,
            pageIndex: response.pageIndex,
            totalPages: response.totalPages
          });
        }
      })
    );
  }

  // Get a single task by ID (GET /pickup-lms/api/v1/task?id={id})
  getTaskById(id: number): Observable<ApiResponse<Task>> {
    const url = `${this.baseUrl}/task?id=${id}`;
    console.log('🔍 Getting task by ID:', id);
    return this.http.get<ApiResponse<Task>>(url).pipe(
      tap(response => {
        if (response.success) {
          console.log('✅ Task retrieved successfully:', response.result);
        } else {
          console.error('❌ Failed to get task:', response.message);
        }
      })
    );
  }

  // Update task (PUT /pickup-lms/api/v1/task)
  updateTask(taskData: UpdateTaskRequest): Observable<ApiResponse<Task>> {
    const url = `${this.baseUrl}/task`;
    console.log('📝 Updating task:', taskData);
    return this.http.put<ApiResponse<Task>>(url, taskData).pipe(
      tap(response => {
        if (response.success) {
          console.log('✅ Task updated successfully:', response.result);
          this.loadTasks(); // Refresh tasks list
        } else {
          console.error('❌ Failed to update task:', response.message);
        }
      })
    );
  }

  // Delete task (DELETE /pickup-lms/api/v1/task with id in header)
  deleteTask(id: number): Observable<ApiResponse<any>> {
    const url = `${this.baseUrl}/task`;
    console.log('🗑️ Deleting task:', id);
    return this.http.delete<ApiResponse<any>>(url, {
      headers: { id: id.toString() }
    }).pipe(
      tap(response => {
        if (response.success) {
          console.log('✅ Task deleted successfully');
          this.loadTasks(); // Refresh tasks list
        } else {
          console.error('❌ Failed to delete task:', response.message);
        }
      })
    );
  }

  // Mark task as completed by updating it with completed: true
  markTaskCompleted(task: Task): Observable<ApiResponse<Task>> {
    const updateData: UpdateTaskRequest = {
      id: task.id,
      name: task.name,
      description: task.description,
      type: task.type,
      priority: task.priority,
      dueDate: task.dueDate || new Date().toISOString(), // Preserve original due date
      completed: true
    };

    console.log('✅ Marking instructor task as completed:', task.id, updateData);
    return this.updateTask(updateData);
  }

  // Mark task as incomplete by updating it with completed: false
  markTaskIncomplete(task: Task): Observable<ApiResponse<Task>> {
    const updateData: UpdateTaskRequest = {
      id: task.id,
      name: task.name,
      description: task.description,
      type: task.type,
      priority: task.priority,
      dueDate: task.dueDate || new Date().toISOString(), // Preserve original due date
      completed: false
    };

    console.log('❌ Marking instructor task as incomplete:', task.id, updateData);
    return this.updateTask(updateData);
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

  // Helper methods for UI - now accepting numbers instead of enums
  getTaskTypeLabel(type: number): string {
    switch (type) {
      case TaskType.Personal: return 'Personal';
      case TaskType.Work: return 'Work';
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
      case TaskType.Work: return 'fas fa-briefcase';
      case TaskType.Study: return 'fas fa-book';
      case TaskType.Meeting: return 'fas fa-users';
      case TaskType.Other: return 'fas fa-tasks';
      default: return 'fas fa-task';
    }
  }

  // Helper method to get priority icon
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
