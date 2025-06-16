import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

// Student Task interface matching the exact API response structure
export interface StudentTask {
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

// Request interface for creating tasks (matches API request structure)
export interface CreateStudentTaskRequest {
  name: string;
  description: string;
  type: number;
  priority: number;
  dueDate: string;
}

// Request interface for updating tasks (matches API request structure)
export interface UpdateStudentTaskRequest {
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

@Injectable({
  providedIn: 'root'
})
export class StudentTaskService {
  private readonly baseUrl = 'https://pickup.runasp.net/pickup-lms/api/v1';
  private readonly tasksSubject = new BehaviorSubject<StudentTask[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTasks();
  }



  // Get all tasks (paginated)
  getTasksPaginated(params?: PaginationParams): Observable<PaginatedResponse<StudentTask>> {
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

    console.log('📋 Loading paginated student tasks with params:', finalParams);

    return this.http.get<PaginatedResponse<StudentTask>>(url, { params: httpParams }).pipe(
      tap(response => {
        if (response.success) {
          // Update the tasks subject with paginated items
          this.tasksSubject.next(response.result);
          console.log('📋 Student tasks loaded:', {
            items: response.result.length,
            totalCount: response.totalCount,
            pageIndex: response.pageIndex,
            totalPages: response.totalPages
          });
        }
      })
    );
  }

  // Get a single task by ID
  getTaskById(id: number): Observable<ApiResponse<StudentTask>> {
    const url = `${this.baseUrl}/task?id=${id}`;
    console.log('🔍 Getting student task by ID:', id);
    return this.http.get<ApiResponse<StudentTask>>(url);
  }

  // Create new task (POST /pickup-lms/api/v1/task)
  createTask(taskData: CreateStudentTaskRequest): Observable<ApiResponse<StudentTask>> {
    const url = `${this.baseUrl}/task`;
    console.log('📝 Creating student task:', taskData);
    return this.http.post<ApiResponse<StudentTask>>(url, taskData).pipe(
      tap(response => {
        if (response.success) {
          console.log('✅ Student task created successfully:', response.result);
          this.loadTasks(); // Refresh tasks list
        } else {
          console.error('❌ Failed to create student task:', response.message);
        }
      })
    );
  }

  // Update task (PUT /pickup-lms/api/v1/task)
  updateTask(taskData: UpdateStudentTaskRequest): Observable<ApiResponse<StudentTask>> {
    const url = `${this.baseUrl}/task`;
    console.log('📝 Updating student task:', taskData);
    return this.http.put<ApiResponse<StudentTask>>(url, taskData).pipe(
      tap(response => {
        if (response.success) {
          console.log('✅ Student task updated successfully:', response.result);
          this.loadTasks(); // Refresh tasks list
        } else {
          console.error('❌ Failed to update student task:', response.message);
        }
      })
    );
  }

  // Delete task (DELETE /pickup-lms/api/v1/task with id in header)
  deleteTask(id: number): Observable<ApiResponse<any>> {
    const url = `${this.baseUrl}/task`;
    console.log('🗑️ Deleting student task:', id);
    return this.http.delete<ApiResponse<any>>(url, {
      headers: { id: id.toString() }
    }).pipe(
      tap(response => {
        if (response.success) {
          console.log('✅ Student task deleted successfully');
          this.loadTasks(); // Refresh tasks list
        } else {
          console.error('❌ Failed to delete student task:', response.message);
        }
      })
    );
  }

  // Mark task as completed
  markTaskCompleted(task: StudentTask): Observable<ApiResponse<StudentTask>> {
    const updateData: UpdateStudentTaskRequest = {
      id: task.id,
      name: task.name,
      description: task.description,
      type: task.type,
      priority: task.priority,
      dueDate: new Date().toISOString(),
      completed: true
    };

    console.log('✅ Marking student task as completed:', task.id);
    return this.updateTask(updateData);
  }

  // Mark task as incomplete
  markTaskIncomplete(task: StudentTask): Observable<ApiResponse<StudentTask>> {
    const updateData: UpdateStudentTaskRequest = {
      id: task.id,
      name: task.name,
      description: task.description,
      type: task.type,
      priority: task.priority,
      dueDate: new Date().toISOString(),
      completed: false
    };

    console.log('❌ Marking student task as incomplete:', task.id);
    return this.updateTask(updateData);
  }

  // Load tasks and update subject
  private loadTasks(): void {
    this.getTasksPaginated().subscribe({
      next: () => {
        // Tasks already updated in getTasksPaginated() tap operator
      },
      error: (error) => {
        console.error('❌ Error loading student tasks:', error);
      }
    });
  }

  // Get current tasks array
  getCurrentTasks(): StudentTask[] {
    return this.tasksSubject.value;
  }
}
